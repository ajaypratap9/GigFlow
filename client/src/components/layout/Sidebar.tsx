import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { user, logout } = useAuthStore();

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? 240 : 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-screen sticky top-0 flex flex-col bg-white border-r border-zinc-200 overflow-hidden relative z-20"
    >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-sora font-bold text-lg text-black whitespace-nowrap"
              >
                LeadFlow
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-1">
        <motion.div
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-100 text-black cursor-pointer"
        >
          <svg className="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          {isExpanded && <span className="font-dm font-medium text-sm">Dashboard</span>}
        </motion.div>
      </div>

      <div className="p-4 border-t border-zinc-100">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-zinc-100 text-zinc-500 transition-colors mb-2"
        >
          <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        <div className={`flex items-center gap-3 ${isExpanded ? 'px-2 py-2' : 'justify-center py-2'}`}>
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-sora font-semibold text-xs flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          {isExpanded && (
            <div className="flex-1 min-w-0">
              <p className="font-dm font-medium text-xs text-black truncate">{user?.name}</p>
              <button onClick={logout} className="text-[10px] text-zinc-400 hover:text-black transition-colors uppercase tracking-wider font-bold">Logout</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;