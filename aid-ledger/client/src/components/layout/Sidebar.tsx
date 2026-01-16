// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useProject } from '../../context/ProjectContext';

// interface MenuItem {
//   path?: string;
//   label: string;
//   icon: string;
//   children?: MenuItem[];
// }

// export default function Sidebar() {
//   const location = useLocation();
//   const { activeProject } = useProject();
//   const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
//     project: false,
//     entry: false,
//     reports: false,
//     books: false,
//     master: false,
//   });

//   const toggleMenu = (menuKey: string) => {
//     setExpandedMenus((prev) => ({
//       ...prev,
//       [menuKey]: !prev[menuKey],
//     }));
//   };

//   const menuItems: MenuItem[] = [
//     { path: '/dashboard', label: 'Dashboard', icon: '📊' },
//     {
//       label: 'Project',
//       icon: '📁',
//       children: [
//         { path: '/projects', label: 'Project Master' },
//         { path: '/projects/switch', label: 'Switch Project' },
//       ],
//     },
//     {
//       label: 'Entry',
//       icon: '📝',
//       children: [
//         { path: '/journal-voucher', label: 'Journal Voucher' },
//         { path: '/budget', label: 'Budget Entry' },
//       ],
//     },
//     {
//       label: 'Reports',
//       icon: '📈',
//       children: [
//         { path: '/reports?type=trial-balance', label: 'Trial Balance' },
//         { path: '/reports?type=income-statement', label: 'Income Statement' },
//         { path: '/reports?type=balance-sheet', label: 'Balance Sheet' },
//         { path: '/reports?type=fund-accountability', label: 'Fund Accountability Statement' },
//         { path: '/reports?type=budget-vs-expenditure', label: 'Budget vs Expenditure' },
//       ],
//     },
//     {
//       label: 'Books',
//       icon: '📚',
//       children: [
//         { path: '/books', label: 'Cash & Bank Book' },
//         { path: '/books', label: 'General Ledger' },
//         { path: '/books', label: 'Sub Ledger' },
//       ],
//     },
//     {
//       label: 'Master Setup',
//       icon: '⚙️',
//       children: [
//         { path: '/master-setup/ledger-groups', label: 'Ledger Group' },
//         { path: '/master-setup/general-ledgers', label: 'General Ledger' },
//         { path: '/master-setup/sub-ledgers', label: 'Sub Ledger' },
//       ],
//     },
//   ];

//   const isPathActive = (path?: string): boolean => {
//     if (!path) return false;
//     if (path === location.pathname) return true;
//     // For parent paths, check if any child is active
//     return location.pathname.startsWith(path + '/');
//   };

//   const isMenuExpanded = (menuKey: string): boolean => {
//     return expandedMenus[menuKey] || false;
//   };

//   const getMenuKey = (label: string): string => {
//     return label.toLowerCase().replace(/\s+/g, '-');
//   };

//   return (
//     <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-40 overflow-y-auto">
//       <nav className="p-4">
//         <ul className="space-y-1">
//           {menuItems.map((item) => {
//             if (item.children) {
//               const menuKey = getMenuKey(item.label);
//               const isExpanded = isMenuExpanded(menuKey);
//               const hasActiveChild = item.children.some((child) => isPathActive(child.path));

//               return (
//                 <li key={item.label}>
//                   <button
//                     onClick={() => toggleMenu(menuKey)}
//                     className={`w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition-colors ${
//                       hasActiveChild
//                         ? 'bg-blue-50 text-blue-600'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <span className="text-xl">{item.icon}</span>
//                       <span className="font-medium">{item.label}</span>
//                     </div>
//                     <span className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
//                       ▶
//                     </span>
//                   </button>
//                   {isExpanded && (
//                     <ul className="ml-8 mt-1 space-y-1">
//                       {item.children.map((child) => {
//                         const isActive = isPathActive(child.path);
//                         return (
//                           <li key={child.path}>
//                             <Link
//                               to={child.path || '#'}
//                               className={`block px-4 py-2 rounded-lg transition-colors text-sm ${
//                                 isActive
//                                   ? 'bg-blue-100 text-blue-700 font-medium'
//                                   : 'text-gray-600 hover:bg-gray-50'
//                               }`}
//                             >
//                               {child.label}
//                             </Link>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   )}
//                 </li>
//               );
//             }

//             const isActive = isPathActive(item.path);
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path || '#'}
//                   className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
//                     isActive
//                       ? 'bg-blue-50 text-blue-600 border border-blue-200'
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <span className="text-xl">{item.icon}</span>
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     </aside>
//   );
// }

import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  FileText, 
  TrendingUp, 
  BookOpen, 
  Settings,
  Search,
  ChevronRight,
  FolderKanban,
  RefreshCw,
  Receipt,
  Wallet,
  FileBarChart,
  DollarSign,
  BarChart3,
  PieChart,
  BookMarked,
  Layers,
  List
} from 'lucide-react';

interface MenuItem {
  path?: string;
  label: string;
  icon: any;
  children?: MenuItem[];
}

export default function Sidebar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus((prev) => {
      // Close all other menus and toggle the clicked one
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      newState[menuKey] = !prev[menuKey];
      return newState;
    });
  };

  const menuItems: MenuItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    {
      label: 'Project',
      icon: FolderOpen,
      children: [
        { path: '/projects', label: 'Project Master', icon: FolderKanban },
        { path: '/projects/switch', label: 'Switch Project', icon: RefreshCw },
      ],
    },
    {
      label: 'Entry',
      icon: FileText,
      children: [
        { path: '/journal-voucher', label: 'Journal Voucher', icon: Receipt },
        { path: '/budget', label: 'Budget Entry', icon: Wallet },
      ],
    },
    {
      label: 'Reports',
      icon: TrendingUp,
      children: [
        { path: '/reports?type=trial-balance', label: 'Trial Balance', icon: BarChart3 },
        { path: '/reports?type=income-statement', label: 'Income Statement', icon: FileBarChart },
        { path: '/reports?type=balance-sheet', label: 'Balance Sheet', icon: PieChart },
        { path: '/reports?type=fund-accountability', label: 'Fund Accountability Statement', icon: DollarSign },
        { path: '/reports?type=budget-vs-expenditure', label: 'Budget vs Expenditure', icon: BarChart3 },
      ],
    },
    {
      label: 'Books',
      icon: BookOpen,
      children: [
        { path: '/books?type=cash-bank', label: 'Cash & Bank Book', icon: Wallet },
        { path: '/books?type=general-ledger', label: 'General Ledger', icon: BookMarked },
        { path: '/books?type=sub-ledger', label: 'Sub Ledger', icon: Layers },
      ],
    },
    {
      label: 'Master Setup',
      icon: Settings,
      children: [
        { path: '/master-setup/ledger-groups', label: 'Ledger Group', icon: Layers },
        { path: '/master-setup/general-ledgers', label: 'General Ledger', icon: BookMarked },
        { path: '/master-setup/sub-ledgers', label: 'Sub Ledger', icon: List },
      ],
    },
  ];

  const isPathActive = (path?: string): boolean => {
    if (!path) return false;
    const basePath = path.split('?')[0];
    const currentPath = location.pathname;
    
    if (basePath === currentPath) return true;
    return currentPath.startsWith(basePath + '/');
  };

  const getMenuKey = (label: string): string => {
    return label.toLowerCase().replace(/\s+/g, '-');
  };

  // Search and filter logic
  const { filteredItems, highlightedPaths } = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) {
      return { filteredItems: menuItems, highlightedPaths: new Set<string>() };
    }

    const highlighted = new Set<string>();
    const filtered = menuItems.map(item => {
      // Check if parent matches
      const parentMatches = item.label.toLowerCase().includes(query);
      
      if (parentMatches) {
        highlighted.add(getMenuKey(item.label));
      }

      // Check children
      if (item.children) {
        const matchingChildren = item.children.filter(child => 
          child.label.toLowerCase().includes(query)
        );
        
        if (matchingChildren.length > 0) {
          highlighted.add(getMenuKey(item.label));
          matchingChildren.forEach(child => {
            if (child.path) highlighted.add(child.path);
          });
          
          return { ...item, children: matchingChildren };
        }
      }

      // Return item if parent matches or if it has no children and matches
      if (parentMatches || !item.children) {
        return item;
      }

      return null;
    }).filter(Boolean) as MenuItem[];

    return { filteredItems: filtered, highlightedPaths: highlighted };
  }, [searchQuery]);

  // Auto-expand menus when searching
  useEffect(() => {
    if (searchQuery.trim()) {
      const newExpanded: Record<string, boolean> = {};
      filteredItems.forEach(item => {
        if (item.children && item.children.length > 0) {
          newExpanded[getMenuKey(item.label)] = true;
        }
      });
      setExpandedMenus(newExpanded);
    }
  }, [searchQuery, filteredItems]);

  // Auto-expand menu containing active item on mount
  useEffect(() => {
    if (!searchQuery) {
      menuItems.forEach(item => {
        if (item.children) {
          const hasActiveChild = item.children.some(child => isPathActive(child.path));
          if (hasActiveChild) {
            setExpandedMenus(prev => ({
              ...prev,
              [getMenuKey(item.label)]: true
            }));
          }
        }
      });
    }
  }, [location.pathname, searchQuery]);

  const isHighlighted = (key: string): boolean => {
    return highlightedPaths.has(key);
  };

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-40 overflow-y-auto">
      <div className="p-4">
        {/* Search Bar */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search Menu"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        {/* Menu Items */}
        <nav>
          <ul className="space-y-1">
            {filteredItems.map((item) => {
              if (item.children) {
                const menuKey = getMenuKey(item.label);
                const isExpanded = expandedMenus[menuKey] || false;
                const hasActiveChild = item.children.some((child) => isPathActive(child.path));
                const isMenuHighlighted = isHighlighted(menuKey);

                return (
                  <li key={item.label}>
                    <button
                      onClick={() => toggleMenu(menuKey)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition-all ${
                        hasActiveChild || isMenuHighlighted
                          ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => {
                          const isActive = isPathActive(child.path);
                          const isChildHighlighted = child.path && isHighlighted(child.path);
                          const ChildIcon = child.icon;

                          return (
                            <li key={child.path}>
                              <Link
                                to={child.path || '#'}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm ${
                                  isActive
                                    ? 'bg-blue-100 text-blue-700 font-medium ring-2 ring-blue-200'
                                    : isChildHighlighted
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {ChildIcon && <ChildIcon className="w-4 h-4" />}
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              const isActive = isPathActive(item.path);
              const ItemIcon = item.icon;
              const isItemHighlighted = isHighlighted(getMenuKey(item.label));

              return (
                <li key={item.path}>
                  <Link
                    to={item.path || '#'}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-200'
                        : isItemHighlighted
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ItemIcon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* No Results Message */}
        {searchQuery && filteredItems.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-8">
            No menu items found
          </div>
        )}
      </div>
    </aside>
  );
}