import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

function ProjectDetails() {
  const { id } = useParams()
  const { isClient, isFreelancer } = useAuth()
  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [files, setFiles] = useState([])
  const [showMilestoneModal, setShowMilestoneModal] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  
  // Mock project data
  const mockProject = {
    id: parseInt(id),
    title: 'E-commerce Website Development',
    description: `Building a responsive e-commerce website with product catalog, shopping cart, and checkout functionality.

The website should include the following features:
- User authentication and account management
- Product catalog with categories and search functionality
- Shopping cart and checkout process
- Payment gateway integration (Stripe)
- Order management for administrators
- Responsive design for mobile and desktop

The project will be built using React for the frontend and Node.js with Express for the backend. MongoDB will be used as the database.`,
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
        description: 'Initial project setup, wireframes, and design mockups.',
        status: 'completed',
        dueDate: '2023-04-01',
        amount: 750,
        submissionDate: '2023-03-30',
        feedback: 'Great work on the designs! The mockups look excellent and match our brand guidelines perfectly.'
      },
      {
        id: 2,
        title: 'Frontend Development',
        description: 'Implement the user interface based on the approved designs.',
        status: 'completed',
        dueDate: '2023-05-01',
        amount: 1000,
        submissionDate: '2023-04-28',
        feedback: 'The frontend looks great and is very responsive. A few minor tweaks were needed but overall excellent work.'
      },
      {
        id: 3,
        title: 'Backend Integration',
        description: 'Develop the backend API and integrate with the frontend.',
        status: 'in-progress',
        dueDate: '2023-06-01',
        amount: 1000
      },
      {
        id: 4,
        title: 'Testing & Deployment',
        description: 'Perform testing and deploy the application to production.',
        status: 'pending',
        dueDate: '2023-06-15',
        amount: 250
      }
    ]
  }
  
  // Mock messages
  const mockMessages = [
    {
      id: 1,
      sender: {
        id: 101,
        name: 'TechSolutions Inc.',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        role: 'client'
      },
      message: 'Hi John, just checking in on the progress of the backend integration. How is it going?',
      timestamp: '2023-05-15T10:30:00Z'
    },
    {
      id: 2,
      sender: {
        id: 201,
        name: 'John Smith',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'freelancer'
      },
      message: 'Hello! The backend integration is going well. I\'ve completed the user authentication and product catalog APIs. Currently working on the shopping cart functionality. Should be done by the end of the week.',
      timestamp: '2023-05-15T11:15:00Z'
    },
    {
      id: 3,
      sender: {
        id: 101,
        name: 'TechSolutions Inc.',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        role: 'client'
      },
      message: 'That sounds great! Let me know if you need any clarification on the requirements for the checkout process.',
      timestamp: '2023-05-15T14:20:00Z'
    }
  ]
  
  // Mock files
  const mockFiles = [
    {
      id: 1,
      name: 'e-commerce-wireframes.pdf',
      size: '2.4 MB',
      uploadedBy: {
        id: 201,
        name: 'John Smith',
        role: 'freelancer'
      },
      uploadDate: '2023-03-20T09:15:00Z',
      milestone: 'Project Setup & Design'
    },
    {
      id: 2,
      name: 'design-mockups.zip',
      size: '15.7 MB',
      uploadedBy: {
        id: 201,
        name: 'John Smith',
        role: 'freelancer'
      },
      uploadDate: '2023-03-28T14:30:00Z',
      milestone: 'Project Setup & Design'
    },
    {
      id: 3,
      name: 'frontend-code.zip',
      size: '8.2 MB',
      uploadedBy: {
        id: 201,
        name: 'John Smith',
        role: 'freelancer'
      },
      uploadDate: '2023-04-28T16:45:00Z',
      milestone: 'Frontend Development'
    },
    {
      id: 4,
      name: 'project-requirements.docx',
      size: '1.1 MB',
      uploadedBy: {
        id: 101,
        name: 'TechSolutions Inc.',
        role: 'client'
      },
      uploadDate: '2023-03-16T11:20:00Z',
      milestone: 'General'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProject(mockProject)
      setMessages(mockMessages)
      setFiles(mockFiles)
      setIsLoading(false)
    }, 1000)
  }, [id])

  const handleSendMessage = (e) => {
    e.preventDefault()
    
    if (!newMessage.trim()) return
    
    // In a real app, this would send the message to the API
    const newMsg = {
      id: messages.length + 1,
      sender: {
        id: isClient ? 101 : 201,
        name: isClient ? 'TechSolutions Inc.' : 'John Smith',
        avatar: isClient ? 'https://randomuser.me/api/portraits/men/42.jpg' : 'https://randomuser.me/api/portraits/men/32.jpg',
        role: isClient ? 'client' : 'freelancer'
      },
      message: newMessage,
      timestamp: new Date().toISOString()
    }
    
    setMessages([...messages, newMsg])
    setNewMessage('')
  }

  const handleMilestoneAction = (milestone) => {
    setSelectedMilestone(milestone)
    setShowMilestoneModal(true)
  }

  const handleMilestoneSubmit = () => {
    // In a real app, this would update the milestone status via API
    const updatedMilestones = project.milestones.map(m => {
      if (m.id === selectedMilestone.id) {
        return {
          ...m,
          status: isFreelancer ? 'submitted' : 'completed',
          submissionDate: isFreelancer ? new Date().toISOString() : m.submissionDate
        }
      }
      return m
    })
    
    setProject({
      ...project,
      milestones: updatedMilestones,
      progress: calculateProgress(updatedMilestones)
    })
    
    setShowMilestoneModal(false)
  }

  const calculateProgress = (milestones) => {
    const totalMilestones = milestones.length
    const completedMilestones = milestones.filter(m => m.status === 'completed').length
    return Math.round((completedMilestones / totalMilestones) * 100)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-secondary-900">Project Not Found</h3>
        <p className="mt-1 text-secondary-500">The project you're looking for doesn't exist or has been removed.</p>
        <div className="mt-6">
          <Link
            to="/dashboard/projects"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/dashboard/projects" className="text-primary-600 hover:text-primary-500 flex items-center">
          <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Projects
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">{project.title}</h1>
              <div className="flex items-center mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  project.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {project.status === 'active' ? 'Active' : 'Completed'}
                </span>
                <span className="mx-2 text-secondary-300">•</span>
                <span className="text-sm text-secondary-500">
                  Budget: <span className="font-medium text-secondary-700">${project.budget}</span>
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="text-right mr-4">
                <p className="text-sm text-secondary-500">Deadline</p>
                <p className="font-medium text-secondary-900">
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
              </div>
              <div>
                {isClient && project.status === 'active' && (
                  <button className="btn-primary">
                    Complete Project
                  </button>
                )}
              </div>
            </div>
          </div>
          
         
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              {/* <img
                src={project.client.avatar}
                alt={project.client.name}
                className="h-10 w-10 rounded-full mr-4"
              /> */}
              <div>
                <p className="text-sm font-medium text-secondary-900">Client</p>
                <Link to={`/clients/${project.client.id}`} className="text-sm text-primary-600 hover:text-primary-700">
                  {project.client.name}
                </Link>
              </div>
            </div>
            
            <div className="flex items-center">
              {/* <img
                src={project.freelancer.avatar}
                alt={project.freelancer.name}
                className="h-10 w-10 rounded-full mr-4"
              /> */}
              <div>
                <p className="text-sm font-medium text-secondary-900">Freelancer</p>
                <Link to={`/freelancers/${project.freelancer.id}`} className="text-sm text-primary-600 hover:text-primary-700">
                  {project.freelancer.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-secondary-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'milestones'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('milestones')}
          >
            Milestones
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'files'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
            onClick={() => setActiveTab('files')}
          >
            Files
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Project Description</h2>
            <div className="prose prose-sm max-w-none text-secondary-700 mb-6">
              {project.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            <div className="border-t border-secondary-200 pt-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Project Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-secondary-500">Start Date</p>
                  <p className="font-medium text-secondary-900">
                    {new Date(project.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Deadline</p>
                  <p className="font-medium text-secondary-900">
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Budget</p>
                  <p className="font-medium text-secondary-900">${project.budget}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Milestones Tab */}
        {activeTab === 'milestones' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-secondary-900">Project Milestones</h2>
              <div>
                <span className="text-sm text-secondary-500">
                  Total Budget: <span className="font-medium text-secondary-900">${project.budget}</span>
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              {project.milestones.map((milestone, index) => (
                <div 
                  key={milestone.id} 
                  className={`border rounded-lg ${
                    milestone.status === 'completed' 
                      ? 'border-green-200 bg-green-50' 
                      : milestone.status === 'in-progress'
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-secondary-200 bg-white'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white font-medium text-sm bg-primary-600">
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-medium text-secondary-900">{milestone.title}</h3>
                          <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            milestone.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : milestone.status === 'in-progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-secondary-100 text-secondary-800'
                          }`}>
                            {milestone.status === 'completed' 
                              ? 'Completed' 
                              : milestone.status === 'in-progress'
                              ? 'In Progress'
                              : 'Pending'}
                          </span>
                        </div>
                        
                        <p className="mt-2 text-secondary-600 ml-11">{milestone.description}</p>
                        
                        <div className="mt-2 ml-11 flex flex-wrap items-center text-sm text-secondary-500">
                          <span className="mr-4">
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </span>
                          <span>
                            Amount: <span className="font-medium text-secondary-700">${milestone.amount}</span>
                          </span>
                          
                          {milestone.submissionDate && (
                            <span className="ml-4">
                              Submitted: {new Date(milestone.submissionDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 ml-11 md:ml-0">
                        {isFreelancer && milestone.status === 'in-progress' && (
                          <button
                            className="btn-primary"
                            onClick={() => handleMilestoneAction(milestone)}
                          >
                            Submit Milestone
                          </button>
                        )}
                        
                        {isClient && milestone.status === 'submitted' && (
                          <button
                            className="btn-primary"
                            onClick={() => handleMilestoneAction(milestone)}
                          >
                            Approve & Pay
                          </button>
                        )}
                        
                        {milestone.status === 'completed' && (
                          <span className="inline-flex items-center text-green-600">
                            <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {milestone.feedback && (
                      <div className="mt-4 ml-11 p-3 bg-blue-50 border border-blue-100 rounded-md">
                        <p className="text-sm font-medium text-secondary-900">Client Feedback:</p>
                        <p className="text-sm text-secondary-600">{milestone.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Messages</h2>
            
            <div className="border border-secondary-200 rounded-lg mb-4">
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <p className="text-center text-secondary-500 py-4">No messages yet. Start the conversation!</p>
                ) : (
                  messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender.role === (isClient ? 'client' : 'freelancer') ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-md ${message.sender.role === (isClient ? 'client' : 'freelancer') ? 'flex-row-reverse' : 'flex-row'}`}>
                        <img
                          src={message.sender.avatar}
                          alt={message.sender.name}
                          className={`h-8 w-8 rounded-full ${message.sender.role === (isClient ? 'client' : 'freelancer') ? 'ml-2' : 'mr-2'}`}
                        />
                        <div>
                          <div className={`rounded-lg p-3 ${
                            message.sender.role === (isClient ? 'client' : 'freelancer')
                              ? 'bg-primary-100 text-primary-800'
                              : 'bg-secondary-100 text-secondary-800'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                          </div>
                          <p className={`text-xs text-secondary-500 mt-1 ${message.sender.role === (isClient ? 'client' : 'freelancer') ? 'text-right' : 'text-left'}`}>
                            {new Date(message.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="border-t border-secondary-200 p-4">
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    className="input rounded-r-none flex-1"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {/* Files Tab */}
        {activeTab === 'files' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-secondary-900">Project Files</h2>
              <button className="btn-primary">
                Upload File
              </button>
            </div>
            
            {files.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-secondary-300 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-2 text-secondary-500">No files uploaded yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        File Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Uploaded By
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Milestone
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-secondary-200">
                    {files.map(file => (
                      <tr key={file.id} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-secondary-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm font-medium text-secondary-900">{file.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          {file.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-900">{file.uploadedBy.name}</div>
                          <div className="text-xs text-secondary-500 capitalize">{file.uploadedBy.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          {new Date(file.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          {file.milestone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">
                            Download
                          </button>
                          {file.uploadedBy.role === (isClient ? 'client' : 'freelancer') && (
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Milestone Modal */}
      {showMilestoneModal && selectedMilestone && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-secondary-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-secondary-900">
                      {isFreelancer ? 'Submit Milestone' : 'Approve Milestone'}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-secondary-500">
                        {isFreelancer 
                          ? 'Are you sure you want to submit this milestone as completed? This will notify the client for review and payment.'
                          : `Are you sure you want to approve and release payment for this milestone? Amount: $${selectedMilestone.amount}`
                        }
                      </p>
                      
                      {isFreelancer && (
                        <div className="mt-4">
                          <label htmlFor="milestone-notes" className="block text-sm font-medium text-secondary-700 mb-1">
                            Submission Notes
                          </label>
                          <textarea
                            id="milestone-notes"
                            rows="3"
                            className="input"
                            placeholder="Add any notes about your submission..."
                          ></textarea>
                          
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-secondary-700 mb-1">
                              Attach Files (Optional)
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-secondary-300 border-dashed rounded-md">
                              <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-secondary-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-secondary-600">
                                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                                    <span>Upload files</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-secondary-500">
                                  PNG, JPG, PDF up to 10MB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {isClient && (
                        <div className="mt-4">
                          <label htmlFor="feedback" className="block text-sm font-medium text-secondary-700 mb-1">
                            Feedback (Optional)
                          </label>
                          <textarea
                            id="feedback"
                            rows="3"
                            className="input"
                            placeholder="Provide feedback on the completed milestone..."
                          ></textarea>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleMilestoneSubmit}
                >
                  {isFreelancer ? 'Submit Milestone' : 'Approve & Pay'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-secondary-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowMilestoneModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetails