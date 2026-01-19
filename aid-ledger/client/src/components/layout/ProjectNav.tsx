// import { useProject } from '../../context/ProjectContext';
// import { useNavigate } from 'react-router-dom';

// export default function ProjectNav() {
//   const { activeProject } = useProject();
//   const navigate = useNavigate();

//   if (!activeProject) {
//     return null;
//   }

//   return (
//     <div className="sticky top-16 bg-white border-b border-gray-200 px-6 py-3 z-30">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">{activeProject.projectName}</h2>
//           <p className="text-sm text-gray-500">{activeProject.alias}</p>
//         </div>
//         <button
//           onClick={() => navigate('/projects/switch')}
//           className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
//         >
//           Switch Project
//         </button>
//       </div>
//     </div>
//   );
// }

import { useProject } from '../../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
import { FolderIcon } from '@heroicons/react/24/outline';

export default function ProjectNav() {
  const { activeProject } = useProject();
  const navigate = useNavigate();

  if (!activeProject) return null;

  return (
    <div className="sticky top-16 z-30 bg-white border-b border-gray-200">
      <div className="relative flex items-center h-12 px-4">
        
        {/* Left: Project breadcrumb */}
        <div className="flex items-center gap-2 text-blue-600 font-medium">
          <FolderIcon className="w-5 h-5" />
          <span>Project</span>
          <span className="text-gray-400">›</span>
        </div>

        {/* Center: Project Name */}
        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-black tracking-wide uppercase">
          {activeProject.projectName}
        </div>

        {/* Right: Switch Project */}
        <div className="ml-auto">
          <button
            onClick={() => navigate('/projects/switch')}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50"
          >
            Switch Project
          </button>
        </div>

      </div>
    </div>
  );
}
