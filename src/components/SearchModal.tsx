import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, ArrowRight, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = ["Cold Brew", "Signature Espresso", "Arabica Beans", "Gift Cards"];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-start pt-[15vh] px-6 bg-[#120703]/90 backdrop-blur-xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-3 text-white/50 hover:text-[#F5A962] hover:bg-white/5 rounded-full transition-all duration-300"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          {/* Search Container */}
          <div className="w-full max-w-3xl flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative flex items-center border-b border-white/20 pb-4 group"
            >
              <SearchIcon size={36} className="text-white/40 group-focus-within:text-[#d4a373] transition-colors" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent border-none outline-none px-6 text-3xl sm:text-5xl font-display text-white placeholder-white/20 caret-[#d4a373]"
              />
              <button
                className={`absolute right-0 flex items-center justify-center h-12 w-12 rounded-full bg-[#d4a373]/10 text-[#d4a373] transition-all duration-300 ${
                  query.length > 0 ? "opacity-100 scale-100 hover:bg-[#d4a373] hover:text-black" : "opacity-0 scale-90 pointer-events-none"
                }`}
              >
                <ArrowRight size={24} />
              </button>
            </motion.div>

            {/* Popular Searches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-12 flex flex-col items-center sm:items-start"
            >
              <div className="flex items-center gap-2 text-white/40 mb-6 uppercase tracking-widest text-xs font-semibold">
                <TrendingUp size={14} />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {popularSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(term)}
                    className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-[#d4a373]/10 hover:border-[#d4a373]/30 hover:text-[#d4a373] transition-all duration-300 text-sm tracking-wide text-white/70"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
