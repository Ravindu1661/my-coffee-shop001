import { motion, useInView } from "framer-motion";
import { Bean, Flame, Leaf, Zap, Trophy, Clock, ArrowUpRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

/* ── Animated counter ── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Card data ── */
const features = [
  {
    icon: Trophy,
    tag: "Award Winning",
    title: "Best Specialty Blend\n2024",
    body: "Recognized globally by the Specialty Coffee Association for exceptional clarity, depth, and balance.",
    accent: "#C49A6C",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85",
    size: "large", // col-span-2 row-span-2
  },
  {
    icon: Leaf,
    tag: "Certified Organic",
    title: "100% Natural\nOrigin",
    body: "From certified sustainable farms that respect the land and the communities growing our beans.",
    accent: "#6FCF97",
    image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600&q=85",
    size: "medium",
  },
  {
    icon: Zap,
    tag: "Cold Brew Science",
    title: "Low-Temp\nExtraction",
    body: "Preserves delicate floral notes and eliminates bitterness at its source.",
    accent: "#9B8CF8",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=85",
    size: "medium",
  },
  {
    icon: Bean,
    tag: "Single Origin",
    title: "Every Bean\nTraceable",
    body: "Hand-selected from a single farm for unmatched purity and character.",
    accent: "#DCC09B",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=85",
    size: "medium",
  },
  {
    icon: Flame,
    tag: "Precision Roast",
    title: "18-Min Artisan\nRoast Profile",
    body: "Tuned to each bean's unique moisture and density characteristics.",
    accent: "#F2A65A",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=85",
    size: "medium",
  },
  {
    icon: Clock,
    tag: "18-Hour Patience",
    title: "Never Rushed,\nNever Compromised",
    body: "Every bottle steeped for exactly 18 hours — our most sacred promise.",
    accent: "#56CCF2",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=85",
    size: "medium",
  },
];

const stats = [
  { val: 50, suffix: "K+", label: "Happy Customers" },
  { val: 18, suffix: "hr", label: "Cold Steep Time" },
  { val: 100, suffix: "%", label: "Arabica Beans" },
  { val: 49, suffix: "★", label: "Avg Rating / 50" },
];

/* ── Card component ── */
function FeatureCard({
  feature,
  index,
  large = false,
}: {
  feature: (typeof features)[0];
  index: number;
  large?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 cursor-default ${
        large ? "row-span-2" : ""
      }`}
      style={{ minHeight: large ? "480px" : "260px" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={feature.image}
          alt={feature.tag}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120703]/90 via-[#120703]/50 to-[#120703]/20" />
        {/* Accent color hover tint */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-15"
          style={{ background: feature.accent }}
        />
      </div>

      {/* Hover border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${feature.accent}50` }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-7">
        {/* Tag pill */}
        <div className="mb-4 flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: `${feature.accent}20`, border: `1px solid ${feature.accent}40` }}
          >
            <feature.icon size={15} strokeWidth={1.5} style={{ color: feature.accent }} />
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: feature.accent }}
          >
            {feature.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-display font-bold leading-[1.1] text-white ${
            large ? "text-3xl sm:text-4xl" : "text-xl"
          }`}
          style={{ whiteSpace: "pre-line" }}
        >
          {feature.title}
        </h3>

        {/* Body — slides up on hover */}
        <div className="overflow-hidden">
          <p
            className="mt-3 text-[13px] leading-relaxed text-white/60 transition-all duration-500 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          >
            {feature.body}
          </p>
        </div>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-2 overflow-hidden">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full opacity-0 transition-all duration-500 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0"
            style={{ background: `${feature.accent}25`, border: `1px solid ${feature.accent}50` }}
          >
            <ArrowUpRight size={13} style={{ color: feature.accent }} />
          </div>
        </div>

        {/* Bottom shimmer line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
          style={{ background: `linear-gradient(90deg, ${feature.accent}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const [hero, ...rest] = features;
  const smallCards = rest; // 5 items — we'll lay them in a 2+3 grid beside/below hero

  return (
    <section id="why-us" className="relative overflow-hidden bg-[#060608]">
      {/* Section background */}
      <div className="absolute inset-0">
        <img
          src="./images/why_chose_us_back.png"
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-transparent to-[#060608]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(196,154,108,0.07)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* ── Header ── */}
          <div className="mb-20 flex flex-col items-center text-center">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 h-px w-24 origin-left bg-gradient-to-r from-[#C49A6C] to-transparent"
            />
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C49A6C]"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl"
            >
              Excellence in{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#C49A6C 0%,#DCC09B 50%,#A67C52 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="italic"
              >
                Every Detail
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 sm:text-base"
            >
              We obsess over every variable so you never have to — from farm to final pour.
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 h-px w-24 origin-right bg-gradient-to-l from-[#C49A6C] to-transparent"
            />
          </div>

          {/* ── Bento Grid ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Hero card — spans 2 rows on lg */}
            <FeatureCard feature={hero} index={0} large={true} />

            {/* 4 medium cards in 2x2 beside and below hero */}
            {smallCards.slice(0, 4).map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i + 1} />
            ))}

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 5 * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-white/10 bg-white/3 backdrop-blur-md p-8 flex flex-col justify-between"
              style={{ minHeight: "260px" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C49A6C]">
                By The Numbers
              </p>
              <div className="mt-6 grid grid-cols-2 gap-y-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl font-bold text-white">
                      <AnimatedNumber target={s.val} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/35">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              {/* Gold line accent */}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-[#C49A6C]/40 to-transparent" />
            </motion.div>

            {/* Last feature card */}
            <FeatureCard key={smallCards[4].title} feature={smallCards[4]} index={6} />
          </div>

        </div>
      </div>
    </section>
  );
}
