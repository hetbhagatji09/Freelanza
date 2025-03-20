import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

function DashboardHeader({ openSidebar, user }) {
  const { logout } = useAuth()
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="md:hidden px-4 text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={openSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-semibold text-secondary-900">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 relative">
              <div className="flex items-center">
                <Link to="/dashboard/edit-profile" className="mr-4 text-sm text-secondary-700 hover:text-secondary-900">
                  {user?.email}
                </Link>
                <div className="relative">
                  <Link to="/dashboard/edit-profile">
                   
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader