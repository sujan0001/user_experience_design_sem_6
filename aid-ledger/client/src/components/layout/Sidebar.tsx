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
  List,
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
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach((key) => (newState[key] = false));
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

  const getMenuKey = (label: string) =>
    label.toLowerCase().replace(/\s+/g, '-');

  const isPathActive = (path?: string) => {
    if (!path) return false;
    const basePath = path.split('?')[0];
    return location.pathname === basePath || location.pathname.startsWith(basePath + '/');
  };

  const { filteredItems, highlightedPaths } = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return { filteredItems: menuItems, highlightedPaths: new Set<string>() };

    const highlighted = new Set<string>();

    const filtered = menuItems
      .map((item) => {
        const parentMatch = item.label.toLowerCase().includes(query);
        if (parentMatch) highlighted.add(getMenuKey(item.label));

        if (item.children) {
          const children = item.children.filter((c) =>
            c.label.toLowerCase().includes(query)
          );
          if (children.length) {
            highlighted.add(getMenuKey(item.label));
            children.forEach((c) => c.path && highlighted.add(c.path));
            return { ...item, children };
          }
        }

        return parentMatch || !item.children ? item : null;
      })
      .filter(Boolean) as MenuItem[];

    return { filteredItems: filtered, highlightedPaths: highlighted };
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const expanded: Record<string, boolean> = {};
      filteredItems.forEach((item) => {
        if (item.children) expanded[getMenuKey(item.label)] = true;
      });
      setExpandedMenus(expanded);
    }
  }, [searchQuery, filteredItems]);

  useEffect(() => {
    if (!searchQuery) {
      menuItems.forEach((item) => {
        if (item.children?.some((c) => isPathActive(c.path))) {
          setExpandedMenus((prev) => ({
            ...prev,
            [getMenuKey(item.label)]: true,
          }));
        }
      });
    }
  }, [location.pathname, searchQuery]);

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-40 overflow-y-auto">
      <div className="p-4">
        {/* Search */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Menu"
            className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <ul className="space-y-1">
          {filteredItems.map((item) => {
            if (!item.children) {
              const active = isPathActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path!}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                      active
                        ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            }

            const key = getMenuKey(item.label);
            const expanded = expandedMenus[key];

            return (
              <li key={item.label}>
                <button
                  onClick={() => toggleMenu(key)}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expanded ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {/* ✅ Smooth submenu */}
                <ul
                  className={`
                    ml-8 mt-1 space-y-1 overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${expanded
                      ? 'max-h-[500px] opacity-100 translate-y-0'
                      : 'max-h-0 opacity-0 -translate-y-1'}
                  `}
                >
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <Link
                        to={child.path!}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
                          isPathActive(child.path)
                            ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <child.icon className="w-4 h-4" />
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
