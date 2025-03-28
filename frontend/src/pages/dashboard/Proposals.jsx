import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import axios from 'axios' // Assuming you're using axios for API calls

function Proposals() {
  const { isClient, currentUser } = useAuth()
  const [proposals, setProposals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState('all')
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // Fetch proposals for the current client
        const response = await axios.get(`http://localhost:8080/api/proposals/client/${currentUser.id}`)
        setProposals(response.data)
        
        // Extract unique jobs from proposals
        const uniqueJobs = [...new Set(response.data.map(proposal => proposal.job))]
        setJobs(uniqueJobs)
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching proposals:', error)
        setIsLoading(false)
      }
    }

    if (isClient) {
      fetchProposals()
    }
  }, [isClient, currentUser])

  // Filter proposals based on selected job
  const filteredProposals = selectedJob === 'all'
    ? proposals
    : proposals.filter(proposal => proposal.job.jobId === parseInt(selectedJob))

  // Redirect if not a client
  if (!isClient) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-secondary-900">Access Denied</h3>
        <p className="mt-1 text-secondary-500">Only clients can view proposals for their jobs.</p>
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Review Proposals</h1>
        <p className="text-secondary-600 mt-1">Review and manage proposals from freelancers for your jobs</p>
      </div>
      
      {/* Filter by job */}
      <div className="mb-6">
        <label htmlFor="job-filter" className="block text-sm font-medium text-secondary-700 mb-1">
          Filter by Job
        </label>
        <select
          id="job-filter"
          className="input max-w-md"
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
        >
          <option value="all">All Jobs</option>
          {jobs.map(job => (
            <option key={job.jobId} value={job.jobId}>{job.jobTitle}</option>
          ))}
        </select>
      </div>
      
      {/* Proposals List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredProposals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-secondary-900">No proposals found</h3>
          <p className="mt-1 text-secondary-500">
            {selectedJob === 'all'
              ? "You haven't received any proposals yet."
              : "You haven't received any proposals for this job."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProposals.map(proposal => (
            <div key={proposal.proposalId} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-secondary-900 mb-1">
                      Proposal for: {proposal.job.jobTitle}
                    </h2>
                    <p className="text-sm text-secondary-500">
                      Submitted on {new Date(proposal.applicationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary-600">${proposal.bidAmount}</p>
                    <p className="text-sm text-secondary-500">
                      Delivery: {proposal.deliveryDays} days
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col md:flex-row gap-6">
                  {/* Freelancer Info */}
                  <div className="md:w-1/3">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="h-12 w-12 rounded-full bg-secondary-200 flex items-center justify-center">
                          <span className="text-secondary-600 font-medium">
                            {proposal.freelancer.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary-900">
                          <Link to={`/freelancers/${proposal.freelancer.freelancerId}`} className="hover:text-primary-600">
                            {proposal.freelancer.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-secondary-500">{proposal.freelancer.email}</p>
                      </div>
                    </div>
                    
                    <div className="bg-secondary-50 rounded-md p-4">
                      <div className="text-sm text-secondary-600">
                        <p>Location: {proposal.freelancer.location}</p>
                        <p>Hourly Rate: ${proposal.freelancer.hourlyRate}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cover Letter */}
                  <div className="md:w-2/3">
                    <h3 className="text-sm font-medium text-secondary-900 mb-2">Cover Letter</h3>
                    <div className="bg-secondary-50 rounded-md p-4">
                      <p className="text-sm text-secondary-700 whitespace-pre-line">
                        {proposal.coverLetter}
                      </p>
                    </div>
{/*                     
                    <div className="mt-6 flex flex-wrap gap-4">
                      <button className="btn-primary">
                        Hire Freelancer
                      </button>
                      <button className="btn-outline">
                        Message
                      </button>
                      <button className="btn-secondary">
                        Decline
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Proposals