import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

function Home() {
  const { isAuthenticated, isClient, isFreelancer } = useAuth()

  const testimonials = [
    {
      id: 1,
      content: "FreelanceHub helped me find consistent work as a developer. The platform is intuitive and the clients are high-quality.",
      author: "Alex Johnson",
      role: "Full Stack Developer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      content: "As a business owner, I've found amazing talent through FreelanceHub. The quality of work has been exceptional.",
      author: "Sarah Williams",
      role: "Marketing Agency Owner",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      content: "The platform makes it easy to manage projects and communicate with clients. I've doubled my income since joining.",
      author: "Michael Chen",
      role: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ]

  const features = [
    {
      id: 1,
      title: "Find Top Talent",
      description: "Access a global network of skilled professionals across various industries.",
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
    {
      id: 2,
      title: "Quality Projects",
      description: "Find meaningful work with reputable clients and competitive rates.",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    },
    {
      id: 3,
      title: "Secure Payments",
      description: "Our escrow system ensures you get paid for the work you complete.",
      icon: "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      id: 4,
      title: "Project Management",
      description: "Powerful tools to manage your projects, deadlines, and client communication.",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Talent. <br />
                Get Hired. <br />
                Grow Your Business.
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Connect with top freelancers and clients worldwide. Find work or hire talent with ease.
              </p>
              <div className="flex flex-wrap gap-4">
                {!isAuthenticated && (
                  <>
                    <Link to="/register" className="btn bg-white text-primary-700 hover:bg-primary-50">
                      Sign Up Free
                    </Link>
                    <Link to="/login" className="btn border border-white text-white hover:bg-primary-700">
                      Log In
                    </Link>
                  </>
                )}
                
                {isClient && (
                  <Link to="/dashboard/post-job" className="btn bg-white text-primary-700 hover:bg-primary-50">
                    Post a Job
                  </Link>
                )}
                
                {isFreelancer && (
                  <Link to="/jobs" className="btn bg-white text-primary-700 hover:bg-primary-50">
                    Find Work
                  </Link>
                )}
                
                {isAuthenticated && (
                  <Link to="/dashboard" className="btn border border-white text-white hover:bg-primary-700">
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                alt="Freelancers collaborating" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Why Choose FreelanceHub?</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Our platform connects talented freelancers with amazing clients. Here's why thousands choose us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="card p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg 
                    className="w-6 h-6 text-primary-600" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">How It Works</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Getting started is easy. Find work or hire talent in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">Create Your Account</h3>
                    <p className="text-secondary-600">Sign up as a freelancer or client. Complete your profile with your skills, experience, and portfolio.</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">Post or Find Jobs</h3>
                    <p className="text-secondary-600">Clients can post jobs with detailed requirements. Freelancers can browse and apply to relevant opportunities.</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">Collaborate & Complete</h3>
                    <p className="text-secondary-600">Work together through our platform. Use our tools to manage projects, communicate, and share files.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">Get Paid & Review</h3>
                    <p className="text-secondary-600">Secure payments are released upon project completion. Leave reviews to build your reputation.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="How it works" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Thousands of freelancers and clients have found success on our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-secondary-900">{testimonial.author}</h4>
                    <p className="text-secondary-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-secondary-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of freelancers and businesses who trust FreelanceHub for their work needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {!isAuthenticated && (
              <>
                <Link to="/register" className="btn bg-white text-primary-700 hover:bg-primary-50">
                  Create Free Account
                </Link>
                <Link to="/login" className="btn border border-white text-white hover:bg-primary-700">
                  Log In
                </Link>
              </>
            )}
            
            {isAuthenticated && (
              <Link to="/dashboard" className="btn bg-white text-primary-700 hover:bg-primary-50">
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home