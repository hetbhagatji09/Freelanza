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
      // For demo purposes, we'll just set a mock user
      // In a real app, you would validate the token with your backend
      const mockUser = JSON.parse(localStorage.getItem('user')) || {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'client', // or 'client'
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      }
      
      setCurrentUser(mockUser)
    }
    
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.post('/api/auth/login', { email, password })
      
      // For demo purposes
      const mockResponse = {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            name: 'John Doe',
            email: email,
            role: 'client',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
          }
        }
      }
      
      localStorage.setItem('token', mockResponse.data.token)
      localStorage.setItem('user', JSON.stringify(mockResponse.data.user))
      setCurrentUser(mockResponse.data.user)
      
      return mockResponse.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to login')
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.post('/api/auth/register', userData)
      
      // For demo purposes
      const mockResponse = {
        data: {
          message: 'Registration successful! Please verify your email.'
        }
      }
      
      return mockResponse.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to register')
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setCurrentUser(null)
  }

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.post('/api/auth/forgot-password', { email })
      
      // For demo purposes
      const mockResponse = {
        data: {
          message: 'Password reset link sent to your email!'
        }
      }
      
      return mockResponse.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send reset link')
    }
  }

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.post('/api/auth/reset-password', { token, password })
      
      // For demo purposes
      const mockResponse = {
        data: {
          message: 'Password reset successful!'
        }
      }
      
      return mockResponse.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password')
    }
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.put('/api/users/profile', userData)
      
      // For demo purposes
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
    forgotPassword,
    resetPassword,
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