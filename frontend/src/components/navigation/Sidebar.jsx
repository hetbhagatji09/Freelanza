import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

function Sidebar({ isOpen, setIsOpen }) {
  const { currentUser, isClient, isFreelancer } = useAuth()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const clientLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Post a Job', path: '/dashboard/post-job', icon: 'M12 4v16m8-8H4' },
    { name: 'Manage Jobs', path: '/dashboard/manage-jobs', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { name: 'Proposals', path: '/dashboard/proposals', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Projects', path: '/dashboard/projects', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
    { name: 'Edit Profile', path: '/dashboard/edit-profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ]

  const freelancerLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Find Jobs', path: '/jobs', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { name: 'My Proposals', path: '/dashboard/my-proposals', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Projects', path: '/dashboard/projects', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
    { name: 'Edit Profile', path: '/dashboard/edit-profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ]

  const links = isClient ? clientLinks : freelancerLinks

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-secondary-600 bg-opacity-75 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:z-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-6 border-b border-secondary-200">
            <Link to="/" className="text-xl font-bold text-primary-600">
              FreelanceHub
            </Link>
            <button
              className="md:hidden text-secondary-500 hover:text-secondary-700"
              onClick={() => setIsOpen(false)}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 border-b border-secondary-200">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-secondary-900">{currentUser?.name}</p>
                  <p className="text-xs text-secondary-500 capitalize">{currentUser?.role}</p>
                </div>
              </div>
            </div>

            <nav className="px-2 py-4">
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive(link.path)
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-secondary-700 hover:bg-secondary-100'
                      }`}
                    >
                      <svg
                        className={`mr-3 h-5 w-5 ${
                          isActive(link.path) ? 'text-primary-500' : 'text-secondary-400 group-hover:text-secondary-500'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} />
                      </svg>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="px-4 py-4 border-t border-secondary-200">
            <Link
              to="/"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-secondary-700 hover:bg-secondary-100"
            >
              <svg
                className="mr-3 h-5 w-5 text-secondary-400 group-hover:text-secondary-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar