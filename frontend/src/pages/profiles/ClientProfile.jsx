import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ClientProfile() {
  const { id } = useParams()
  const [client, setClient] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Mock client data
  const mockClient = {
    id: parseInt(id),
    name: 'TechSolutions Inc.',
    logo: 'https://randomuser.me/api/portraits/men/42.jpg',
    location: 'San Francisco, USA',
    website: 'https://techsolutions.example.com',
    rating: 4.8,
    totalJobs: 15,
    totalSpent: 45000,
    memberSince: '2022-01-10',
    description: `TechSolutions Inc. is a leading software development company specializing in custom web and mobile applications. We work with businesses of all sizes to create innovative digital solutions that drive growth and efficiency.

Our team is passionate about leveraging the latest technologies to solve complex business challenges. We believe in collaborative partnerships with our clients to ensure we deliver solutions that truly meet their needs.`,
    industry: 'Software Development',
    companySize: '10-50 employees',
    activeJobs: [
      {
        id: 1,
        title: 'Full Stack Developer Needed for E-commerce Site',
        budget: '$2000-$3000',
        postedDate: '2023-04-15',
        proposals: 5
      },
      {
        id: 2,
        title: 'Logo Design for New Startup',
        budget: '$500-$800',
        postedDate: '2023-04-18',
        proposals: 3
      }
    ],
    completedJobs: [
      {
        id: 3,
        title: 'Mobile App Development for Fitness Tracking',
        budget: '$3000-$5000',
        completedDate: '2023-03-10',
        freelancer: {
          id: 101,
          name: 'John Smith',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
      },
      {
        id: 4,
        title: 'Content Writer for Technology Blog',
        budget: '$30-$50 per article',
        completedDate: '2023-02-15',
        freelancer: {
          id: 102,
          name: 'Sarah Johnson',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        }
      },
      {
        id: 5,
        title: 'Social Media Marketing Campaign',
        budget: '$1000-$1500',
        completedDate: '2023-01-20',
        freelancer: {
          id: 103,
          name: 'Michael Chen',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
        }
      }
    ],
    reviews: [
      {
        id: 1,
        freelancer: {
          name: 'John Smith',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          title: 'Full Stack Developer'
        },
        rating: 5,
        date: '2023-03-15',
        text: 'Great client to work with! Clear requirements, prompt communication, and fair payment. Would definitely work with them again.'
      },
      {
        id: 2,
        freelancer: {
          name: 'Sarah Johnson',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          title: 'Content Writer'
        },
        rating: 5,
        date: '2023-02-20',
        text: 'TechSolutions was a pleasure to work with. They provided detailed feedback and were very respectful of my time and expertise.'
      },
      {
        id: 3,
        freelancer: {
          name: 'Michael Chen',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
          title: 'Marketing Specialist'
        },
        rating: 4,
        date: '2023-01-25',
        text: 'Good client with clear objectives. Communication was sometimes delayed, but overall a positive experience.'
      }
    ]
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setClient(mockClient)
      setIsLoading(false)
    }, 1000)
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="container-custom">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-secondary-900">Client Not Found</h3>
            <p className="mt-1 text-secondary-500">The client you're looking for doesn't exist or has been removed.</p>
            <div className="mt-6">
              <Link to="/" className="text-primary-600 hover:text-primary-500">
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-32 w-32 rounded-full mb-4"
                  />
                  <h1 className="text-2xl font-bold text-secondary-900">{client.name}</h1>
                  <p className="text-secondary-600 mt-1">{client.industry}</p>
                  <div className="flex items-center mt-2">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-secondary-900 font-medium">{client.rating}</span>
                    <span className="mx-1 text-secondary-500">•</span>
                    <span className="text-secondary-500">{client.totalJobs} jobs</span>
                  </div>
                </div>
                
                <div className="border-t border-secondary-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-secondary-500">Location</p>
                      <p className="font-medium text-secondary-900">{client.location}</p>
                    </div>
                    <div>
                      <p className="text-secondary-500">Company Size</p>
                      <p className="font-medium text-secondary-900">{client.companySize}</p>
                    </div>
                    <div>
                      <p className="text-secondary-500">Member Since</p>
                      <p className="font-medium text-secondary-900">
                        {new Date(client.memberSince).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-secondary-500">Total Spent</p>
                      <p className="font-medium text-secondary-900">${client.totalSpent}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 flex items-center justify-center"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">About {client.name}</h2>
                <div className="prose prose-sm max-w-none text-secondary-700">
                  {client.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Active Job Postings</h2>
                {client.activeJobs.length === 0 ? (
                  <p className="text-secondary-500 text-center py-4">No active job postings at the moment.</p>
                ) : (
                  <div className="space-y-4">
                    {client.activeJobs.map(job => (
                      <div key={job.id} className="border border-secondary-200 rounded-lg p-4 hover:bg-secondary-50">
                        <Link to={`/jobs/${job.id}`} className="block">
                          <h3 className="font-medium text-secondary-900 hover:text-primary-600">{job.title}</h3>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center text-sm text-secondary-500">
                              <span className="mr-3">
                                Budget: <span className="text-primary-600 font-medium">{job.budget}</span>
                              </span>
                              <span>
                                Posted: {new Date(job.postedDate).toLocaleDateString()}
                              </span>
                            </div>
                            <span className="text-sm text-secondary-500">
                              {job.proposals} proposals
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Completed Jobs</h2>
                {client.completedJobs.length === 0 ? (
                  <p className="text-secondary-500 text-center py-4">No completed jobs yet.</p>
                ) : (
                  <div className="space-y-4">
                    {client.completedJobs.map(job => (
                      <div key={job.id} className="border border-secondary-200 rounded-lg p-4">
                        <h3 className="font-medium text-secondary-900">{job.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center text-sm text-secondary-500">
                            <span className="mr-3">
                              Budget: <span className="text-primary-600 font-medium">{job.budget}</span>
                            </span>
                            <span>
                              Completed: {new Date(job.completedDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <img
                              src={job.freelancer.avatar}
                              alt={job.freelancer.name}
                              className="h-6 w-6 rounded-full mr-2"
                            />
                            <Link to={`/freelancers/${job.freelancer.id}`} className="text-sm text-secondary-700 hover:text-primary-600">
                              {job.freelancer.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Freelancer Reviews</h2>
                {client.reviews.length === 0 ? (
                  <p className="text-secondary-500 text-center py-4">No reviews yet.</p>
                ) : (
                  <div className="space-y-6">
                    {client.reviews.map(review => (
                      <div key={review.id} className={review.id !== 1 ? 'pt-6 border-t border-secondary-200' : ''}>
                        <div className="flex items-start">
                          <img
                            src={review.freelancer.avatar}
                            alt={review.freelancer.name}
                            className="h-10 w-10 rounded-full mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium text-secondary-900">{review.freelancer.name}</h3>
                                <p className="text-sm text-secondary-500">{review.freelancer.title}</p>
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-secondary-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="mt-2 text-secondary-700">{review.text}</p>
                            <p className="mt-1 text-xs text-secondary-500">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientProfile