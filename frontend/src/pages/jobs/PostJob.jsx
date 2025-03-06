import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

function PostJob() {
  const { isClient } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    skills: [],
    minBudget: '',
    maxBudget: '',
    deadline: ''
  })
  
  const [skillInput, setSkillInput] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  // Available categories
  const categories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Graphic Design',
    'Content Writing',
    'Marketing',
    'Data Entry',
    'Customer Service',
    'Accounting',
    'Legal',
    'Other'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }))
      setSkillInput('')
      
      // Clear skills error if it exists
      if (errors.skills) {
        setErrors(prev => ({
          ...prev,
          skills: ''
        }))
      }
    }
  }

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSkillAdd()
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'Description should be at least 50 characters'
    }
    
    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required'
    }
    
    if (!formData.minBudget) {
      newErrors.minBudget = 'Minimum budget is required'
    }
    
    if (!formData.maxBudget) {
      newErrors.maxBudget = 'Maximum budget is required'
    } else if (Number(formData.maxBudget) < Number(formData.minBudget)) {
      newErrors.maxBudget = 'Maximum budget cannot be less than minimum budget'
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required'
    } else {
      const deadlineDate = new Date(formData.deadline)
      const today = new Date()
      
      if (deadlineDate <= today) {
        newErrors.deadline = 'Deadline must be in the future'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // In a real app, this would be an API call to create the job
      // await axios.post('/api/jobs', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Error posting job:', error)
      // Handle error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    navigate('/dashboard/manage-jobs')
  }

  // Redirect if not a client
  if (!isClient) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-secondary-900">Access Denied</h3>
            <p className="mt-1 text-secondary-500">Only clients can post jobs.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Post a Job</h1>
          <p className="text-secondary-600 mt-2">Create a new job listing to find the perfect freelancer</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Job Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-secondary-700 mb-1">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`input ${errors.title ? 'border-red-500' : ''}`}
                  placeholder="e.g., Full Stack Developer for E-commerce Website"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>
              
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  className={`input ${errors.category ? 'border-red-500' : ''}`}
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-secondary-700 mb-1">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="6"
                  className={`input ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Describe the job in detail, including responsibilities, requirements, and any specific instructions..."
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                {errors.description ? (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                ) : (
                  <p className="mt-1 text-xs text-secondary-500">
                    Minimum 50 characters. Be specific about what you need.
                  </p>
                )}
              </div>
              
              {/* Skills */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-secondary-700 mb-1">
                  Required Skills <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="skills"
                    className={`input rounded-r-none ${errors.skills ? 'border-red-500' : ''}`}
                    placeholder="e.g., React, Node.js, MongoDB"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onClick={handleSkillAdd}
                  >
                    Add
                  </button>
                </div>
                {errors.skills && (
                  <p className="mt-1 text-sm text-red-500">{errors.skills}</p>
                )}
                
                {formData.skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
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
              
              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Budget (USD) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="minBudget" className="sr-only">Minimum Budget</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-secondary-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="minBudget"
                        name="minBudget"
                        className={`input pl-7 ${errors.minBudget ? 'border-red-500' : ''}`}
                        placeholder="Min"
                        value={formData.minBudget}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.minBudget && (
                      <p className="mt-1 text-sm text-red-500">{errors.minBudget}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="maxBudget" className="sr-only">Maximum Budget</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-secondary-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="maxBudget"
                        name="maxBudget"
                        className={`input pl-7 ${errors.maxBudget ? 'border-red-500' : ''}`}
                        placeholder="Max"
                        value={formData.maxBudget}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.maxBudget && (
                      <p className="mt-1 text-sm text-red-500">{errors.maxBudget}</p>
                    )}
                  </div>
                </div>
              </div>
              
              
              
              {/* Deadline */}
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-secondary-700 mb-1">
                  Application Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  className={`input ${errors.deadline ? 'border-red-500' : ''}`}
                  value={formData.deadline}
                  onChange={handleChange}
                />
                {errors.deadline && (
                  <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting Job...
                    </>
                  ) : (
                    'Post Job'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-secondary-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-secondary-900">
                      Job Posted Successfully!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-secondary-500">
                        Your job has been posted successfully. You can now view and manage it from your dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSuccessModalClose}
                >
                  View My Jobs
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowSuccessModal(false)
                    // Reset form
                    setFormData({
                      title: '',
                      category: '',
                      description: '',
                      skills: [],
                      minBudget: '',
                      maxBudget: '',
                      location: 'Remote',
                      deadline: ''
                    })
                  }}
                >
                  Post Another Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostJob