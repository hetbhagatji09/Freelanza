import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

function Navbar() {
  const { isAuthenticated, currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-600">
                Freelanza
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-secondary-600 hover:text-secondary-800 hover:border-secondary-300">
                Home
              </Link>
              <Link to="/jobs" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-secondary-600 hover:text-secondary-800 hover:border-secondary-300">
                Find Jobs
              </Link>
              {/* <Link to="/freelancers/1" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-secondary-600 hover:text-secondary-800 hover:border-secondary-300">
                Freelancers
              </Link>
              <Link to="/clients/1" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-secondary-600 hover:text-secondary-800 hover:border-secondary-300">
                Clients
              </Link> */}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                      {currentUser.email}
                    
                  </button>
                </div>
                
                {profileDropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                      role="menuitem"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/edit-profile"
                      className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                      role="menuitem"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100"
                      role="menuitem"
                      onClick={() => {
                        setProfileDropdownOpen(false)
                        handleLogout()
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-secondary-600 hover:text-secondary-900">
                  Log in
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign up
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary-400 hover:text-secondary-500 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary-600 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-800">
              Home
            </Link>
            <Link to="/jobs" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary-600 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-800">
              Find Jobs
            </Link>
            <Link to="/freelancers/1" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary-600 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-800">
              Freelancers
            </Link>
            <Link to="/clients/1" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-secondary-600 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-800">
              Clients
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-secondary-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={currentUser.avatar}
                      alt={currentUser.name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-secondary-800">{currentUser.name}</div>
                    <div className="text-sm font-medium text-secondary-500">{currentUser.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link to="/dashboard" className="block px-4 py-2 text-base font-medium text-secondary-600 hover:bg-secondary-100">
                    Dashboard
                  </Link>
                  <Link to="/dashboard/edit-profile" className="block px-4 py-2 text-base font-medium text-secondary-600 hover:bg-secondary-100">
                    Profile
                  </Link>
                  <button
                    className="w-full text-left block px-4 py-2 text-base font-medium text-secondary-600 hover:bg-secondary-100"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1 px-2">
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-secondary-600 hover:bg-secondary-100">
                  Log in
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar