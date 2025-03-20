import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import axios from 'axios'

function ManageJobs() {
  const { currentUser, isClient } = useAuth()
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('ACTIVE')
  
  useEffect(() => {
    const fetchJobs = async () => {
      if (!currentUser || !isClient) {
        setIsLoading(false)
        return
      }
      
      try {
        setIsLoading(true)
        // Use the client ID from current user
        const response = await axios.get(`http://localhost:8080/api/jobs/client/${currentUser.id}`)
        setJobs(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching jobs:', err)
        setError('Failed to load jobs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [currentUser, isClient])

  // Format budget string from min and max values
  const formatBudget = (min, max) => {
    return `$${min}-$${max}`
  }

  // Check if a job deadline has passed
  const isJobExpired = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    return deadlineDate < today
  }

  // Get appropriate status for display
  const getDisplayStatus = (job) => {
    // If the backend status is already set correctly, use it
    if (job.status === 'COMPLETED' || job.status === 'EXPIRED') {
      return job.status
    }
    
    // If the job is marked as ACTIVE but deadline has passed, display as EXPIRED
    if (job.status === 'ACTIVE' && isJobExpired(job.deadline)) {
      return 'EXPIRED'
    }
    
    return job.status
  }

  // Filter jobs based on active tab
  const filteredJobs = jobs.filter(job => {
    const displayStatus = getDisplayStatus(job)
    
    if (activeTab === 'ALL') return true
    return displayStatus === activeTab
  })

  // Redirect if not a client
  if (!isClient) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-secondary-900">Access Denied</h3>
        <p className="mt-1 text-secondary-500">Only clients can manage job listings.</p>
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Manage Jobs</h1>
          <p className="text-secondary-600 mt-1">View and manage all your job listings</p>
        </div>
        <Link
          to="/dashboard/post-job"
          className="btn-primary flex items-center"
        >
          <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Post New Job
        </Link>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-secondary-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'ALL'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('ALL')}
          >
            All Jobs
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'ACTIVE'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('ACTIVE')}
          >
            Active
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'EXPIRED'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('EXPIRED')}
          >
            Expired
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'COMPLETED'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('COMPLETED')}
          >
            Completed
          </button>
        </nav>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {/* Job Listings */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-secondary-900">No jobs found</h3>
          <p className="mt-1 text-secondary-500">
            {activeTab === 'ALL'
              ? "You haven't posted any jobs yet."
              : `You don't have any ${activeTab.toLowerCase()} jobs.`}
          </p>
          <div className="mt-6">
            <Link
              to="/dashboard/post-job"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Post Your First Job
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Job
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Budget
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Posted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Skills
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredJobs.map(job => {
                const displayStatus = getDisplayStatus(job);
                return (
                  <tr key={job.jobId} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-secondary-900">
                            <Link to={`/jobs/${job.jobId}`} className="hover:text-primary-600">
                              {job.jobTitle}
                            </Link>
                          </div>
                          <div className="text-sm text-secondary-500 truncate max-w-xs">
                            {job.description.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary-900">{job.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary-900">{formatBudget(job.minBudget, job.maxBudget)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary-900">
                        {new Date(job.postedDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-secondary-500">
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        displayStatus === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : displayStatus === 'EXPIRED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {displayStatus.charAt(0) + displayStatus.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 2).map((skill, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-secondary-100 text-secondary-800 rounded">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-secondary-100 text-secondary-800 rounded">
                            +{job.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/jobs/${job.jobId}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View
                        </Link>
                        {displayStatus === 'ACTIVE' && (
                          <>
                            <span className="text-secondary-300">|</span>
                            <Link
                              to={`/dashboard/edit-job/${job.jobId}`}
                              className="text-secondary-600 hover:text-secondary-900"
                            >
                              Edit
                            </Link>
                            <span className="text-secondary-300">|</span>
                            <button className="text-red-600 hover:text-red-900">
                              Close
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageJobs