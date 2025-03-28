import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import axios from 'axios'

function MyProposals() {
  const { isFreelancer, currentUser } = useAuth()
  const [proposals, setProposals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProposals = async () => {
      if (!isFreelancer) return

      try {
        const response = await axios.get(`http://localhost:8080/api/proposals/freelancer/${currentUser.id}`)
        
        // Transform the data to remove unnecessary attributes
        const transformedProposals = response.data.map(proposal => ({
          id: proposal.proposalId,
          job: {
            id: proposal.job.jobId,
            title: proposal.job.jobTitle,
            budget: `$${proposal.job.minBudget}-$${proposal.job.maxBudget}`,
            category: proposal.job.category,
            client: {
              id: proposal.job.client.clientId,
              name: proposal.job.client.name,
              location: proposal.job.client.location,
              ratings: proposal.job.client.ratings
            }
          },
          coverLetter: proposal.coverLetter,
          bid: proposal.bidAmount,
          deliveryTime: proposal.deliveryDays,
          status: proposal.status.toLowerCase(),
          submittedAt: proposal.applicationDate
        }))

        setProposals(transformedProposals)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching proposals:', err)
        setError('Failed to load proposals')
        setIsLoading(false)
      }
    }

    fetchProposals()
  }, [isFreelancer, currentUser])

  // Filter proposals based on active tab
  const filteredProposals = proposals.filter(proposal => {
    if (activeTab === 'all') return true
    return proposal.status === activeTab
  })

  // Redirect if not a freelancer
  if (!isFreelancer) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-secondary-900">Access Denied</h3>
        <p className="mt-1 text-secondary-500">Only freelancers can view their proposals.</p>
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

  // Error handling
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-secondary-900">Error</h3>
        <p className="mt-1 text-secondary-500">{error}</p>
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">My Proposals</h1>
        <p className="text-secondary-600 mt-1">Track and manage your job proposals</p>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-secondary-200">
        <nav className="-mb-px flex space-x-8">
          {['all', 'pending', 'accepted', 'rejected'].map((tab) => (
            <button
              key={tab}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Proposals
            </button>
          ))}
        </nav>
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
            {activeTab === 'all'
              ? "You haven't submitted any proposals yet."
              : `You don't have any ${activeTab} proposals.`}
          </p>
          <div className="mt-6">
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProposals.map(proposal => (
            <div key={proposal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900 mb-2">
                      <Link to={`/jobs/${proposal.job.id}`} className="hover:text-primary-600">
                        {proposal.job.title}
                      </Link>
                    </h2>
                    <div className="flex items-center text-sm text-secondary-500 mb-2">
                      <Link to={`/clients/${proposal.job.client.id}`} className="hover:text-primary-600">
                        {proposal.job.client.name}
                      </Link>
                    </div>
                    <div className="flex flex-wrap items-center text-sm text-secondary-500">
                      <span className="mr-3">
                        Budget: <span className="font-medium">{proposal.job.budget}</span>
                      </span>
                      <span className="mr-3">
                        Your Bid: <span className="font-medium">${proposal.bid}</span>
                      </span>
                      <span>
                        Delivery: <span className="font-medium">{proposal.deliveryTime} days</span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      proposal.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : proposal.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </span>
                    <span className="text-xs text-secondary-500 mt-1">
                      Submitted: {new Date(proposal.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="bg-secondary-50 rounded-md p-4 mb-4">
                  <h3 className="text-sm font-medium text-secondary-900 mb-2">Your Cover Letter</h3>
                  <p className="text-sm text-secondary-700">{proposal.coverLetter}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <Link
                    to={`/jobs/${proposal.job.id}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View Job Details
                  </Link>
                  
                  {/* {proposal.status === 'pending' && (
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Withdraw Proposal
                    </button>
                  )} */}
                  
                  {proposal.status === 'accepted' && (
                    <Link
                      to="/dashboard/projects"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Project
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyProposals