import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

function MyProposals() {
  const { isFreelancer } = useAuth()
  const [proposals, setProposals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  
  // Mock data
  const mockProposals = [
    {
      id: 1,
      job: {
        id: 1,
        title: 'Full Stack Developer Needed for E-commerce Site',
        budget: '$2000-$3000',
        client: {
          id: 101,
          name: 'TechSolutions Inc.',
          avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
        }
      },
      coverLetter: "I'm a full stack developer with 5+ years of experience building e-commerce websites using React and Node.js. I've worked on similar projects for clients in retail and fashion industries. I'm confident I can deliver a high-quality, responsive e-commerce site that meets all your requirements.",
      bid: 2500,
      deliveryTime: 30,
      status: 'pending',
      submittedAt: '2023-04-16'
    },
    {
      id: 2,
      job: {
        id: 2,
        title: 'Logo Design for New Startup',
        budget: '$500-$800',
        client: {
          id: 102,
          name: 'AI Innovations',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
        }
      },
      coverLetter: "I'm a professional graphic designer with 7+ years of experience creating logos and brand identities for startups and established businesses. I specialize in creating modern, minimalist designs that are memorable and versatile. I'd love to help bring your brand to life.",
      bid: 650,
      deliveryTime: 7,
      status: 'accepted',
      submittedAt: '2023-04-19',
      acceptedAt: '2023-04-21'
    },
    {
      id: 3,
      job: {
        id: 3,
        title: 'Content Writer for Technology Blog',
        budget: '$30-$50 per article',
        client: {
          id: 103,
          name: 'TechBlog Media',
          avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
        }
      },
      coverLetter: "I'm a technology writer with experience creating engaging content about emerging technologies. I have a background in computer science and can explain complex technical concepts in an accessible way. I'd love to contribute to your blog.",
      bid: 40,
      deliveryTime: 3,
      status: 'rejected',
      submittedAt: '2023-04-10',
      rejectedAt: '2023-04-12'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProposals(mockProposals)
      setIsLoading(false)
    }, 1000)
  }, [])

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">My Proposals</h1>
        <p className="text-secondary-600 mt-1">Track and manage your job proposals</p>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-secondary-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Proposals
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'accepted'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('accepted')}
          >
            Accepted
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rejected'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected
          </button>
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
                      <img
                        src={proposal.job.client.avatar}
                        alt={proposal.job.client.name}
                        className="h-5 w-5 rounded-full mr-2"
                      />
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
                      {proposal.status === 'pending' 
                        ? 'Pending' 
                        : proposal.status === 'accepted'
                        ? 'Accepted'
                        : 'Rejected'}
                    </span>
                    <span className="text-xs text-secondary-500 mt-1">
                      Submitted: {new Date(proposal.submittedAt).toLocaleDateString()}
                    </span>
                    {proposal.acceptedAt && (
                      <span className="text-xs text-secondary-500 mt-1">
                        Accepted: {new Date(proposal.acceptedAt).toLocaleDateString()}
                      </span>
                    )}
                    {proposal.rejectedAt && (
                      <span className="text-xs text-secondary-500 mt-1">
                        Rejected: {new Date(proposal.rejectedAt).toLocaleDateString()}
                      </span>
                    )}
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
                  
                  {proposal.status === 'pending' && (
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Withdraw Proposal
                    </button>
                  )}
                  
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