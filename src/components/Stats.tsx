import SectionReveal from "./SectionReveal";
import AnimatedCounter from "./AnimatedCounter";
import { stats } from "../data/content";

export default function Stats() {
  return (
    <section className="relative border-y border-white/10 bg-gradient-to-b from-[#120703] via-[#0a0806] to-[#120703] py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 lg:grid-cols-4 lg:px-10">
        {stats.map((stat, i) => (
          <SectionReveal key={stat.label} delay={i * 0.1}>
            <div className="text-center">
              <p className="font-display text-4xl text-white sm:text-5xl lg:text-6xl">
                <span className="text-gradient-gold">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50 sm:text-xs">
                {stat.label}
              </p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
