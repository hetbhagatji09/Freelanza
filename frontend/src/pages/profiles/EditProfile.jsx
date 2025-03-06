import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx'

function EditProfile() {
  const { currentUser, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    bio: '',
    location: '',
    avatar: '',
    hourlyRate: '',
    skills: [],
    education: [],
    experience: []
  })
  
  const [newSkill, setNewSkill] = useState('')
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: ''
  })
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    period: '',
    description: ''
  })

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      if (currentUser) {
        // In a real app, you would fetch the full profile data from the API
        // For demo purposes, we'll use mock data based on the current user
        const mockProfileData = {
          name: currentUser.name,
          email: currentUser.email,
          title: currentUser.role === 'freelancer' ? 'Senior Full Stack Developer' : 'Project Manager',
          bio: currentUser.role === 'freelancer' 
            ? 'Experienced full-stack developer with over 8 years of experience building web applications. I specialize in React, Node.js, and MongoDB, with a focus on creating scalable and maintainable code.'
            : 'Project manager with 5+ years of experience working with development teams. Passionate about delivering high-quality software solutions that meet business needs.',
          location: 'New York, USA',
          avatar: currentUser.avatar,
          hourlyRate: currentUser.role === 'freelancer' ? '45' : '',
          skills: ['React', 'Node.js', 'JavaScript', 'TypeScript'],
          education: [
            {
              id: 1,
              degree: 'Bachelor of Computer Science',
              institution: 'University of California, Berkeley',
              year: '2016'
            }
          ],
          experience: [
            {
              id: 1,
              title: currentUser.role === 'freelancer' ? 'Senior Developer' : 'Project Manager',
              company: 'Tech Innovations Inc.',
              period: '2020 - Present',
              description: currentUser.role === 'freelancer'
                ? 'Lead developer for multiple client projects, focusing on web application development using React and Node.js.'
                : 'Managed multiple development teams and client projects, ensuring on-time delivery and high-quality results.'
            }
          ]
        }
        
        setFormData(mockProfileData)
      }
      setIsLoading(false)
    }, 1000)
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

  const handleEducationChange = (e) => {
    const { name, value } = e.target
    setNewEducation(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEducationAdd = () => {
    if (newEducation.degree && newEducation.institution) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, {
          id: Date.now(),
          ...newEducation
        }]
      }))
      setNewEducation({
        degree: '',
        institution: '',
        year: ''
      })
    }
  }

  const handleEducationRemove = (id) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const handleExperienceChange = (e) => {
    const { name, value } = e.target
    setNewExperience(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleExperienceAdd = () => {
    if (newExperience.title && newExperience.company) {
      setFormData(prev => ({
        ...prev,
        experience: [...prev.experience, {
          id: Date.now(),
          ...newExperience
        }]
      }))
      setNewExperience({
        title: '',
        company: '',
        period: '',
        description: ''
      })
    }
  }

  const handleExperienceRemove = (id) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setSuccessMessage('')
    setErrorMessage('')
    
    try {
      // In a real app, this would send the data to your API
      await updateProfile(formData)
      setSuccessMessage('Profile updated successfully!')
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
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
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-secondary-700 mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="input"
                  placeholder="e.g., Full Stack Developer"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              
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
              
              {currentUser?.role === 'freelancer' && (
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
                <label htmlFor="avatar" className="block text-sm font-medium text-secondary-700 mb-1">
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  id="avatar"
                  name="avatar"
                  className="input"
                  placeholder="https://example.com/your-image.jpg"
                  value={formData.avatar}
                  onChange={handleChange}
                />
              </div>
              
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
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Education</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-secondary-700 mb-1">
                  Degree / Certificate
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  className="input"
                  placeholder="e.g., Bachelor of Computer Science"
                  value={newEducation.degree}
                  onChange={handleEducationChange}
                />
              </div>
              
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-secondary-700 mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  className="input"
                  placeholder="e.g., University of California"
                  value={newEducation.institution}
                  onChange={handleEducationChange}
                />
              </div>
              
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-secondary-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  className="input"
                  placeholder="e.g., 2020"
                  value={newEducation.year}
                  onChange={handleEducationChange}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <button
                type="button"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={handleEducationAdd}
              >
                Add Education
              </button>
            </div>
            
            {formData.education.length > 0 && (
              <div className="space-y-4 mt-4 border-t border-secondary-200 pt-4">
                <h3 className="text-sm font-medium text-secondary-700">Added Education</h3>
                {formData.education.map(edu => (
                  <div key={edu.id} className="flex justify-between items-center p-3 bg-secondary-50 rounded-md">
                    <div>
                      <p className="font-medium text-secondary-900">{edu.degree}</p>
                      <p className="text-sm text-secondary-500">
                        {edu.institution} {edu.year ? `• ${edu.year}` : ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleEducationRemove(edu.id)}
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Work Experience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expTitle" className="block text-sm font-medium text-secondary-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  id="expTitle"
                  name="title"
                  className="input"
                  placeholder="e.g., Senior Developer"
                  value={newExperience.title}
                  onChange={handleExperienceChange}
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-secondary-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="input"
                  placeholder="e.g., Tech Innovations Inc."
                  value={newExperience.company}
                  onChange={handleExperienceChange}
                />
              </div>
              
              <div>
                <label htmlFor="period" className="block text-sm font-medium text-secondary-700 mb-1">
                  Period
                </label>
                <input
                  type="text"
                  id="period"
                  name="period"
                  className="input"
                  placeholder="e.g., 2020 - Present"
                  value={newExperience.period}
                  onChange={handleExperienceChange}
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="expDescription" className="block text-sm font-medium text-secondary-700 mb-1">
                  Description
                </label>
                <textarea
                  id="expDescription"
                  name="description"
                  rows="3"
                  className="input"
                  placeholder="Describe your responsibilities and achievements..."
                  value={newExperience.description}
                  onChange={handleExperienceChange}
                ></textarea>
              </div>
            </div>
            
            <div className="mb-4">
              <button
                type="button"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={handleExperienceAdd}
              >
                Add Experience
              </button>
            </div>
            
            {formData.experience.length > 0 && (
              <div className="space-y-4 mt-4 border-t border-secondary-200 pt-4">
                <h3 className="text-sm font-medium text-secondary-700">Added Experience</h3>
                {formData.experience.map(exp => (
                  <div key={exp.id} className="p-3 bg-secondary-50 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-secondary-900">{exp.title}</p>
                        <p className="text-sm text-secondary-500">
                          {exp.company} {exp.period ? `• ${exp.period}` : ''}
                        </p>
                        {exp.description && (
                          <p className="text-sm text-secondary-700 mt-1">{exp.description}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800 ml-2"
                        onClick={() => handleExperienceRemove(exp.id)}
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
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