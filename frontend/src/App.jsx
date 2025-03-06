import { Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext.jsx'

// Layouts
import MainLayout from './layouts/MainLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'

// Public Pages
import Home from './pages/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import VerifyEmail from './pages/auth/VerifyEmail.jsx'
import JobListings from './pages/jobs/JobListings.jsx'
import JobDetails from './pages/jobs/JobDetails.jsx'
import FreelancerProfile from './pages/profiles/FreelancerProfile.jsx'
import ClientProfile from './pages/profiles/ClientProfile.jsx'
import NotFound from './pages/NotFound.jsx'

// Protected Pages
import Dashboard from './pages/dashboard/Dashboard.jsx'
import PostJob from './pages/jobs/PostJob.jsx'
import ManageJobs from './pages/dashboard/ManageJobs.jsx'
import Proposals from './pages/dashboard/Proposals.jsx'
import MyProposals from './pages/dashboard/MyProposals.jsx'
import Projects from './pages/projects/Projects.jsx'
import ProjectDetails from './pages/projects/ProjectDetails.jsx'
import EditProfile from './pages/profiles/EditProfile.jsx'

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="jobs" element={<JobListings />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="freelancers/:id" element={<FreelancerProfile />} />
        <Route path="clients/:id" element={<ClientProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="manage-jobs" element={<ManageJobs />} />
        <Route path="proposals" element={<Proposals />} />
        <Route path="my-proposals" element={<MyProposals />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
  )
}

export default App