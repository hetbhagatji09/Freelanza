import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

function ManageJobs() {
  const { isClient } = useAuth()
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('active')
  
  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: 'Full Stack Developer Needed for E-commerce Site',
      description: 'Looking for an experienced developer to build a responsive e-commerce website with React and Node.js.',
      budget: '$2000-$3000',
      category: 'Web Development',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      location: 'Remote',
      postedDate: '2023-04-15',
      deadline: '2023-05-15',
      status: 'active',
      proposals: 5
    },
    {
      id: 2,
      title: 'Logo Design for New Startup',
      description: 'Need a modern, minimalist logo for a tech startup in the AI space.',
      budget: '$500-$800',
      category: 'Graphic Design',
      skills: ['Logo Design', 'Branding', 'Adobe Illustrator'],
      location: 'Remote',
      postedDate: '2023-04-18',
      deadline: '2023-05-02',
      status: 'active',
      proposals: 3
    },
    {
      id: 3,
      title: 'Content Writer for Technology Blog',
      description: 'Seeking a skilled content writer to create engaging articles about emerging technologies.',
      budget: '$30-$50 per article',
      category: 'Writing',
      skills: ['Content Writing', 'SEO', 'Technology'],
      location: 'Remote',
      postedDate: '2023-03-20',
      deadline: '2023-04-20',
      status: 'expired',
      proposals: 8
    },
    {
      id: 4,
      title: 'Mobile App Development for Fitness Tracking',
      description: 'Need a developer to create a fitness tracking app for iOS and Android using React Native.',
      budget: '$3000-$5000',
      category: 'Mobile Development',
      skills: ['React Native', 'Firebase', 'UI/UX Design'],
      location: 'Remote',
      postedDate: '2023-02-22',
      deadline: '2023-03-22',
      status: 'completed',
      proposals: 12,
      hiredFreelancer: {
        id: 101,
        name: 'John Smith',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter jobs based on active tab
  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'all') return true
    return job.status === activeTab
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
              activeTab === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Jobs
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'expired'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('expired')}
          >
            Expired
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'completed'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </nav>
      </div>
      
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
            {activeTab === 'all'
              ? "You haven't posted any jobs yet."
              : `You don't have any ${activeTab} jobs.`}
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
                  Proposals
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredJobs.map(job => (
                <tr key={job.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-secondary-900">
                          <Link to={`/jobs/${job.id}`} className="hover:text-primary-600">
                            {job.title}
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
                    <div className="text-sm text-secondary-900">{job.budget}</div>
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
                      job.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : job.status === 'expired'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                    {job.status === 'completed' ? (
                      <div className="flex items-center">
                        <img
                          src={job.hiredFreelancer.avatar}
                          alt={job.hiredFreelancer.name}
                          className="h-6 w-6 rounded-full mr-2"
                        />
                        <span>{job.hiredFreelancer.name}</span>
                      </div>
                    ) : (
                      <Link to="/dashboard/proposals" className="text-primary-600 hover:text-primary-900">
                        {job.proposals} proposals
                      </Link>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View
                      </Link>
                      {job.status === 'active' && (
                        <>
                          <span className="text-secondary-300">|</span>
                          <button className="text-secondary-600 hover:text-secondary-900">
                            Edit
                          </button>
                          <span className="text-secondary-300">|</span>
                          <button className="text-red-600 hover:text-red-900">
                            Close
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageJobs