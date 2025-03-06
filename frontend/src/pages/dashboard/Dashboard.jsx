import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

function Dashboard() {
  const { currentUser, isClient, isFreelancer } = useAuth()
  const [stats, setStats] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get dashboard data
    setTimeout(() => {
      if (isClient) {
        setStats({
          activeJobs: 3,
          totalProposals: 12,
          ongoingProjects: 2,
          completedProjects: 5,
          totalSpent: 4250
        })
        
        setRecentActivity([
          {
            id: 1,
            type: 'proposal',
            title: 'New proposal received',
            description: 'John Smith submitted a proposal for "Full Stack Developer Needed"',
            time: '2 hours ago',
            link: '/dashboard/proposals'
          },
          {
            id: 2,
            type: 'project',
            title: 'Project milestone completed',
            description: 'Sarah Johnson completed the first milestone for "Logo Design Project"',
            time: '1 day ago',
            link: '/dashboard/projects/1'
          },
          {
            id: 3,
            type: 'job',
            title: 'Job posting expired',
            description: 'Your job posting "Content Writer for Blog" has expired',
            time: '2 days ago',
            link: '/dashboard/manage-jobs'
          }
        ])
      } else {
        setStats({
          availableJobs: 15,
          submittedProposals: 8,
          activeProjects: 2,
          completedProjects: 7,
          totalEarned: 3750
        })
        
        setRecentActivity([
          {
            id: 1,
            type: 'job',
            title: 'New job matching your skills',
            description: 'A new job "React Developer for E-commerce Site" matches your profile',
            time: '3 hours ago',
            link: '/jobs/1'
          },
          {
            id: 2,
            type: 'proposal',
            title: 'Proposal accepted',
            description: 'Your proposal for "Mobile App Development" was accepted',
            time: '1 day ago',
            link: '/dashboard/projects/2'
          },
          {
            id: 3,
            type: 'payment',
            title: 'Payment received',
            description: 'You received a payment of $750 for "Website Redesign Project"',
            time: '3 days ago',
            link: '/dashboard/projects'
          }
        ])
      }
      
      setIsLoading(false)
    }, 1000)
  }, [isClient, isFreelancer])

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
        <h1 className="text-2xl font-bold text-secondary-900">Welcome back, {currentUser.name}!</h1>
        <p className="text-secondary-600 mt-1">Here's what's happening with your {isClient ? 'projects' : 'freelance work'} today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isClient ? (
          <>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-500">Active Jobs</p>
                  <p className="text-2xl font-semibold text-secondary-900">{stats.activeJobs}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/dashboard/manage-jobs" className="text-sm text-primary-600 hover:text-primary-700">
                  View all jobs →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-500">Total Proposals</p>
                  <p className="text-2xl font-semibold text-secondary-900">{stats.totalProposals}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/dashboard/proposals" className="text-sm text-primary-600 hover:text-primary-700">
                  Review proposals →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-500">Ongoing Projects</p>
                  <p className="text-2xl font-semibold text-secondary-900">{stats.ongoingProjects}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/dashboard/projects" className="text-sm text-primary-600 hover:text-primary-700">
                  Manage projects →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-500">Total Spent</p>
                  <p className="text-2xl font-semibold text-secondary-900">${stats.totalSpent}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/dashboard/projects" className="text-sm text-primary-600 hover:text-primary-700">
                  View history →
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-500">Available Jobs</p>
                  <p className="text-2xl font-semibold text-secondary-900">{stats.availableJobs}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/jobs" className="text-sm text-primary-600 hover:text-primary-700">
                  Find jobs →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-500">My Proposals</p>
                  <p className="text-2xl font-semibold text-secondary-900">{stats.submittedProposals}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/dashboard/my-proposals" className="text-sm text-primary-600 hover:text-primary-700">
                  View proposals →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-500">Active Projects</p>
                  <p className="text-2xl font-semibold text-secondary-900">{stats.activeProjects}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/dashboard/projects" className="text-sm text-primary-600 hover:text-primary-700">
                  Manage projects →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-secondary-500">Total Earned</p>
                  <p className="text-2xl font-semibold text-secondary-900">${stats.totalEarned}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/dashboard/projects" className="text-sm text-primary-600 hover:text-primary-700">
                  View history →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isClient ? (
            <>
              <Link
                to="/dashboard/post-job"
                className="flex items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50"
              >
                <div className="p-2 rounded-full bg-primary-100 text-primary-600 mr-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="font-medium text-secondary-900">Post a New Job</span>
              </Link>
              
              <Link
                to="/dashboard/proposals"
                className="flex items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50"
              >
                <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-medium text-secondary-900">Review Proposals</span>
              </Link>
              
              <Link
                to="/dashboard/projects"
                className="flex items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50"
              >
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="font-medium text-secondary-900">Manage Projects</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/jobs"
                className="flex items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50"
              >
                <div className="p-2 rounded-full bg-primary-100 text-primary-600 mr-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="font-medium text-secondary-900">Find New Jobs</span>
              </Link>
              
              <Link
                to="/dashboard/my-proposals"
                className="flex items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50"
              >
                <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-medium text-secondary-900">My Proposals</span>
              </Link>
              
              <Link
                to="/dashboard/projects"
                className="flex items-center p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50"
              >
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="font-medium text-secondary-900">Active Projects</span>
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Recent Activity</h2>
        
        {recentActivity.length === 0 ? (
          <p className="text-secondary-500 text-center py-4">No recent activity to display.</p>
        ) : (
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start border-b border-secondary-200 pb-4 last:border-0 last:pb-0">
                <div className={`p-2 rounded-full mr-3 ${
                  activity.type === 'proposal' ? 'bg-green-100 text-green-600' :
                  activity.type === 'project' ? 'bg-yellow-100 text-yellow-600' :
                  activity.type === 'job' ? 'bg-primary-100 text-primary-600' :
                  'bg-indigo-100 text-indigo-600'
                }`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {activity.type === 'proposal' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    )}
                    {activity.type === 'project' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    )}
                    {activity.type === 'job' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    )}
                    {activity.type === 'payment' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-secondary-900">{activity.title}</h3>
                  <p className="text-sm text-secondary-500">{activity.description}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-secondary-400">{activity.time}</span>
                    <Link to={activity.link} className="text-xs text-primary-600 hover:text-primary-700">
                      View details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard