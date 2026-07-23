import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

export default function BrandStory() {
  const handleShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#collection");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="relative overflow-hidden bg-[#120703] min-h-screen flex items-center pt-24 lg:pt-0 pb-16 lg:pb-0">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="w-full max-w-[100vw] grid grid-cols-1 items-center lg:grid-cols-2 h-full">
        {/* Left Side: Text Content */}
        <div className="px-6 sm:px-16 lg:px-24 xl:px-32 z-10 order-2 lg:order-1 pt-12 lg:pt-0 relative">
          <SectionReveal>
            <h2 className="font-display text-5xl leading-[1.1] text-[#f7ebe1] sm:text-6xl lg:text-[4.5rem]">
              Our Story
            </h2>
          </SectionReveal>
          
          <SectionReveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base font-semibold text-white/80 uppercase tracking-wide">
              From Passion to Perfection: The Journey of NOIR
            </p>
          </SectionReveal>
          
          <SectionReveal delay={0.2}>
            <p className="mt-8 max-w-xl text-base leading-loose text-white/60 sm:text-lg">
              At NOIR, coffee isn't just a drink — it's a passion, a ritual, and an experience. Our journey began with a simple mission: to create exceptional coffee that people could truly enjoy, share, and savor every day. 
              <span className="text-[#C49A6C] font-semibold cursor-pointer hover:text-white transition-colors ml-2">Read more...</span>
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <div className="mt-16 sm:mt-24">
              <h3 className="text-xl sm:text-2xl font-display text-white/90 max-w-sm leading-snug">
                Want to experience the quality and care behind every cup?
              </h3>
              
              <button 
                onClick={handleShopClick}
                className="mt-6 relative overflow-hidden rounded-md bg-gradient-to-r from-[#8B5A2B] to-[#5C3A21] px-8 py-3.5 group hover:shadow-[0_0_20px_rgba(139,90,43,0.4)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative text-sm font-bold tracking-wider text-white uppercase drop-shadow-md">
                  Shop Now
                </span>
              </button>
            </div>
          </SectionReveal>
        </div>

        {/* Right Side: Surreal Image */}
        <div className="relative order-1 lg:order-2 h-[50vh] sm:h-[60vh] lg:h-screen w-full flex items-center justify-end overflow-hidden">
          {/* Gradient overlay to seamlessly blend the image edge into the background */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#120703] via-[#120703]/40 to-transparent z-10 pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            {/* Subtle floating animation */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <img
                src="./images/luxury_coffee_story.png"
                alt="Surreal Coffee Masterpiece"
                className="h-full w-full object-cover lg:object-contain object-right-bottom scale-[1.1] lg:scale-[1.05]"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
