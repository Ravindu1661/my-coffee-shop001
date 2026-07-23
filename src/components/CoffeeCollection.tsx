import SectionReveal from "./SectionReveal";
import ProductCard from "./ProductCard";
import { products } from "../data/content";

export default function CoffeeCollection() {
  return (
    <section id="collection" className="relative bg-[#120703] py-28 lg:py-36 overflow-hidden">
      {/* Subtle Logo Watermark Background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <img src="/images/logo_coffee (2).png" alt="Logo Watermark" className="w-full max-w-[800px] object-contain grayscale" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#120703] to-transparent z-10" />

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <SectionReveal>
            <span className="mb-5 flex items-center justify-center gap-3">
              <span className="h-[1.5px] w-8 bg-gradient-to-r from-transparent to-[#C49A6C]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C49A6C]">
                The Collection
              </span>
              <span className="h-[1.5px] w-8 bg-gradient-to-l from-transparent to-[#C49A6C]" />
            </span>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl drop-shadow-sm">
              Signature Coffee, <span className="text-gradient-gold italic pr-2">Perfected</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-white/55 sm:text-lg max-w-lg mx-auto">
              Each cup is a study in balance — sourced, roasted, and poured with an
              obsession for craft.
            </p>
          </SectionReveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.name} index={i} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
