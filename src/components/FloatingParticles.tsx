interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export default function FloatingParticles({ count = 24, className = "" }: FloatingParticlesProps) {
  const particles = Array.from({ length: count }, (_, i) => {
    const size = 2 + ((i * 37) % 5);
    const left = (i * 41) % 100;
    const top = (i * 29) % 100;
    const duration = 6 + ((i * 13) % 10);
    const delay = (i * 7) % 8;
    const isGold = i % 3 === 0;
    return { id: i, size, left, top, duration, delay, isGold };
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full ${p.isGold ? "animate-float-slow" : "animate-float-slower"}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.isGold
              ? "radial-gradient(circle, rgba(196,154,108,0.9) 0%, rgba(196,154,108,0) 70%)"
              : "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            filter: "blur(0.3px)",
          }}
        />
      ))}
    </div>
  );
}
