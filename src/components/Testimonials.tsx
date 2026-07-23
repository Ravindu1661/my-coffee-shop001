import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";

// Floating quote tags
const floatingTags = [
  { text: "Brew-tiful mornings start with coffee.", top: "10%", left: "30%", delay: 0.3 },
  { text: "Life begins after coffee.", top: "48%", left: "24%", delay: 0.55 },
  { text: "Stressed, blessed, and coffee obsessed.", top: "65%", left: "52%", delay: 0.75 },
];

const avatarColors = ["#C49A6C", "#A67C52", "#6FCF97", "#9B8CF8"];

const cardData = [
  {
    name: "Jake L.",
    rating: 5,
    quote: "This coffee is so smooth, I forgot my life's a mess. Haha!",
    avatar: "J",
    color: avatarColors[0],
  },
  {
    name: "Jordan R.",
    rating: 5,
    quote:
      "NOIR has completely ruined other coffee shops for me — in the best way! Smooth, rich, and clearly made with care. Definitely my new go-to spot!",
    avatar: "Jo",
    color: avatarColors[1],
  },
  {
    name: "Allysa R.",
    rating: 4,
    quote:
      "The coffee at NOIR is next-level. You can actually taste the quality in every sip. Cozy, bright, and full of good energy. Can't wait to come back.",
    avatar: "Al",
    color: avatarColors[2],
  },
  {
    name: "Lyka M.",
    rating: 4,
    quote: "So creamy and smooth — this is my new happy place.",
    avatar: "Ly",
    color: avatarColors[3],
  },
];

function StarRow({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < count ? "fill-[#C49A6C] text-[#C49A6C]" : "fill-white/20 text-white/20"}
        />
      ))}
    </div>
  );
}

function Card({ card, delay }: { card: (typeof cardData)[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-white/10 bg-[#120703]/60 p-5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-black"
          style={{ background: card.color }}
        >
          {card.avatar}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white">{card.name}</p>
          <StarRow count={card.rating} />
        </div>
      </div>
      <p className="text-[12px] leading-relaxed text-white/65">{card.quote}</p>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="relative overflow-hidden">
      {/* ── Full-bleed background ── */}
      <div className="absolute inset-0">
        <img
          src="./images/Testimonials_back.png"
          alt="Testimonials Background"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#120703]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_20%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* ── Content wrapper ── */}
      <div className="relative z-10 py-20 lg:py-24">
        
        {/* Section header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C49A6C]"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 font-display text-4xl leading-[1.1] text-white sm:text-5xl"
          >
            Loved by{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#C49A6C 0%,#DCC09B 50%,#A67C52 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="italic"
            >
              Coffee Connoisseurs
            </span>
          </motion.h2>
        </div>

        {/* ── Desktop 3-col layout: left cards | center visual | right cards ── */}
        <div className="hidden lg:grid mx-auto max-w-7xl px-8 grid-cols-[280px_1fr_300px] gap-6 items-center min-h-[460px]">

          {/* Left column: 2 cards stacked */}
          <div className="flex flex-col gap-5">
            <Card card={cardData[0]} delay={0.1} />
            <Card card={cardData[2]} delay={0.25} />
          </div>

          {/* Center: floating tags + heart over the coffee cup area */}
          <div className="relative flex items-center justify-center min-h-[460px]">
            {/* Floating quote tags */}
            {floatingTags.map((tag, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: tag.delay }}
                className="absolute z-20"
                style={{ top: tag.top, left: tag.left, transform: "translateX(-50%)" }}
              >
                <span className="whitespace-nowrap rounded-full bg-[#C49A6C] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-black shadow-lg">
                  {tag.text}
                </span>
              </motion.div>
            ))}

            {/* Animated heart */}
            <motion.div
              animate={{ y: [0, -10, 0], scale: [1, 1.12, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="z-20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 shadow-[0_0_28px_rgba(239,68,68,0.65)]">
                <Heart size={18} className="fill-white text-white" />
              </div>
            </motion.div>
          </div>

          {/* Right column: 2 cards stacked */}
          <div className="flex flex-col gap-5">
            <Card card={cardData[1]} delay={0.15} />
            <Card card={cardData[3]} delay={0.3} />
          </div>
        </div>

        {/* ── Mobile: 2-col grid ── */}
        <div className="lg:hidden mx-auto max-w-xl px-5 mt-4 pb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cardData.map((card, i) => (
            <Card key={card.name} card={card} delay={i * 0.08} />
          ))}
        </div>

      </div>
    </section>
  );
}
