import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock Cart Data for UI demonstration
const cartItems = [
  {
    id: 1,
    name: "Signature Iced Latte",
    tagline: "Our Icon",
    price: 9.0,
    quantity: 1,
    image: "/images/signature_latte.png",
  },
  {
    id: 2,
    name: "Cold Brew",
    tagline: "Slow & Refined",
    price: 7.0,
    quantity: 1,
    image: "/images/cold_brew.png",
  },
];

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
            {/* Header with Logo */}
            <div className="relative flex flex-col items-center justify-center pt-10 pb-6 border-b border-white/5">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-[#F5A962] hover:bg-white/5 rounded-full transition-all duration-300"
              >
                <X size={24} />
              </button>

              {/* Logo */}
              <motion.img
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                src="/images/logo_coffee (2).png"
                alt="Elite Coffee Logo"
                className="h-28 w-auto object-contain filter drop-shadow-[0_8px_16px_rgba(245,169,98,0.15)]"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex items-center gap-2 text-[#d4a373]"
              >
                <ShoppingBag size={18} />
                <span className="font-display tracking-widest uppercase text-sm font-semibold">Your Cart</span>
              </motion.div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
              {cartItems.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                      className="flex gap-4 items-center group"
                    >
                      {/* Item Image */}
                      <div className="relative h-20 w-20 rounded-2xl bg-white/5 border border-white/10 p-2 overflow-hidden group-hover:border-[#d4a373]/40 transition-colors">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#120703]/20 to-transparent" />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-[#f7ebe1] font-display text-lg leading-tight">{item.name}</h3>
                        <p className="text-[#d4a373] text-[10px] uppercase tracking-wider mb-2">{item.tagline}</p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-white font-semibold">${item.price.toFixed(2)}</span>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1 border border-white/10">
                            <button className="text-white/50 hover:text-[#d4a373] transition-colors"><Minus size={14} /></button>
                            <span className="text-white text-xs font-medium w-4 text-center">{item.quantity}</span>
                            <button className="text-white/50 hover:text-[#d4a373] transition-colors"><Plus size={14} /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <ShoppingBag size={48} className="mb-4 text-[#d4a373]" />
                  <p className="text-white text-sm">Your cart is empty</p>
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-6 border-t border-white/10 bg-[#120703]/40"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-white/70 uppercase tracking-widest text-xs font-medium">Subtotal</span>
                <span className="text-[#f7ebe1] font-display text-2xl">${subtotal.toFixed(2)}</span>
              </div>
              
              <button className="w-full relative overflow-hidden group rounded-full bg-gradient-to-r from-[#C49A6C] to-[#A67C52] text-black px-6 py-4 flex justify-between items-center shadow-[0_8px_30px_rgba(196,154,108,0.25)] hover:shadow-[0_8px_40px_rgba(196,154,108,0.4)] transition-all duration-300 transform hover:scale-[1.02]">
                <span className="font-bold uppercase tracking-[0.2em] text-xs">Proceed to Checkout</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
