import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import axios from 'axios'

function JobDetails() {
  const { jobId } = useParams()
  const { isAuthenticated, isFreelancer, currentUser } = useAuth()
  const navigate = useNavigate()
  
  const [job, setJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  
  // // Mock job data
  // const mockJob = {
  //   id: parseInt(id),
  //   title: 'Full Stack Developer Needed for E-commerce Site',
  //   description: `
  //     We are looking for an experienced full-stack developer to build a responsive e-commerce website. The ideal candidate should have strong experience with React for the frontend and Node.js for the backend.
      
  //     Key Responsibilities:
  //     - Develop a responsive e-commerce website with product catalog, shopping cart, and checkout functionality
  //     - Implement user authentication and account management
  //     - Integrate with payment gateways (Stripe, PayPal)
  //     - Set up a content management system for product management
  //     - Ensure the website is optimized for performance and SEO
      
  //     Requirements:
  //     - 3+ years of experience with React and Node.js
  //     - Experience with MongoDB and Express
  //     - Knowledge of RESTful API design
  //     - Understanding of e-commerce workflows and best practices
  //     - Strong problem-solving skills and attention to detail
  //   `,
  //   budget: '$2000-$3000',
  //   category: 'Web Development',
  //   skills: ['React', 'Node.js', 'MongoDB', 'Express', 'E-commerce'],
  //   location: 'Remote',
  //   postedDate: '2023-04-15',
  //   deadline: '2023-05-15',
  //   client: {
  //     id: 101,
  //     name: 'TechSolutions Inc.',
  //     rating: 4.8,
  //     jobsPosted: 15,
  //     memberSince: '2022-01-10',
  //     country: 'United States',
  //     avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
  //   }
  // }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      try {
        const getchData =async()=>{
          const response=await axios.get(`http://localhost:8080/api/jobs/${jobId}`);
          setJob(response.data)
          console.log(response.data)
        } 
        getchData();
        
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load job details')
        setIsLoading(false)
      }
    }, 1000)
  }, [jobId])

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${jobId}` } })
      return
    }
    
    if (!isFreelancer) {
      // Show error or notification that only freelancers can apply
      return
    }
    
    setShowApplyModal(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="container-custom">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-secondary-900">Error Loading Job</h3>
            <p className="mt-1 text-secondary-500">{error || 'Job not found'}</p>
            <div className="mt-6">
              <Link to="/jobs" className="text-primary-600 hover:text-primary-500">
                Back to job listings
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="container-custom">
        <div className="mb-6">
          <Link to="/jobs" className="text-primary-600 hover:text-primary-500 flex items-center">
            <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to job listings
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold text-secondary-900 mb-2">{job.title}</h1>
                  <span className="text-primary-600 font-medium text-lg">{job.budget}</span>
                </div>
                
                <div className="flex items-center text-sm text-secondary-500 mb-6">
                  <span className="mr-4">
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                  <span className="mr-4">
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </span>
                 
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-secondary-900 mb-3">Job Description</h2>
                  <div className="prose prose-sm max-w-none text-secondary-700">
                    {job.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                {isFreelancer && (
                  <div className="mt-8">
                    <button
                      onClick={handleApply}
                      className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Apply for this Job
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">About the Client</h2>
                
                <div className="flex items-center mb-4">
                  
                  <div>
                    <h3 className="font-medium text-secondary-900">
                      <Link to={`/clients/${job.client.clientId}`} className="hover:text-primary-600">
                        {job.client.name}
                      </Link>
                    </h3>
                    <div className="flex items-center text-sm">
                      <span className="text-yellow-500 mr-1">{job.client.ratings}★</span>
                      {/* <span className="text-secondary-500">({job.client.job} jobs)</span> */}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-secondary-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-secondary-500">Location</p>
                      <p className="font-medium text-secondary-900">{job.client.location}</p>
                    </div>
                    <div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Job Details</h2>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-secondary-500">Category</p>
                    <p className="font-medium text-secondary-900">{job.category}</p>
                  </div>
                  <div>
                    <p className="text-secondary-500">Budget</p>
                    <p className="font-medium text-secondary-900">{job.budget}</p>
                  </div>
                  <div>
                    <p className="text-secondary-500">Location</p>
                    <p className="font-medium text-secondary-900">{job.client.location}</p>
                  </div>
                  <div>
                    <p className="text-secondary-500">Posted On</p>
                    <p className="font-medium text-secondary-900">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-500">Deadline</p>
                    <p className="font-medium text-secondary-900">
                      {new Date(job.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-secondary-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-secondary-900 mb-4">
                      Apply for "{job.jobTitle}"
                    </h3>
                    
                    <form>
                      <div className="mb-4">
                        <label htmlFor="coverLetter" className="block text-sm font-medium text-secondary-700 mb-1">
                          Cover Letter
                        </label>
                        <textarea
                          id="coverLetter"
                          rows="4"
                          className="input"
                          placeholder="Introduce yourself and explain why you're a good fit for this job..."
                        ></textarea>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="bid" className="block text-sm font-medium text-secondary-700 mb-1">
                          Your Bid (Budget: {job.budget})
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-secondary-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            name="bid"
                            id="bid"
                            className="input pl-7"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="deliveryTime" className="block text-sm font-medium text-secondary-700 mb-1">
                          Delivery Time (Days)
                        </label>
                        <input
                          type="number"
                          id="deliveryTime"
                          className="input"
                          placeholder="Enter number of days"
                          min="1"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="attachments" className="block text-sm font-medium text-secondary-700 mb-1">
                          Attachments (Optional)
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-secondary-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-secondary-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-secondary-600">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                                <span>Upload files</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-secondary-500">
                              PDF, DOC, PNG, JPG up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-secondary-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowApplyModal(false)
                    navigate('/dashboard/my-proposals')
                  }}
                >
                  Submit Proposal
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowApplyModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobDetails