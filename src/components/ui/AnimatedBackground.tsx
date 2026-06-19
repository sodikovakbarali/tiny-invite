"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import { useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: "heart" | "sparkle" | "star";
}

function ParticleIcon({ type }: { type: Particle["type"] }) {
  const className = "text-wine/20";
  const size = 14;

  switch (type) {
    case "heart":
      return <Heart className={className} size={size} fill="currentColor" />;
    case "sparkle":
      return <Sparkles className={className} size={size} />;
    case "star":
      return <Star className={className} size={size} fill="currentColor" />;
  }
}

export function AnimatedBackground() {
  const [particles] = useState<Particle[]>(() => {
    const types: Particle["type"][] = ["heart", "sparkle", "star"];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.6 + Math.random() * 0.8,
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 8,
      type: types[i % types.length],
    }));
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,228,232,0.8),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(232,224,240,0.7),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(114,47,55,0.08),transparent_40%)]" />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            scale: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ParticleIcon type={particle.type} />
        </motion.div>
      ))}
    </div>
  );
}
