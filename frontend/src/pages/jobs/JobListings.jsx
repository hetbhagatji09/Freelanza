import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function JobListings() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    skills: [],
    minBudget: '',
    maxBudget: '',
    location: '',
    searchTerm: ''
  })



  useEffect(() => {
    // Real API call
    fetch('http://localhost:8080/api/jobs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setIsLoading(false);
        // You might want to add error state handling here
      });
  }, [])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSkillSelect = (skill) => {
    setFilters(prev => {
      if (prev.skills.includes(skill)) {
        return {
          ...prev,
          skills: prev.skills.filter(s => s !== skill)
        }
      } else {
        return {
          ...prev,
          skills: [...prev.skills, skill]
        }
      }
    })
  }

  const applyFilters = (jobs) => {
    return jobs.filter(job => {
      // Filter by search term
      if (filters.searchTerm && !job.jobTitle.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !job.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false
      }

      // Filter by category
      if (filters.category && job.category !== filters.category) {
        return false
      }

      // Filter by skills
      if (filters.skills.length > 0 && (!job.skills || !Array.isArray(job.skills) || !filters.skills.some(skill => job.skills.includes(skill)))) {
        return false;
      }

      // Filter by location
      if (filters.location && job.location !== filters.location) {
        return false
      }

      return true
    })
  }

  const filteredJobs = applyFilters(jobs)

  // Available categories and skills for filters
  const categories = ['Web Development', 'Graphic Design', 'Writing', 'Mobile Development', 'Marketing']
  const allSkills = ['React', 'Node.js', 'MongoDB', 'Express', 'Logo Design', 'Branding', 'Adobe Illustrator',
    'Content Writing', 'SEO', 'Technology', 'React Native', 'Firebase', 'UI/UX Design',
    'Social Media', 'Content Creation', 'Analytics']

  return (
    <div className="bg-secondary-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Find Jobs</h1>
          <p className="text-secondary-600 mt-2">Browse available projects and find your next opportunity</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Filters</h2>

              {/* Search */}
              <div className="mb-6">
                <label htmlFor="searchTerm" className="block text-sm font-medium text-secondary-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="searchTerm"
                  name="searchTerm"
                  className="input"
                  placeholder="Search jobs..."
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="input"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Skills Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Skills
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {allSkills.slice(0, 8).map(skill => (
                    <button
                      key={skill}
                      type="button"
                      className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${filters.skills.includes(skill)
                          ? 'bg-primary-100 text-primary-800'
                          : 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200'
                        }`}
                      onClick={() => handleSkillSelect(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label htmlFor="location" className="block text-sm font-medium text-secondary-700 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  className="input"
                  value={filters.location}
                  onChange={handleFilterChange}
                >
                  <option value="">All Locations</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              {/* Budget Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Budget Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    id="minBudget"
                    name="minBudget"
                    className="input"
                    placeholder="Min"
                    value={filters.minBudget}
                    onChange={handleFilterChange}
                  />
                  <input
                    type="number"
                    id="maxBudget"
                    name="maxBudget"
                    className="input"
                    placeholder="Max"
                    value={filters.maxBudget}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              {/* Reset Filters */}
              <button
                type="button"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={() => setFilters({
                  category: '',
                  skills: [],
                  minBudget: '',
                  maxBudget: '',
                  location: '',
                  searchTerm: ''
                })}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-secondary-900">No jobs found</h3>
                <p className="mt-1 text-secondary-500">Try adjusting your filters to find more opportunities.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map(job => (
                  <div key={job.jobId} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-semibold text-secondary-900 mb-2">
                          <Link to={`/jobs/${job.jobId}`} className="hover:text-primary-600">
                            {job.jobTitle}
                          </Link>
                        </h2>
                        <span className="text-primary-600 font-medium">{job.budget}</span>
                      </div>

                      <div className="flex items-center text-sm text-secondary-500 mb-4">
                        <span className="mr-4">
                          <span className="font-medium text-secondary-700">{job.client.name}</span>
                          <span className="ml-1">({job.client.ratings}★)</span>
                        </span>
                        <span className="mr-4">
                          Posted: {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                        <span>
                          Deadline: {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-secondary-600 mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {(job.skills || []).map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>


                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-secondary-100 text-secondary-800">
                          {job.category}
                        </span>
                        <Link
                          to={`/jobs/${job.jobId}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          View Details
                        </Link>
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
  )
}

export default JobListings


// // Mock job data
// const mockJobs = [
//   {
//     id: 1,
//     title: 'Full Stack Developer Needed for E-commerce Site',
//     description: 'Looking for an experienced developer to build a responsive e-commerce website with React and Node.js.',
//     budget: '$2000-$3000',
//     category: 'Web Development',
//     skills: ['React', 'Node.js', 'MongoDB', 'Express'],
//     location: 'Remote',
//     postedDate: '2023-04-15',
//     deadline: '2023-05-15',
//     client: {
//       id: 101,
//       name: 'TechSolutions Inc.',
//       rating: 4.8
//     }
//   },
//   {
//     id: 2,
//     title: 'Logo Design for New Startup',
//     description: 'Need a modern, minimalist logo for a tech startup in the AI space.',
//     budget: '$500-$800',
//     category: 'Graphic Design',
//     skills: ['Logo Design', 'Branding', 'Adobe Illustrator'],
//     location: 'Remote',
//     postedDate: '2023-04-18',
//     deadline: '2023-05-02',
//     client: {
//       id: 102,
//       name: 'AI Innovations',
//       rating: 4.5
//     }
//   },
//   {
//     id: 3,
//     title: 'Content Writer for Technology Blog',
//     description: 'Seeking a skilled content writer to create engaging articles about emerging technologies.',
//     budget: '$30-$50 per article',
//     category: 'Writing',
//     skills: ['Content Writing', 'SEO', 'Technology'],
//     location: 'Remote',
//     postedDate: '2023-04-20',
//     deadline: '2023-05-20',
//     client: {
//       id: 103,
//       name: 'TechBlog Media',
//       rating: 4.9
//     }
//   },
//   {
//     id: 4,
//     title: 'Mobile App Development for Fitness Tracking',
//     description: 'Need a developer to create a fitness tracking app for iOS and Android using React Native.',
//     budget: '$3000-$5000',
//     category: 'Mobile Development',
//     skills: ['React Native', 'Firebase', 'UI/UX Design'],
//     location: 'Remote',
//     postedDate: '2023-04-22',
//     deadline: '2023-06-01',
//     client: {
//       id: 104,
//       name: 'FitTech Solutions',
//       rating: 4.7
//     }
//   },
//   {
//     id: 5,
//     title: 'Social Media Marketing Specialist',
//     description: 'Looking for a social media expert to manage our accounts and increase engagement.',
//     budget: '$1000-$1500 per month',
//     category: 'Marketing',
//     skills: ['Social Media', 'Content Creation', 'Analytics'],
//     location: 'Remote',
//     postedDate: '2023-04-25',
//     deadline: '2023-05-10',
//     client: {
//       id: 105,
//       name: 'GrowthMarket',
//       rating: 4.6
//     }
//   }
// ]