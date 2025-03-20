import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token) {
      // Validate token with backend
      axios.get(`http://localhost:8080/api/auth/validate?token=${token}`)
        .then(() => {
          // Token is valid, get user details from localStorage
          const user = JSON.parse(localStorage.getItem('user'))
          if (user) {
            setCurrentUser(user)
          } else {
            // If user data is missing, try to fetch it from API
            fetchUserDetails(token)
              .catch(() => {
                // If fetching fails, log out
                logout()
              })
          }
        })
        .catch(() => {
          // Token is invalid or expired, log them out
          logout()
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  // Fetch role-specific ID based on user role and email
  const fetchRoleSpecificId = async (email, role) => {
    try {
      let response;
      let roleSpecificId;
      
      if (role === 'freelancer') {
        response = await axios.get(`http://localhost:8080/api/freelancers/email/${email}`)
        roleSpecificId = response.data.freelancerId
      } else if (role === 'client') {
        response = await axios.get(`http://localhost:8080/api/clients/email/${email}`)
        roleSpecificId = response.data.clientId
      } else {
        // For admin or other roles, use the auth id
        return null
      }
      
      return roleSpecificId
    } catch (error) {
      console.error(`Error fetching ${role} details:`, error)
      throw error
    }
  }

  // Fetch user details from API
  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/user?token=${token}`)
      const userData = response.data
      
      // Get the role in lowercase for frontend consistency
      const role = userData.userRole.toLowerCase()
      
      // Fetch role-specific ID if the user is a client or freelancer
      let roleSpecificId = userData.id // Default to auth ID
      
      if (role === 'client' || role === 'freelancer') {
        try {
          const specificId = await fetchRoleSpecificId(userData.username, role)
          if (specificId) {
            roleSpecificId = specificId
          }
        } catch (error) {
          console.warn(`Could not fetch ${role} specific ID, using auth ID as fallback`)
        }
      }
      
      // Format user data for frontend
      const userForStorage = {
        id: roleSpecificId, // Use the role-specific ID instead of auth ID
        authId: userData.id, // Keep the original auth ID for reference if needed
        name: userData.name,
        email: userData.username,
        role: role,
        userRole: userData.userRole // Store original format for API calls
      }
      
      localStorage.setItem('user', JSON.stringify(userForStorage))
      setCurrentUser(userForStorage)
      
      return userForStorage
    } catch (error) {
      console.error('Error fetching user details:', error)
      throw error
    }
  }

  // Login function
  const login = async (username, password) => {
    try {
      // Call the token generation API
      const response = await axios.post('http://localhost:8080/api/auth/token', {
        username,
        password
      })
      
      const token = response.data.token
      
      if (!token) {
        throw new Error('No token received from server')
      }
      
      // Store token in localStorage
      localStorage.setItem('token', token)
      
      // Get user details from API using the token
      const user = await fetchUserDetails(token)
      
      return { token, user }
    } catch (error) {
      console.error('Login error:', error)
      throw new Error(error.response?.data?.message || 'Failed to login')
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      // Transform userData to match your API requirements
      const apiData = {
        username: userData.email,
        password: userData.password,
        userRole: userData.role.toUpperCase() // Ensure role is uppercase for the API
      }
      
      // Call the register API
      const response = await axios.post('http://localhost:8080/api/auth/register', apiData)
      
      return response.data
    } catch (error) {
      console.error('Register error:', error)
      throw new Error(error.response?.data?.message || 'Failed to register')
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setCurrentUser(null)
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      // In a real app, this would be an API call to update the user profile
      // For now, we'll just update the local storage
      const updatedUser = { ...currentUser, ...userData }
      
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setCurrentUser(updatedUser)
      
      return updatedUser
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile')
    }
  }

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser,
    isClient: currentUser?.role === 'client',
    isFreelancer: currentUser?.role === 'freelancer'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}