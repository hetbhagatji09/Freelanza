import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import axios from 'axios'

function EditProfile() {
  const { currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  // Updated form data to match backend models
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    professionalTitle: '', // For client
    bio: '',
    location: '',
    hourlyRate: '', // For freelancer
    skills: []
  })
  
  const [newSkill, setNewSkill] = useState('')


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let endpoint = ''
        
        if (currentUser?.userRole === 'FREELANCER') {
          endpoint = `http://localhost:8080/api/freelancers/${currentUser.id}`
        } else {
          endpoint = `http://localhost:8080/api/clients/${currentUser.id}`
        }
        console.log(currentUser)
        const response = await axios.get(endpoint)
        
        // Map backend data to frontend form
        const userData = response.data
        const mappedData = {
          name: userData.name,
          email: userData.email,
          bio: userData.bio,
          location: userData.location,
          skills: userData.skills || [],
          // Conditional properties based on user role
          ...(currentUser?.userRole === 'FREELANCER' 
            ? { hourlyRate: userData.hourlyRate } 
            : { professionalTitle: userData.professionalTitle })
        }
        
        setFormData(mappedData)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setErrorMessage('Failed to load profile data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchUserData()
  }, [currentUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSkillAdd = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setSuccessMessage('')
    setErrorMessage('')
    
    try {
      let endpoint = ''
      let payload = {}
      
      if (currentUser?.userRole === 'FREELANCER') {
        endpoint = `http://localhost:8080/api/freelancers/${currentUser.id}`
        payload = {
          name: formData.name,
          email: formData.email,
          bio: formData.bio,
          location: formData.location,
          hourlyRate: parseFloat(formData.hourlyRate) || 0,
          skills: formData.skills
        }
      } else {
        endpoint = `http://localhost:8080/api/clients/${currentUser.id}`
        payload = {
          name: formData.name,
          email: formData.email,
          bio: formData.bio,
          location: formData.location,
          professionalTitle: formData.professionalTitle,
          skills: formData.skills
        }
      }
      
      const response = await axios.put(endpoint, payload)
      
      if (response.status === 200) {
        setSuccessMessage('Profile updated successfully!')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setErrorMessage('Failed to update profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Edit Profile</h1>
        <p className="text-secondary-600 mt-1">Update your profile information</p>
      </div>
      
      {successMessage && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {currentUser?.userRole === 'CLIENT' && (
                <div>
                  <label htmlFor="professionalTitle" className="block text-sm font-medium text-secondary-700 mb-1">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    id="professionalTitle"
                    name="professionalTitle"
                    className="input"
                    placeholder="e.g., Project Manager"
                    value={formData.professionalTitle}
                    onChange={handleChange}
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-secondary-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="input"
                  placeholder="e.g., New York, USA"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              
              {currentUser?.userRole === 'FREELANCER' && (
                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-secondary-700 mb-1">
                    Hourly Rate (USD)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-secondary-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="hourlyRate"
                      name="hourlyRate"
                      className="input pl-7"
                      placeholder="0.00"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              
              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-secondary-700 mb-1">
                  Bio / About Me
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  className="input"
                  placeholder="Tell clients about yourself, your experience, and your expertise..."
                  value={formData.bio}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Skills</h2>
            
            <div className="mb-4">
              <label htmlFor="skills" className="block text-sm font-medium text-secondary-700 mb-1">
                Add Skills
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="skills"
                  className="input rounded-r-none"
                  placeholder="e.g., React, Node.js, JavaScript"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSkillAdd()
                    }
                  }}
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={handleSkillAdd}
                >
                  Add
                </button>
              </div>
            </div>
            
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-400 hover:text-primary-700 focus:outline-none"
                      onClick={() => handleSkillRemove(skill)}
                    >
                      <span className="sr-only">Remove {skill}</span>
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile