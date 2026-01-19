// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// export default function TopNav() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
//       <div className="flex items-center justify-between h-full px-6">
//         <div className="flex items-center">
//           <h1 className="text-xl font-bold text-blue-600">Aid Ledger</h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-sm text-gray-600">{user?.fullName}</span>
//           <span className="text-sm text-gray-400">|</span>
//           <span className="text-sm text-gray-600">{user?.organization.name}</span>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import { Mail, Building, User, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function TopNav() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials =
    user?.fullName
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'U';

  return (
    <>
      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#366BAD] shadow-md z-50">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left */}
          <h1 className="text-lg font-semibold tracking-wide text-white">
            AID LEDGER
          </h1>

          {/* Right */}
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            <span className="text-sm text-[#E6EEF6]">
              Welcome back, <span className="font-medium">{user?.fullName}</span>
            </span>

            {/* Avatar */}
            <button
              onClick={() => setOpen((p) => !p)}
              className="w-9 h-9 rounded-full bg-white text-[#366BAD] font-semibold flex items-center justify-center hover:ring-2 hover:ring-white transition"
            >
              {initials}
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-14 w-72 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                <div className="px-4 py-2 text-xs text-gray-500 flex items-center gap-2">
                  <Building size={14} />
                  {user?.organization?.name}
                </div>

                <div className="border-t">
                  <DropdownItem icon={User} label="Profile" />
                  <DropdownItem icon={HelpCircle} label="Help" />
                </div>

                <div className="border-t">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setShowConfirm(true);
                    }}
                    className="w-full px-4 py-2 text-sm text-red-600 flex items-center gap-2 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* LOGOUT CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-96 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes, logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* Dropdown item component */
function DropdownItem({
  icon: Icon,
  label,
}: {
  icon: any;
  label: string;
}) {
  return (
    <button className="w-full px-4 py-2 text-sm text-gray-700 flex items-center gap-2 hover:bg-gray-100">
      <Icon size={16} />
      {label}
    </button>
  );
}
