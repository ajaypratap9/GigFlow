import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  title: string;
}

const Navbar = ({ title }: NavbarProps) => {
  return (
    <div className="h-16 flex items-center justify-between px-8 bg-white border-b border-zinc-100">
      <AnimatePresence mode="popLayout">
        <motion.h1
          key={title}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="font-sora text-sm font-bold text-black uppercase tracking-widest"
        >
          {title}
        </motion.h1>
      </AnimatePresence>

      <div className="flex items-center gap-6">
        <div className="relative text-zinc-400 hover:text-black transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-black rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;