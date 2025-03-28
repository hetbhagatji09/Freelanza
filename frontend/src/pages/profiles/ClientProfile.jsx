import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

function ClientProfile() {
  const { clientId } = useParams();
  const { currentUser } = useAuth();
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [newSkill, setNewSkill] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    professionalTitle: '',
    bio: '',
    location: '',
    hourlyRate: '',
    skills: []
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setIsLoading(true);
        const userIdToFetch = clientId || currentUser?.id;
        
        if (!userIdToFetch) {
          setIsLoading(false);
          return;
        }
        
        const isCurrentUser = currentUser && userIdToFetch === currentUser.id;
        const endpoint = `http://localhost:8080/api/clients/${userIdToFetch}`;
        const response = await axios.get(endpoint);
        const data = response.data;

        const clientData = {
          clientId: data.clientId,
          name: data.name,
          email: data.email,
          location: data.location || "N/A",
          bio: data.bio || "",
          skills: data.skills || [],
          professionalTitle: data.professionalTitle || "Not specified",
          ratings: data.ratings || 0,
          totalJobs: data.totalJobs || 0,
          memberSince: data.memberSince || new Date().toISOString(),
          jobs: data.jobs?.map(job => ({
            id: job.jobId,
            title: job.jobTitle,
            minBudget: job.minBudget,
            maxBudget: job.maxBudget,
            status: job.status,
            postedDate: job.postedDate
          })) || []
        };

        setClient(clientData);

        if (isCurrentUser) {
          setFormData({
            name: data.name,
            email: data.email,
            bio: data.bio || "",
            location: data.location || "",
            professionalTitle: data.professionalTitle || "",
            skills: data.skills || [],
            hourlyRate: data.hourlyRate || ""
          });
        }

      } catch (error) {
        console.error("Error fetching client:", error);
        setErrorMessage('Failed to load profile data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
  }, [clientId, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      const endpoint = `http://localhost:8080/api/clients/${currentUser.id}`;
      const payload = {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        location: formData.location,
        professionalTitle: formData.professionalTitle,
        skills: formData.skills
      };
      
      const response = await axios.put(endpoint, payload);
      
      if (response.status === 200) {
        setSuccessMessage('Profile updated successfully!');
        setClient({
          ...client,
          ...payload
        });
        setIsEditing(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const isOwnProfile = currentUser && client && currentUser.id === client.clientId;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="container-custom">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
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
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="container-custom">
        {successMessage && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        {errorMessage && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        {isOwnProfile && !isEditing && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Edit Profile
            </button>
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-secondary-900 mb-4">Basic Information</h2>
                    
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="professionalTitle" className="block text-sm font-medium text-secondary-700 mb-1">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        id="professionalTitle"
                        name="professionalTitle"
                        className="w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g., Project Manager"
                        value={formData.professionalTitle}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="location" className="block text-sm font-medium text-secondary-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g., New York, USA"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-secondary-900 mb-4">About Me</h2>
                    
                    <div className="mb-4">
                      <label htmlFor="bio" className="block text-sm font-medium text-secondary-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows="6"
                        className="w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Tell clients about yourself, your experience, and your expertise..."
                        value={formData.bio}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-secondary-900 mb-4">Skills</h2>
                    
                    <div className="mb-4">
                      <label htmlFor="skills" className="block text-sm font-medium text-secondary-700 mb-1">
                        Add Skills
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          id="skills"
                          className="w-full px-3 py-2 border border-secondary-300 rounded-l-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="e.g., React, Node.js, JavaScript"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSkillAdd();
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          onClick={handleSkillAdd}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    
                    {formData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.map(skill => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                          >
                            {skill}
                            <button
                              type="button"
                              className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-400 hover:text-primary-700 focus:outline-none"
                              onClick={() => handleSkillRemove(skill)}
                            >
                              <span className="sr-only">Remove {skill}</span>
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-secondary-200 text-secondary-800 rounded-md hover:bg-secondary-300 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Profile'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <h1 className="text-2xl font-bold text-secondary-900">{client.name}</h1>
                    <p className="text-secondary-600 mt-1">{client.professionalTitle}</p>
                    <div className="flex items-center mt-2">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-secondary-900 font-medium">{client.ratings}</span>
                     
                      
                    </div>
                  </div>

                  <div className="border-t border-secondary-200 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-secondary-500">Location</p>
                        <p className="font-medium text-secondary-900">{client.location}</p>
                      </div>
                      <div>
                        <p className="text-secondary-500">Member Since</p>
                        <p className="font-medium text-secondary-900">
                          {new Date(client.memberSince).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-secondary-500">Email</p>
                        <p className="font-medium text-secondary-900">{client.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-secondary-900 mb-4">Skills</h2>
                  
                  {client.skills && client.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {client.skills.map(skill => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-secondary-500 italic">No skills listed</p>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-secondary-900 mb-4">About {client.name}</h2>
                  {client.bio ? (
                    <div className="prose prose-sm max-w-none text-secondary-700">
                      {client.bio.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-secondary-500 italic">No bio available</p>
                  )}
                </div>
              </div>

              {/* Jobs Posted Section */}
              {client.jobs && client.jobs.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-secondary-900 mb-4">Jobs Posted</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-secondary-200">
                        <thead className="bg-secondary-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Budget</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Posted</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-secondary-200">
                          {client.jobs.map((job) => (
                            <tr key={job.id} className="hover:bg-secondary-50">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <Link to={`/jobs/${job.id}`} className="text-primary-600 hover:text-primary-900">{job.title}</Link>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-secondary-500">
                                ${job.minBudget} - ${job.maxBudget}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${job.status === 'OPEN' ? 'bg-green-100 text-green-800' : 
                                  job.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : 
                                  job.status === 'COMPLETED' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {job.status?.replace('_', ' ')}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-secondary-500">
                                {new Date(job.postedDate).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientProfile;