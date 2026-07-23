import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experienceSlides } from "../data/content";
import SectionReveal from "./SectionReveal";

export default function Experience() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Main container horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["3%", "-75%"]);
  
  // Internal image parallax (creates the 3D window effect)
  const imageParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "5%"]);

  return (
    <section id="experience" className="relative bg-[#120703]">
      <div className="mx-auto max-w-7xl px-6 pt-28 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <SectionReveal>
            <span className="mb-5 flex items-center justify-center gap-3">
              <span className="h-[1.5px] w-8 bg-gradient-to-r from-transparent to-[#C49A6C]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C49A6C]">
                The Coffee Experience
              </span>
              <span className="h-[1.5px] w-8 bg-gradient-to-l from-transparent to-[#C49A6C]" />
            </span>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl drop-shadow-sm">
              A Journey From <span className="text-gradient-gold italic pr-2">Bean to Bliss</span>
            </h2>
          </SectionReveal>
        </div>
      </div>

      <div ref={targetRef} className="relative h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 pl-6 sm:pl-16 lg:pl-24 items-center">
            {experienceSlides.map((slide, i) => (
              <div
                key={slide.title}
                className="relative h-[70vh] w-[85vw] flex-shrink-0 overflow-hidden sm:w-[45vw] lg:h-[80vh] lg:w-[28vw] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
              >
                {/* Parallax Image Background */}
                <motion.div 
                  className="absolute inset-0 w-[130%] h-full"
                  style={{ x: imageParallax }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    loading="lazy"
                    className="h-full w-full object-cover filter brightness-[0.85] contrast-[1.1] transition-all duration-700 group-hover:brightness-100"
                  />
                </motion.div>
                
                {/* Luxury Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#120703]/60 via-transparent to-[#120703]/95" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#120703]/30 to-transparent" />
                
                {/* Elegant Number */}
                <span className="absolute top-6 left-6 font-display text-8xl text-white opacity-5 font-bold mix-blend-overlay select-none transition-opacity duration-500 group-hover:opacity-10">
                  0{i + 1}
                </span>

                {/* Glassmorphism Text Panel */}
                <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-[#120703]/40 border border-white/5 backdrop-blur-md p-6 sm:p-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-display text-3xl text-[#f7ebe1] sm:text-4xl tracking-wide">{slide.title}</h3>
                  <div className="mt-4 h-px w-12 bg-gradient-to-r from-[#C49A6C] to-transparent" />
                  <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/70 font-light">{slide.subtitle}</p>
                </div>
                
                {/* Outer Frame */}
                <div className="absolute inset-0 border border-white/10 pointer-events-none transition-colors duration-500 group-hover:border-[#C49A6C]/30" />
              </div>
            ))}
            
            {/* Final Cinematic Quote Frame */}
            <div className="relative flex h-[70vh] w-[85vw] sm:w-[45vw] lg:h-[80vh] lg:w-[28vw] flex-shrink-0 flex-col items-center justify-center border border-white/5 bg-[#0a0402] p-10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,154,108,0.05)_0%,transparent_70%)]" />
              <div className="relative z-10 text-center">
                <p className="font-display text-4xl leading-snug text-white sm:text-5xl">
                  Every detail, <br/><span className="text-gradient-gold italic">considered.</span>
                </p>
                <div className="mx-auto mt-8 h-px w-16 bg-[#C49A6C]/40" />
                <p className="mt-8 max-w-xs mx-auto text-sm sm:text-base text-white/50 leading-relaxed font-light">
                  Keep scrolling to explore, or dive straight into our handpicked collection.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
