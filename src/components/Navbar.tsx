import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { navLinks } from "../data/content";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";
import ProfileDrawer from "./ProfileDrawer";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Split links for symmetrical layout (2 on left, 2 on right)
  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 z-50 w-full flex justify-center px-4 pointer-events-none"
      >
        <nav className="relative flex items-center bg-[#1a0c06]/95 backdrop-blur-xl h-12 sm:h-14 w-full max-w-[38rem] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-[#C49A6C]/15 pointer-events-auto">
          
          {/* Desktop Left Nav Links */}
          <div className="hidden lg:flex items-center justify-end gap-10 w-1/2 pr-12 sm:pr-16">
            {leftLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#e6ccb2] hover:text-[#F5A962] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Center Logo Bulge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
            {/* The circular bulge background */}
            <div className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] bg-[#1a0c06] rounded-full border border-[#C49A6C]/20 shadow-2xl flex items-center justify-center relative overflow-hidden">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick("#home");
                }}
                className="group flex items-center justify-center w-full h-full"
              >
                <img
                  src="/images/logo_coffee (2).png"
                  alt="Elite Coffee Logo"
                  className="w-full h-full object-cover scale-[1.5] transition-transform duration-300 group-hover:scale-[1.6]"
                />
              </a>
            </div>
          </div>

          {/* Desktop Right Nav Links */}
          <div className="hidden lg:flex items-center justify-start gap-10 w-1/2 pl-12 sm:pl-16">
            {rightLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#e6ccb2] hover:text-[#F5A962] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - positioned to the right on mobile */}
          <div className="lg:hidden ml-auto pr-6">
            <button
              aria-label="Toggle menu"
              className="relative z-20 text-[#e6ccb2] hover:text-[#F5A962] transition-colors"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 top-0 w-screen h-screen overflow-hidden bg-[#120703]/98 backdrop-blur-3xl lg:hidden z-[100] flex flex-col justify-center items-center pointer-events-auto"
            >
              {/* Close button for mobile menu */}
              <button
                className="absolute top-8 right-8 text-[#e6ccb2] hover:text-[#F5A962]"
                onClick={() => setOpen(false)}
              >
                <X size={32} />
              </button>
              <ul className="flex flex-col gap-8 items-center w-full">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(link.href);
                      }}
                      className="block text-2xl font-bold uppercase tracking-[0.25em] text-[#e6ccb2] hover:text-[#F5A962] hover:scale-110 transition-all duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Floating Action Widget Dock (Bottom Right) */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-center gap-4">
        {/* Shopping Cart Floating Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label="Shopping Cart"
          className="relative flex items-center justify-center h-12 w-12 rounded-full bg-[#120703]/80 backdrop-blur-md text-[#F5A962] border border-[#F5A962]/40 shadow-[0_8px_32px_rgba(245,169,98,0.25)] hover:scale-110 hover:bg-[#F5A962] hover:text-black hover:border-black transition-all duration-300 group"
        >
          <ShoppingCart size={22} strokeWidth={2} />
          {/* Cart Item Badge */}
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#F5A962] text-[10px] font-bold text-black border-2 border-black group-hover:bg-[#120703] group-hover:text-[#F5A962] transition-colors">
            2
          </span>
        </button>

        {/* Search Floating Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search"
          className="flex items-center justify-center h-11 w-11 rounded-full bg-[#120703]/80 backdrop-blur-md text-[#F5A962] border border-[#F5A962]/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:scale-110 hover:bg-[#F5A962] hover:text-black hover:border-black transition-all duration-300"
        >
          <Search size={20} strokeWidth={2} />
        </button>

        {/* User Account Floating Button */}
        <button
          onClick={() => setIsProfileOpen(true)}
          aria-label="User Account"
          className="flex items-center justify-center h-11 w-11 rounded-full bg-[#120703]/80 backdrop-blur-md text-[#F5A962] border border-[#F5A962]/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:scale-110 hover:bg-[#F5A962] hover:text-black hover:border-black transition-all duration-300"
        >
          <User size={20} strokeWidth={2} />
        </button>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
