import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

const TOTAL_FRAMES = 79;
const FRAME_PREFIX = "Luxury_coffee_commercial_animation_1080p_202607221739-enhanced_";
const FRAME_PATH = "./sequence5/";

function frameSrc(i: number) {
  if (i === 0) return `${FRAME_PATH}FIRST.png`;
  if (i === TOTAL_FRAMES - 1) return `${FRAME_PATH}LAST.jpeg`;
  const seqIdx = i - 1;
  const padStr = String(seqIdx).padStart(3, "0");
  return `${FRAME_PATH}${FRAME_PREFIX}${padStr}.jpg`;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Scroll variables
  const targetFrameRef = useRef(0);
  const smoothFrameRef = useRef(0);
  const lastFrameRef = useRef(-1);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Scroll progress for text phases
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Preload sequence frames
    const preloadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(loadedCount / TOTAL_FRAMES);
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      preloadedImages.push(img);
    }
    imagesRef.current = preloadedImages;
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Draw centered fullscreen frame with cover scaling, shifted safely left
    const drawFrame = (index: number) => {
      const idx = Math.min(Math.max(index, 0), TOTAL_FRAMES - 1);
      const img = imagesRef.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Perfectly centered cover scaling (no zoom)
      const baseScale = Math.max(cw / iw, ch / ih);
      const isDesktop = cw >= 1024;
      const scale = baseScale; // No extra zoom
      const sw = iw * scale;
      const sh = ih * scale;
      
      // Shift right by 10% of screen width on desktop
      // (The left edge will expose the canvas background, which seamlessly blends with the dark vignette)
      let sx = (cw - sw) / 2 + (isDesktop ? cw * 0.10 : 0);
      const sy = (ch - sh) / 2;

      ctx.fillStyle = "#120703";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh);

      lastFrameRef.current = idx;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(Math.round(smoothFrameRef.current));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // requestAnimationFrame tick loop
    let animId: number;
    const tick = () => {
      smoothFrameRef.current += (targetFrameRef.current - smoothFrameRef.current) * 0.08;
      const currentIdx = Math.round(smoothFrameRef.current);

      if (currentIdx !== lastFrameRef.current) {
        drawFrame(currentIdx);
      }
      animId = requestAnimationFrame(tick);
    };
    tick();

    // Scroll calculations
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollTop = window.scrollY;
      const height = container.offsetHeight;
      const viewH = window.innerHeight;

      const progress = Math.min(Math.max(scrollTop / (height - viewH), 0), 1);
      targetFrameRef.current = Math.round(progress * (TOTAL_FRAMES - 1));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [isLoaded]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[450vh] bg-[#120703]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Canvas - Kept strictly centered at all times */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
        />

        {/* Dark Vignette & Gradient Overlays for High Legibility & Dark Aesthetic */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          {/* Top & Bottom shadow falloff - reduced darkness */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#120703]/50 via-transparent to-[#120703]/70" />
          
          {/* Left-side dark gradient overlay - highly concentrated on the very left edge to hide the gap without spreading */}
          <div 
            className="absolute inset-y-0 left-0 w-full lg:w-[35%]" 
            style={{
              background: "linear-gradient(to right, #120703 0%, #120703 28%, rgba(18,7,3,0.5) 55%, transparent 100%)"
            }}
          />
          
          {/* Soft dark warm ambient radial glow - reduced darkness */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_45%,rgba(18,7,3,0.6)_100%)]" />
        </div>

        <div className="noise absolute inset-0 z-[2]" />

        <FloatingParticles count={18} />

        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#120703] z-50">
            <span className="mb-3 font-coffee text-xl tracking-[0.25em] uppercase text-[#e6ccb2]">
              coffee
            </span>
            <span className="mb-4 font-script text-2xl text-[#d4a373]">
              Taste the Moment
            </span>
            <div className="h-[2px] w-64 rounded bg-white/10 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#6f3b1b] via-[#d4a373] to-[#e6ccb2] transition-all duration-150"
                style={{ width: `${loadProgress * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Content Layout — Left Aligned Panel */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-8 xl:px-4 flex items-center h-full">

          {/* Left-side Description Container - Shifted right slightly and moved up slightly */}
          <div className="w-full lg:w-[48%] max-w-[540px] mt-12 lg:mt-16 flex flex-col items-center lg:items-start text-center lg:text-left lg:-translate-x-4 xl:-translate-x-6">
            
            {/* Top Subtitle with Leaf/Bean Ornamentation */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5 animate-fade-in">
              <span className="h-[1.5px] w-10 bg-gradient-to-r from-transparent to-[#F5A962]" />
              <span className="text-[12px] font-bold uppercase tracking-[0.35em] text-[#FFD8B1] flex items-center gap-2 drop-shadow-sm">
                <span>PREMIUM</span>
                <span className="text-[10px] text-[#F5A962]">❖</span>
                <span>QUALITY</span>
              </span>
              <span className="h-[1.5px] w-10 bg-gradient-to-l from-transparent to-[#F5A962]" />
            </div>

            {/* Main Title "coffee" matching exact font in provided image */}
            <h1 className="font-coffee text-7xl sm:text-8xl lg:text-9xl tracking-tight text-[#f7ebe1] leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] select-none">
              coffee
            </h1>

            {/* Cursive Tagline "Taste the Moment" matching image */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-4 mb-10">
              <span className="h-[1px] w-12 bg-white/20" />
              <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#d4a373] transform -rotate-1 select-none">
                Taste the Moment
              </p>
              <span className="text-xs text-[#d4a373]">♡</span>
              <span className="h-[1px] w-12 bg-white/20" />
            </div>

            {/* Dynamic Animated Description depending on Scroll Progress */}
            <div className="relative min-h-[140px] w-full">

              {/* Phase 1: Intro (0 - 35% scroll) */}
              <div
                className={`transition-all duration-700 ease-out ${
                  scrollProgress <= 0.35
                    ? "opacity-100 translate-y-0 relative pointer-events-auto"
                    : "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none"
                }`}
              >
                <p className="text-base sm:text-lg leading-relaxed text-[#e6ccb2]/80 font-light mt-6">
                  Immerse yourself in rich artisanal cold brew. Hand-crafted from selected single-origin Arabica beans for a silken texture and deep cocoa undertones.
                </p>
                <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
                  <div className="px-4 py-2 rounded-full border border-[#d4a373]/30 bg-[#2b170e]/40 backdrop-blur-md text-xs text-[#e6ccb2] tracking-wider uppercase">
                    ☕ 100% Arabica
                  </div>
                  <div className="px-4 py-2 rounded-full border border-[#d4a373]/30 bg-[#2b170e]/40 backdrop-blur-md text-xs text-[#e6ccb2] tracking-wider uppercase">
                    ✨ Dark Roast
                  </div>
                </div>
              </div>

              {/* Phase 2: Infusion process (35% - 70% scroll) */}
              <div
                className={`transition-all duration-700 ease-out ${
                  scrollProgress > 0.35 && scrollProgress <= 0.70
                    ? "opacity-100 translate-y-0 relative pointer-events-auto"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                }`}
              >
                <p className="text-base sm:text-lg leading-relaxed text-[#e6ccb2]/80 font-light mt-6">
                  Watch the slow pour motion. Every drop captures 18 hours of patience, blending rich velvet crema with velvety dark chocolate accents.
                </p>
                <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 border-t border-white/10 pt-6">
                  <div>
                    <span className="block font-coffee text-2xl text-[#f7ebe1]">18 Hrs</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#d4a373]">Cold Infusion</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <span className="block font-coffee text-2xl text-[#f7ebe1]">4°C</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#d4a373]">Steep Temp</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <span className="block font-coffee text-2xl text-[#f7ebe1]">Pure</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#d4a373]">Velvet Taste</span>
                  </div>
                </div>
              </div>

              {/* Phase 3: Final Call (70% + scroll) */}
              <div
                className={`transition-all duration-700 ease-out ${
                  scrollProgress > 0.70
                    ? "opacity-100 translate-y-0 relative pointer-events-auto"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                }`}
              >
                <p className="text-base sm:text-lg leading-relaxed text-[#e6ccb2]/80 font-light mt-6">
                  A cup crafted to elevate every moment. Experience coffee brewed with unparalleled care, precision, and passion.
                </p>
                <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
                  <a
                    href="#collection"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4a2810] via-[#8a532b] to-[#d4a373] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#f7ebe1] shadow-[0_8px_30px_rgba(74,40,16,0.5)] border border-[#d4a373]/40 hover:scale-105 transition-all duration-300"
                  >
                    Explore Menu
                  </a>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center rounded-full border border-[#d4a373]/30 bg-[#120703]/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#e6ccb2] hover:border-[#d4a373] hover:bg-[#120703]/60 transition-all duration-300"
                  >
                    Our Story
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Scroll Indicator at bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#d4a373]/70 animate-bounce pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll to experience</span>
          <ChevronDown size={18} />
        </div>
        
      </div>
    </section>
  );
}
