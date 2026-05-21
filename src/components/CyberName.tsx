"use client";

import React, { useEffect, useRef, useState } from "react";

const CYBER_SYMBOLS = ["Ξ", "Ø", "▲", "⚡", "🤖", "◈", "✦", "✧", "⎔", "▓", "▒", "░", "█", "▄", "▀", "■", "⧉", "⨂", "⨁"];

interface LetterProps {
  char: string;
  wordIndex: number;
  letterIndex: number;
  globalIndex: number;
}

const CyberLetter: React.FC<LetterProps> = ({ char, wordIndex, letterIndex, globalIndex }) => {
  const [displayChar, setDisplayChar] = useState("");
  const [resolved, setResolved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLSpanElement>(null);
  const cyanTextRef = useRef<HTMLSpanElement>(null);
  const magentaTextRef = useRef<HTMLSpanElement>(null);

  // Decryption effect on load
  useEffect(() => {
    if (char === " ") {
      setDisplayChar(" ");
      setResolved(true);
      return;
    }

    const startDelay = globalIndex * 60; // Stagger start for each letter
    const duration = 800; // Duration of cycling
    const intervalTime = 40; // Cycle characters speed

    let cycleTimeout: NodeJS.Timeout;
    let cycleInterval: NodeJS.Timeout;

    const startCycling = () => {
      cycleInterval = setInterval(() => {
        const randomChar = CYBER_SYMBOLS[Math.floor(Math.random() * CYBER_SYMBOLS.length)];
        setDisplayChar(randomChar);
      }, intervalTime);

      cycleTimeout = setTimeout(() => {
        clearInterval(cycleInterval);
        setDisplayChar(char);
        setResolved(true);
      }, duration);
    };

    const initialTimeout = setTimeout(startCycling, startDelay);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(cycleTimeout);
      clearInterval(cycleInterval);
    };
  }, [char, globalIndex]);

  return (
    <div
      ref={containerRef}
      data-char={char}
      data-resolved={resolved ? "true" : "false"}
      className="relative inline-block select-none cyber-letter-container transition-all duration-300 ease-out"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Chromatic Aberration Backing: Cyan */}
      <span
        ref={cyanTextRef}
        className="absolute inset-0 text-cyan-500 opacity-0 select-none pointer-events-none transition-opacity duration-500 blur-[2px]"
        style={{
          transform: "translate3d(-2px, 0px, -5px)",
          opacity: resolved ? 0.65 : 0.2,
          mixBlendMode: "screen",
        }}
      >
        {displayChar}
      </span>

      {/* Chromatic Aberration Backing: Magenta */}
      <span
        ref={magentaTextRef}
        className="absolute inset-0 text-rose-500 opacity-0 select-none pointer-events-none transition-opacity duration-500 blur-[2px]"
        style={{
          transform: "translate3d(2px, 0px, -5px)",
          opacity: resolved ? 0.65 : 0.2,
          mixBlendMode: "screen",
        }}
      >
        {displayChar}
      </span>

      {/* Main Letter */}
      <span
        ref={mainTextRef}
        className={`relative z-10 transition-colors duration-500 ${
          resolved
            ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            : "text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)] font-mono animate-pulse"
        }`}
      >
        {displayChar}
      </span>
    </div>
  );
};

interface CyberNameProps {
  name: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export const CyberName: React.FC<CyberNameProps> = ({ name }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);

  const words = name.split(" ");
  
  // Flatten letters to get absolute indices for staggered animation
  let letterCounter = 0;
  const structuredName = words.map((word) => {
    return word.split("").map((char) => {
      const globalIndex = letterCounter;
      letterCounter++;
      return { char, globalIndex };
    });
  });

  // Particle Animation System inside canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width + 100;
        canvas.height = rect.height + 150;
        canvas.style.left = "-50px";
        canvas.style.top = "-75px";
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      }

      requestRef.current = requestAnimationFrame(animateParticles);
    };

    requestRef.current = requestAnimationFrame(animateParticles);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 3D Mouse proximity physics loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container) return;

    const letters = container.querySelectorAll(".cyber-letter-container");

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: mouseX, clientY: mouseY } = e;
      const canvasRect = canvas?.getBoundingClientRect();

      letters.forEach((el) => {
        const element = el as HTMLDivElement;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.hypot(dx, dy);
        const maxDist = 180; // Proximity threshold

        if (distance < maxDist) {
          const factor = (maxDist - distance) / maxDist; // 0 to 1 scale

          // Magnetic Repulsion Translation
          const tx = -(dx / distance) * 20 * factor;
          const ty = -(dy / distance) * 15 * factor;
          const tz = 50 * factor; // Bring forward

          // 3D rotation based on mouse entry vector
          const rx = -(dy / distance) * 25 * factor;
          const ry = (dx / distance) * 25 * factor;

          // Direct DOM transformation for ultimate 60FPS fluid motion
          element.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${1 + factor * 0.1})`;
          element.style.textShadow = `0 0 ${15 * factor}px rgba(6, 182, 212, ${0.5 * factor})`;

          // Aberration layers split
          const cyanLayer = element.querySelector("span:nth-child(1)") as HTMLSpanElement;
          const magentaLayer = element.querySelector("span:nth-child(2)") as HTMLSpanElement;
          
          if (cyanLayer && magentaLayer) {
            const shiftX = (dx / distance) * 8 * factor;
            const shiftY = (dy / distance) * 4 * factor;
            cyanLayer.style.transform = `translate3d(${-shiftX - 2}px, ${-shiftY}px, -10px)`;
            magentaLayer.style.transform = `translate3d(${shiftX + 2}px, ${shiftY}px, -10px)`;
            cyanLayer.style.opacity = String(0.4 + factor * 0.6);
            magentaLayer.style.opacity = String(0.4 + factor * 0.6);
          }

          // Trigger Spark Particles if mouse is extremely close (hovering over letter)
          if (distance < 50 && canvasRect && canvasRect.width > 0) {
            const spawnX = centerX - canvasRect.left;
            const spawnY = centerY - canvasRect.top;
            
            // Randomly spawn cyber sparks
            if (Math.random() < 0.25) {
              const isCyan = Math.random() > 0.5;
              particlesRef.current.push({
                x: spawnX,
                y: spawnY,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4 - 1.5, // slightly upward drift
                size: Math.random() * 3 + 2,
                color: isCyan ? "#06b6d4" : "#f43f5e",
                alpha: 1.0,
                decay: Math.random() * 0.03 + 0.015,
              });
            }
          }
        } else {
          // Reset transforms smoothly
          element.style.transform = "translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)";
          element.style.textShadow = "none";

          const cyanLayer = element.querySelector("span:nth-child(1)") as HTMLSpanElement;
          const magentaLayer = element.querySelector("span:nth-child(2)") as HTMLSpanElement;
          if (cyanLayer && magentaLayer) {
            cyanLayer.style.transform = "translate3d(-2px, 0px, -5px)";
            magentaLayer.style.transform = "translate3d(2px, 0px, -5px)";
            cyanLayer.style.opacity = "0.65";
            magentaLayer.style.opacity = "0.65";
          }
        }
      });
    };

    const handleMouseLeave = () => {
      // Complete reset when mouse leaves
      letters.forEach((el) => {
        const element = el as HTMLDivElement;
        element.style.transform = "translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)";
        element.style.textShadow = "none";
        
        const cyanLayer = element.querySelector("span:nth-child(1)") as HTMLSpanElement;
        const magentaLayer = element.querySelector("span:nth-child(2)") as HTMLSpanElement;
        if (cyanLayer && magentaLayer) {
          cyanLayer.style.transform = "translate3d(-2px, 0px, -5px)";
          magentaLayer.style.transform = "translate3d(2px, 0px, -5px)";
          cyanLayer.style.opacity = "0.65";
          magentaLayer.style.opacity = "0.65";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [name]);

  return (
    <div
      ref={containerRef}
      className="relative z-10 select-none py-4 leading-[0.8] tracking-tighter uppercase italic"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* High-Performance Digital Spark Overlay Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none mix-blend-screen z-0"
      />

      <div className="flex flex-col gap-2 relative z-10">
        {structuredName.map((word, wIdx) => (
          <div key={wIdx} className="flex flex-wrap items-center">
            {word.map((letter, lIdx) => (
              <CyberLetter
                key={lIdx}
                char={letter.char}
                wordIndex={wIdx}
                letterIndex={lIdx}
                globalIndex={letter.globalIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
