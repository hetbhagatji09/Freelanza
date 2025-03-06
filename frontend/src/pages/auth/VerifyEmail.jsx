import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function VerifyEmail() {
  const [email, setEmail] = useState('')
  const location = useLocation()

  useEffect(() => {
    // Get email from location state if available
    if (location.state?.email) {
      setEmail(location.state.email)
    }
  }, [location])

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
            <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-secondary-600">
            We've sent a verification link to{' '}
            <span className="font-medium text-primary-600">
              {email || 'your email address'}
            </span>
          </p>
        </div>
        
        <div className="bg-secondary-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-secondary-800">
                Instructions
              </h3>
              <div className="mt-2 text-sm text-secondary-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Check your email inbox for a verification link</li>
                  <li>Click the link to verify your email address</li>
                  <li>If you don't see the email, check your spam folder</li>
                  <li>The verification link will expire in 24 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Back to login
            </Link>
          </div>
          <div className="text-sm">
            <button className="font-medium text-primary-600 hover:text-primary-500">
              Resend verification email
            </button>
          </div>
        </div>
        
        <div className="pt-4 border-t border-secondary-200">
          <p className="text-center text-sm text-secondary-600">
            For demo purposes, you can{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              login directly
            </Link>{' '}
            without verification.
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail