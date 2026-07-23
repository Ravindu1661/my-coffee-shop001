import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#120703] py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6F4E37]/25 blur-[180px]" />
        <img
          src="/sequence/frame-05.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.15]"
        />
        <div className="absolute inset-0 bg-[#120703]/70" />
      </div>
      <FloatingParticles count={30} />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C49A6C]"
        >
          Ready When You Are
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-7xl"
        >
          Experience Coffee <br />
          <span className="text-gradient-gold italic">Beyond Expectations</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Step into a world where every cup is a masterpiece. Order online or visit
          our flagship house for the full NOIR ritual.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C49A6C] to-[#A67C52] px-9 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-black shadow-[0_10px_40px_rgba(196,154,108,0.35)] transition-transform duration-300 hover:scale-[1.03]"
          >
            Order Now
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-9 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            View Menu
          </a>
        </motion.div>
      </div>
    </section>
  );
}
