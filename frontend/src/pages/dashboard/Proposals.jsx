import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

function Proposals() {
  const { isClient } = useAuth()
  const [proposals, setProposals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState('all')
  
  // Mock data
  const mockJobs = [
    { id: 1, title: 'Full Stack Developer Needed for E-commerce Site' },
    { id: 2, title: 'Logo Design for New Startup' }
  ]
  
  const mockProposals = [
    {
      id: 1,
      jobId: 1,
      jobTitle: 'Full Stack Developer Needed for E-commerce Site',
      freelancer: {
        id: 101,
        name: 'John Smith',
        title: 'Senior Full Stack Developer',
        rating: 4.9,
        completedJobs: 32,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      coverLetter: "I'm a full stack developer with 5+ years of experience building e-commerce websites using React and Node.js. I've worked on similar projects for clients in retail and fashion industries. I'm confident I can deliver a high-quality, responsive e-commerce site that meets all your requirements.",
      bid: 2500,
      deliveryTime: 30,
      status: 'pending',
      submittedAt: '2023-04-16'
    },
    {
      id: 2,
      jobId: 1,
      jobTitle: 'Full Stack Developer Needed for E-commerce Site',
      freelancer: {
        id: 102,
        name: 'Sarah Johnson',
        title: 'Full Stack Web Developer',
        rating: 4.7,
        completedJobs: 18,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      coverLetter: "I specialize in building e-commerce platforms with React, Node.js, and MongoDB. I've developed several online stores with features like product catalogs, shopping carts, and payment integrations. I'm excited about your project and would love to discuss it further.",
      bid: 2800,
      deliveryTime: 25,
      status: 'pending',
      submittedAt: '2023-04-17'
    },
    {
      id: 3,
      jobId: 2,
      jobTitle: 'Logo Design for New Startup',
      freelancer: {
        id: 103,
        name: 'Michael Chen',
        title: 'Graphic Designer & Illustrator',
        rating: 5.0,
        completedJobs: 45,
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
      },
      coverLetter: "I'm a professional graphic designer with 7+ years of experience creating logos and brand identities for startups and established businesses. I specialize in creating modern, minimalist designs that are memorable and versatile. I'd love to help bring your brand to life.",
      bid: 650,
      deliveryTime: 7,
      status: 'pending',
      submittedAt: '2023-04-19'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProposals(mockProposals)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter proposals based on selected job
  const filteredProposals = selectedJob === 'all'
    ? proposals
    : proposals.filter(proposal => proposal.jobId === parseInt(selectedJob))

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
          {mockJobs.map(job => (
            <option key={job.id} value={job.id}>{job.title}</option>
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
            <div key={proposal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-secondary-900 mb-1">
                      Proposal for: {proposal.jobTitle}
                    </h2>
                    <p className="text-sm text-secondary-500">
                      Submitted on {new Date(proposal.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary-600">${proposal.bid}</p>
                    <p className="text-sm text-secondary-500">
                      Delivery: {proposal.deliveryTime} days
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col md:flex-row gap-6">
                  {/* Freelancer Info */}
                  <div className="md:w-1/3">
                    <div className="flex items-center mb-4">
                      <img
                        src={proposal.freelancer.avatar}
                        alt={proposal.freelancer.name}
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-medium text-secondary-900">
                          <Link to={`/freelancers/${proposal.freelancer.id}`} className="hover:text-primary-600">
                            {proposal.freelancer.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-secondary-500">{proposal.freelancer.title}</p>
                      </div>
                    </div>
                    
                    <div className="bg-secondary-50 rounded-md p-4">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm font-medium text-secondary-900">
                          {proposal.freelancer.rating} / 5
                        </span>
                      </div>
                      <div className="text-sm text-secondary-600">
                        <p>Completed Jobs: {proposal.freelancer.completedJobs}</p>
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
                    </div>
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