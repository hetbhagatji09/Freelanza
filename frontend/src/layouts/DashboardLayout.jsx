import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import Sidebar from '../components/navigation/Sidebar.jsx'
import DashboardHeader from '../components/navigation/DashboardHeader.jsx'

function DashboardLayout() {
  const { currentUser } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-secondary-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader 
          openSidebar={() => setSidebarOpen(true)} 
          user={currentUser} 
        />
        
        <main className="flex-1 overflow-y-auto bg-secondary-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout