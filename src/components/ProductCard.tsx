import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  index: number;
}

export default function ProductCard({ name, tagline, description, price, image, index }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    // In a real app, dispatch to Redux/Zustand here
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:border-[#C49A6C]/30 shadow-lg hover:shadow-2xl hover:-translate-y-2 h-full"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#120703]/40">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Subtle gradient so text is visible if needed, but since it's a cleaner look we keep it light */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120703]/80 via-[#120703]/20 to-transparent opacity-80" />
        
        {/* Tagline Badge */}
        <span className="absolute left-4 top-4 rounded-full border border-[#C49A6C]/30 bg-[#120703]/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C49A6C] backdrop-blur-md">
          {tagline}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 relative">
        <div className="flex items-start justify-between mb-3 gap-2">
          <h3 className="font-display text-2xl text-[#f7ebe1] leading-tight">{name}</h3>
          <span className="font-display text-xl text-[#C49A6C] font-medium">{price}</span>
        </div>
        
        <p className="text-sm leading-relaxed text-white/50 flex-1 mb-6">
          {description}
        </p>

        <button 
          onClick={handleAddToCart}
          className={`w-full mt-auto relative overflow-hidden rounded-xl py-3.5 flex items-center justify-center gap-2 transition-all duration-300 ${
            isAdded 
              ? "bg-[#C49A6C] text-black shadow-[0_0_20px_rgba(196,154,108,0.5)]" 
              : "bg-white/5 border border-white/10 text-[#C49A6C] hover:bg-[#C49A6C]/10 hover:border-[#C49A6C]/50"
          }`}
        >
          {isAdded ? (
            <>
              <Check size={18} className="animate-in zoom-in duration-300" />
              <span className="font-bold uppercase tracking-widest text-xs">Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart size={18} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-bold uppercase tracking-widest text-xs">Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
