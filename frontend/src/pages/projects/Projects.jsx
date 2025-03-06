import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

function Projects() {
  const { isClient, isFreelancer } = useAuth()
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('active')
  
  // Mock project data
  const mockProjects = [
    {
      id: 1,
      title: 'E-commerce Website Development',
      description: 'Building a responsive e-commerce website with product catalog, shopping cart, and checkout functionality.',
      status: 'active',
      startDate: '2023-03-15',
      deadline: '2023-06-15',
      budget: 3000,
      progress: 65,
      client: {
        id: 101,
        name: 'TechSolutions Inc.',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
      },
      freelancer: {
        id: 201,
        name: 'John Smith',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      milestones: [
        {
          id: 1,
          title: 'Project Setup & Design',
          status: 'completed',
          dueDate: '2023-04-01',
          amount: 750
        },
        {
          id: 2,
          title: 'Frontend Development',
          status: 'completed',
          dueDate: '2023-05-01',
          amount: 1000
        },
        {
          id: 3,
          title: 'Backend Integration',
          status: 'in-progress',
          dueDate: '2023-06-01',
          amount: 1000
        },
        {
          id: 4,
          title: 'Testing & Deployment',
          status: 'pending',
          dueDate: '2023-06-15',
          amount: 250
        }
      ]
    },
    {
      id: 2,
      title: 'Logo Design for Startup',
      description: 'Creating a modern, minimalist logo for a tech startup in the AI space.',
      status: 'active',
      startDate: '2023-04-10',
      deadline: '2023-05-10',
      budget: 600,
      progress: 80,
      client: {
        id: 102,
        name: 'AI Innovations',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
      },
      freelancer: {
        id: 202,
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      milestones: [
        {
          id: 1,
          title: 'Initial Concepts',
          status: 'completed',
          dueDate: '2023-04-20',
          amount: 200
        },
        {
          id: 2,
          title: 'Revisions & Refinement',
          status: 'in-progress',
          dueDate: '2023-05-05',
          amount: 300
        },
        {
          id: 3,
          title: 'Final Delivery',
          status: 'pending',
          dueDate: '2023-05-10',
          amount: 100
        }
      ]
    },
    {
      id: 3,
      title: 'Content Writing for Blog',
      description: 'Writing 10 articles about emerging technologies for a technology blog.',
      status: 'completed',
      startDate: '2023-02-01',
      deadline: '2023-03-15',
      budget: 500,
      progress: 100,
      client: {
        id: 103,
        name: 'TechBlog Media',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
      },
      freelancer: {
        id: 203,
        name: 'Michael Chen',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
      },
      milestones: [
        {
          id: 1,
          title: 'First 5 Articles',
          status: 'completed',
          dueDate: '2023-02-15',
          amount: 250
        },
        {
          id: 2,
          title: 'Final 5 Articles',
          status: 'completed',
          dueDate: '2023-03-15',
          amount: 250
        }
      ]
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter projects based on active tab
  const filteredProjects = projects.filter(project => {
    if (activeTab === 'all') return true
    return project.status === activeTab
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">Projects</h1>
        <p className="text-secondary-600 mt-1">
          {isClient 
            ? 'Manage your projects with freelancers' 
            : 'Manage your active and completed projects'}
        </p>
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
            All Projects
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
      
      {/* Projects List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-secondary-900">No projects found</h3>
          <p className="mt-1 text-secondary-500">
            {activeTab === 'all'
              ? "You don't have any projects yet."
              : `You don't have any ${activeTab} projects.`}
          </p>
          {isClient && (
            <div className="mt-6">
              <Link
                to="/dashboard/post-job"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Post a New Job
              </Link>
            </div>
          )}
          {isFreelancer && (
            <div className="mt-6">
              <Link
                to="/jobs"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Find Jobs
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900">
                      <Link to={`/dashboard/projects/${project.id}`} className="hover:text-primary-600">
                        {project.title}
                      </Link>
                    </h2>
                    <p className="text-secondary-500 mt-1">{project.description}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-secondary-500 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-secondary-500">Budget</p>
                    <p className="font-medium text-secondary-900">${project.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary-500">Start Date</p>
                    <p className="font-medium text-secondary-900">
                      {new Date(project.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary-500">Deadline</p>
                    <p className="font-medium text-secondary-900">
                      {new Date(project.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-secondary-200">
                  <div className="flex items-center">
                    {isClient ? (
                      <>
                        <img
                          src={project.freelancer.avatar}
                          alt={project.freelancer.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="text-sm font-medium text-secondary-900">Freelancer</p>
                          <Link to={`/freelancers/${project.freelancer.id}`} className="text-sm text-primary-600 hover:text-primary-700">
                            {project.freelancer.name}
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={project.client.avatar}
                          alt={project.client.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="text-sm font-medium text-secondary-900">Client</p>
                          <Link to={`/clients/${project.client.id}`} className="text-sm text-primary-600 hover:text-primary-700">
                            {project.client.name}
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <Link
                      to={`/dashboard/projects/${project.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      View Details
                    </Link>
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

export default Projects