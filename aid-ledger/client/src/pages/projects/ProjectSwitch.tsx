// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../lib/api/axios';
// import { Project } from '../../types';
// import { useProject } from '../../context/ProjectContext';

// export default function ProjectSwitch() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { switchProject } = useProject();

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const response = await api.get('/projects');
//       setProjects(response.data.projects);
//     } catch (error) {
//       console.error('Failed to fetch projects:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectProject = async (projectId: string) => {
//     try {
//       await switchProject(projectId);
//       navigate('/dashboard');
//     } catch (error) {
//       alert('Failed to load project');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="text-center py-8">Loading projects...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Select Project</h1>
//       <p className="text-gray-600 mb-6">Please select a project to continue.</p>
      
//       {projects.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-600 mb-4">No projects found. Create a project first.</p>
//           <button
//             onClick={() => navigate('/projects')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//           >
//             Go to Projects
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {projects.map((project) => (
//             <div
//               key={project._id}
//               className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
//               onClick={() => handleSelectProject(project._id)}
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.projectName}</h3>
//               <p className="text-sm text-gray-500 mb-2">Alias: {project.alias}</p>
//               <span className={`inline-block px-2 py-1 rounded-full text-xs ${
//                 project.status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//               }`}>
//                 {project.status}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../lib/api/axios';
// import { Project } from '../../types';
// import { useProject } from '../../context/ProjectContext';

// export default function ProjectSwitch() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const navigate = useNavigate();
//   const { switchProject } = useProject();

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   useEffect(() => {
//     filterProjects();
//   }, [projects, searchQuery, statusFilter]);

//   const fetchProjects = async () => {
//     try {
//       const response = await api.get('/projects');
//       setProjects(response.data.projects);
//     } catch (error) {
//       console.error('Failed to fetch projects:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterProjects = () => {
//     let filtered = [...projects];

//     if (searchQuery.trim()) {
//       filtered = filtered.filter(
//         (p) =>
//           p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           p.alias.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (statusFilter !== 'all') {
//       filtered = filtered.filter((p) => p.status === statusFilter);
//     }

//     setFilteredProjects(filtered);
//   };

//   const handleCardClick = (project: Project) => {
//     setSelectedProject(project);
//     setShowConfirmModal(true);
//   };

//   const handleConfirmLoad = async () => {
//     if (!selectedProject) return;
    
//     try {
//       await switchProject(selectedProject._id);
//       setShowConfirmModal(false);
//       navigate('/dashboard', { replace: true });
//       window.location.reload();
//     } catch (error) {
//       console.error('Failed to load project:', error);
//       alert('Failed to load project');
//       setShowConfirmModal(false);
//     }
//   };

//   const handleCancelLoad = () => {
//     setSelectedProject(null);
//     setShowConfirmModal(false);
//   };

//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="text-center py-8">Loading projects...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {/* Breadcrumb */}
//       <div className="mb-4 text-sm text-gray-600">
//         Project &gt; Switch/Load Project
//       </div>

//       {/* Page Title */}
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Switch/Load Project</h1>

//       {/* Search and Filters */}
//       <div className="mb-6 flex gap-4 items-center">
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
//           <input
//             type="text"
//             placeholder="Search projects..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//         <div className="flex gap-2 mt-6">
//           <button
//             onClick={() => setStatusFilter('all')}
//             className={`px-4 py-2 rounded-lg font-medium ${
//               statusFilter === 'all'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             All Projects
//           </button>
//           <button
//             onClick={() => setStatusFilter('completed')}
//             className={`px-4 py-2 rounded-lg font-medium ${
//               statusFilter === 'completed'
//                 ? 'bg-green-600 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             All Completed
//           </button>
//           <button
//             onClick={() => setStatusFilter('ongoing')}
//             className={`px-4 py-2 rounded-lg font-medium ${
//               statusFilter === 'ongoing'
//                 ? 'bg-orange-500 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             All Ongoing
//           </button>
//         </div>
//       </div>

//       {/* Projects Grid */}
//       {filteredProjects.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <p className="text-gray-600 mb-4">No projects found.</p>
//           <button
//             onClick={() => navigate('/projects')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//           >
//             Create New Project
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProjects.map((project) => (
//             <div
//               key={project._id}
//               onClick={() => handleCardClick(project)}
//               className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-blue-500 hover:shadow-lg cursor-pointer transition-all duration-200"
//             >
//               {/* Project Header with Name and Status */}
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-lg font-bold text-gray-900 flex-1">
//                   {project.projectName}
//                 </h3>
//                 <span
//                   className={`ml-2 px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${
//                     project.status === 'ongoing'
//                       ? 'bg-orange-500 text-white'
//                       : 'bg-green-600 text-white'
//                   }`}
//                 >
//                   {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
//                 </span>
//               </div>

//               {/* Project Label */}
//               <p className="text-sm text-gray-500 mb-6">Project</p>

//               {/* Project Details */}
//               <div className="space-y-2 text-sm">
//                 <div className="text-gray-600">
//                   <span className="font-medium">Alias:</span> {project.alias || 'PN'}
//                 </div>
//                 <div className="text-gray-600">
//                   <span className="font-medium">Start Date:</span>{' '}
//                   {project.financialYearFrom
//                     ? new Date(project.financialYearFrom).toLocaleDateString()
//                     : '-'}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmModal && selectedProject && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Project Load</h2>
//             <p className="text-gray-600 mb-6">
//               Would you like to load the project "{selectedProject.projectName}"?
//             </p>
//             <div className="flex gap-3 justify-end">
//               <button
//                 onClick={handleCancelLoad}
//                 className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmLoad}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
//               >
//                 Load Project
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api/axios';
import { Project } from '../../types';
import { useProject } from '../../context/ProjectContext';

export default function ProjectSwitch() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const { switchProject } = useProject();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchQuery, statusFilter]);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = [...projects];

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.alias.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    setFilteredProjects(filtered);
  };

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setShowConfirmModal(true);
  };

  const handleConfirmLoad = async () => {
    if (!selectedProject) return;
    
    try {
      await switchProject(selectedProject._id);
      setShowConfirmModal(false);
      navigate('/dashboard', { replace: true });
      window.location.reload();
    } catch (error) {
      console.error('Failed to load project:', error);
      alert('Failed to load project');
      setShowConfirmModal(false);
    }
  };

  const handleCancelLoad = () => {
    setSelectedProject(null);
    setShowConfirmModal(false);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span>Project</span>
          <span>&gt;</span>
          <span className="text-gray-900">Switch Organization</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Load/Switch Organization</h1>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
             <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                statusFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
                >
                All Projects
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                statusFilter === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Completed
            </button>
            <button
              onClick={() => setStatusFilter('ongoing')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                statusFilter === 'ongoing'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Ongoing
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid Section */}
      <div className="p-6">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4 text-lg">No projects found.</p>
            <button
              onClick={() => navigate('/projects')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium"
            >
              Create New Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                onClick={() => handleCardClick(project)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-200 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900 flex-1 pr-2">
                      {project.projectName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                        project.status === 'ongoing'
                          ? 'bg-orange-500 text-white'
                          : 'bg-green-600 text-white'
                      }`}
                    >
                      {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Project</p>
                </div>

                {/* Card Body */}
                <div className="p-5 bg-gray-50">
                  <div className="space-y-2.5 text-sm">
                    <div className="flex">
                      <span className="text-gray-600 font-medium w-24">Alias:</span>
                      <span className="text-gray-700">{project.alias || 'PN'}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 font-medium w-24">Start Date:</span>
                      <span className="text-gray-700">
                        {project.financialYearFrom
                          ? new Date(project.financialYearFrom).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Confirm Project Load</h2>
            </div>
            
            {/* Modal Body */}
            <div className="px-6 py-5">
              <p className="text-gray-600 mb-4">
                Would you like to load the following project?
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-1">{selectedProject.projectName}</p>
                <p className="text-sm text-gray-600">Alias: {selectedProject.alias}</p>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={handleCancelLoad}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLoad}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Load Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}