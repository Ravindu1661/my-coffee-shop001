import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Lock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset state after closing animation finishes
      setTimeout(() => setIsLogin(true), 400);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#120703]/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-[420px] bg-[#120703]/95 backdrop-blur-2xl border-l border-[#d4a373]/20 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="relative pt-12 pb-6 px-10 flex flex-col">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-[#F5A962] hover:bg-white/5 rounded-full transition-all duration-300"
              >
                <X size={24} />
              </button>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="h-16 w-16 bg-[#d4a373]/10 border border-[#d4a373]/30 rounded-full flex items-center justify-center mb-6 text-[#d4a373]">
                  <User size={32} strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-4xl text-[#f7ebe1] mb-2">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-white/50 text-sm">
                  {isLogin ? "Sign in to access your exclusive coffee perks." : "Join the elite coffee club today."}
                </p>
              </motion.div>
            </div>

            {/* Form Container */}
            <div className="flex-1 px-10 overflow-y-auto custom-scrollbar flex flex-col">
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col gap-5 mt-4"
                onSubmit={(e) => e.preventDefault()}
              >
                {!isLogin && (
                  <div className="relative group">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#d4a373] transition-colors" />
                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-white/30 outline-none focus:border-[#d4a373]/50 focus:bg-[#d4a373]/5 transition-all" />
                  </div>
                )}
                
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#d4a373] transition-colors" />
                  <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-white/30 outline-none focus:border-[#d4a373]/50 focus:bg-[#d4a373]/5 transition-all" />
                </div>

                <div className="relative group">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#d4a373] transition-colors" />
                  <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-white/30 outline-none focus:border-[#d4a373]/50 focus:bg-[#d4a373]/5 transition-all" />
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <a href="#" className="text-[#d4a373] text-xs hover:underline">Forgot password?</a>
                  </div>
                )}

                <button className="mt-4 w-full relative overflow-hidden group rounded-xl bg-gradient-to-r from-[#C49A6C] to-[#A67C52] text-black px-6 py-4 flex justify-center items-center gap-2 shadow-[0_8px_30px_rgba(196,154,108,0.25)] hover:shadow-[0_8px_40px_rgba(196,154,108,0.4)] transition-all duration-300 transform hover:-translate-y-0.5">
                  <span className="font-bold uppercase tracking-[0.1em] text-xs">
                    {isLogin ? "Sign In" : "Register"}
                  </span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.form>

              <div className="my-8 flex items-center gap-4 opacity-30">
                <div className="flex-1 h-px bg-white" />
                <span className="text-xs uppercase tracking-widest text-white">OR</span>
                <div className="flex-1 h-px bg-white" />
              </div>

              <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl py-3.5 flex items-center justify-center gap-3 transition-colors text-sm">
                Continue with GitHub
              </button>

              <div className="mt-auto pt-8 pb-10 text-center">
                <p className="text-white/50 text-sm">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[#d4a373] font-semibold hover:underline"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
