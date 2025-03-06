import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function FreelancerProfile() {
  const { id } = useParams()
  const [freelancer, setFreelancer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Mock freelancer data
  const mockFreelancer = {
    id: parseInt(id),
    name: 'John Smith',
    title: 'Senior Full Stack Developer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'New York, USA',
    hourlyRate: 45,
    rating: 4.9,
    totalJobs: 32,
    totalEarned: 28500,
    memberSince: '2022-03-15',
    bio: `Experienced full-stack developer with over 8 years of experience building web applications. I specialize in React, Node.js, and MongoDB, with a focus on creating scalable and maintainable code.

I've worked with clients ranging from startups to enterprise companies, helping them build everything from MVPs to complex applications. My approach is to understand the business needs first and then implement technical solutions that address those needs effectively.`,
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript', 'AWS', 'Docker'],
    education: [
      {
        degree: 'Master of Computer Science',
        institution: 'Stanford University',
        year: '2018'
      },
      {
        degree: 'Bachelor of Computer Science',
        institution: 'University of California, Berkeley',
        year: '2016'
      }
    ],
    experience: [
      {
        title: 'Senior Developer',
        company: 'Tech Innovations Inc.',
        period: '2020 - Present',
        description: 'Lead developer for multiple client projects, focusing on web application development using React and Node.js.'
      },
      {
        title: 'Full Stack Developer',
        company: 'Digital Solutions LLC',
        period: '2018 - 2020',
        description: 'Developed and maintained web applications for clients in various industries.'
      }
    ],
    portfolio: [
      {
        id: 1,
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce platform with product management, cart, and checkout functionality.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
        link: '#'
      },
      {
        id: 2,
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates and team features.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        link: '#'
      },
      {
        id: 3,
        title: 'Healthcare Dashboard',
        description: 'An analytics dashboard for healthcare providers to track patient data and outcomes.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        link: '#'
      }
    ],
    reviews: [
      {
        id: 1,
        client: {
          name: 'Sarah Johnson',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          company: 'Marketing Pro Inc.'
        },
        rating: 5,
        date: '2023-03-10',
        text: 'John was exceptional to work with. He understood our requirements perfectly and delivered a high-quality solution ahead of schedule. His communication was excellent throughout the project.'
      },
      {
        id: 2,
        client: {
          name: 'Michael Chen',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
          company: 'TechStart Solutions'
        },
        rating: 5,
        date: '2023-02-15',
        text: 'Working with John was a great experience. He is knowledgeable, professional, and delivers quality work. I would definitely hire him again for future projects.'
      },
      {
        id: 3,
        client: {
          name: 'Emily Rodriguez',
          avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
          company: 'Design Hub'
        },
        rating: 4,
        date: '2023-01-20',
        text: 'John did an excellent job on our web application. He was responsive to feedback and made sure the final product met all our requirements.'
      }
    ]
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFreelancer(mockFreelancer)
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

  if (!freelancer) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-secondary-900">Freelancer Not Found</h3>
            <p className="mt-1 text-secondary-500">The freelancer you're looking for doesn't exist or has been removed.</p>
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
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    className="h-32 w-32 rounded-full mb-4"
                  />
                  <h1 className="text-2xl font-bold text-secondary-900">{freelancer.name}</h1>
                  <p className="text-secondary-600 mt-1">{freelancer.title}</p>
                  <div className="flex items-center mt-2">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-secondary-900 font-medium">{freelancer.rating}</span>
                    <span className="mx-1 text-secondary-500">•</span>
                    <span className="text-secondary-500">{freelancer.totalJobs} jobs</span>
                  </div>
                </div>
                
                <div className="border-t border-secondary-200 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-secondary-500">Location</p>
                      <p className="font-medium text-secondary-900">{freelancer.location}</p>
                    </div>
                    <div>
                      <p className="text-secondary-500">Rate</p>
                      <p className="font-medium text-secondary-900">${freelancer.hourlyRate}/hr</p>
                    </div>
                    <div>
                      <p className="text-secondary-500">Member Since</p>
                      <p className="font-medium text-secondary-900">
                        {new Date(freelancer.memberSince).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-secondary-500">Total Earned</p>
                      <p className="font-medium text-secondary-900">${freelancer.totalEarned}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="w-full btn-primary">
                    Contact Me
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Education</h2>
                <div className="space-y-4">
                  {freelancer.education.map((edu, index) => (
                    <div key={index} className={index !== 0 ? 'pt-4 border-t border-secondary-200' : ''}>
                      <h3 className="font-medium text-secondary-900">{edu.degree}</h3>
                      <p className="text-secondary-600">{edu.institution}</p>
                      <p className="text-sm text-secondary-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">About Me</h2>
                <div className="prose prose-sm max-w-none text-secondary-700">
                  {freelancer.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Work Experience</h2>
                <div className="space-y-6">
                  {freelancer.experience.map((exp, index) => (
                    <div key={index} className={index !== 0 ? 'pt-6 border-t border-secondary-200' : ''}>
                      <h3 className="font-medium text-secondary-900">{exp.title}</h3>
                      <p className="text-secondary-600">{exp.company}</p>
                      <p className="text-sm text-secondary-500 mb-2">{exp.period}</p>
                      <p className="text-secondary-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {freelancer.portfolio.map(item => (
                    <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-md">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/70 to-transparent opacity-80"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                        <a
                          href={item.link}
                          className="mt-2 inline-flex items-center text-sm text-primary-300 hover:text-primary-200"
                        >
                          View Project
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Client Reviews</h2>
                <div className="space-y-6">
                  {freelancer.reviews.map(review => (
                    <div key={review.id} className={review.id !== 1 ? 'pt-6 border-t border-secondary-200' : ''}>
                      <div className="flex items-start">
                        <img
                          src={review.client.avatar}
                          alt={review.client.name}
                          className="h-10 w-10 rounded-full mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-secondary-900">{review.client.name}</h3>
                              <p className="text-sm text-secondary-500">{review.client.company}</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelancerProfile