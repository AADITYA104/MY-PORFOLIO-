"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProfileData = {
  name: "Aditya Devmurari",
  role: "Full Stack & AI Architect",
  summary: "Results-driven Software Developer with 2+ years of experience in Research & Development and Full Stack Engineering. Expert in architecting scalable web applications and high-accuracy AI/ML models. Specialized in Python, Next.js, and deploying intelligent AI Agents for business automation.",
  email: "devmurariaaditya@gmail.com",
  phone: "+91-7046387404",
  location: "Gujarat, India",
  socials: {
    linkedin: "linkedin.com/in/devmurari-aditya",
    github: "github.com/AADITYA104"
  },
  skills: {
    languages: ["Python", "JavaScript", "HTML5", "CSS3"],
    frameworks: ["React.js", "Next.js", "Node.js", "Tailwind CSS"],
    ai: ["Machine Learning", "NLP", "AI Agents", "Scikit-learn", "Data Analysis"],
    tools: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Git", "GitHub"]
  },
  stats: [
    { label: "Innovation Projects", value: "4+" },
    { label: "Data Processing", value: "+30%" },
    { label: "Predictive Accuracy", value: "95%" },
    { label: "Mentored Students", value: "10+" },
    { label: "Performance Boost", value: "15%" },
    { label: "Cross-Browser", value: "100%" }
  ],
  experience: [
    {
      role: "R&D Engineer",
      company: "Gyanmanjari Innovative University (GMIU)",
      period: "Feb 2024 – Jan 2026",
      bullets: [
        "Spearheaded R&D for 4+ major innovation projects, focusing on high-level software scalability.",
        "Architected a prototype system that improved data processing speeds by 30%.",
        "Mentored a team of 10+ junior students, guiding them through the full Software Development Life Cycle (SDLC)."
      ]
    },
    {
      role: "Junior AI/ML Developer",
      company: "Mexgen Technologies Pvt. Ltd.",
      period: "Jul 2025 – Jan 2026",
      bullets: [
        "Engineered automated AI/ML models for business workflows, reducing manual data entry by 20%.",
        "Optimized Python data pipelines, achieving a 95% accuracy rate in predictive modeling.",
        "Integrated intelligent AI agents into production platforms to enhance user engagement metrics."
      ]
    },
    {
      role: "Front End Developer",
      company: "IT Hub",
      period: "Nov 2024 – Dec 2024",
      bullets: [
        "Developed responsive web interfaces with 100% cross-browser compatibility using modern JS frameworks.",
        "Enhanced front-end performance, reducing page load times by approximately 15%."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology in Information Technology",
      institution: "Gyanmanjari Innovative University (GMIU)",
      status: "Pursuing",
      location: "Gujarat, India"
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Gyanmanjari Institute of Technology (GMIT)",
      status: "CGPA: 7.84",
      location: "Gujarat, India"
    }
  ],
  projects: [
    { title: "AI Threat Detection", tech: "Python/ML", metric: "92% Accuracy", link: "https://github.com/AADITYA104/Threat-Detection-in-Cyber-Security-Using-AI-master" },
    { title: "Blockchain Voting", tech: "Solidity/Web3", metric: "100% Integrity", link: "https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master" },
    { title: "Healthcare Chatbot", tech: "NLP/AI", metric: "40% Faster Triage", link: "https://github.com/AADITYA104/Health-Care-Chatbot-" },
    { title: "Fake News Detection", tech: "Python/ML", metric: "Analytics", link: "https://github.com/AADITYA104/Fake-News-Detection" },
    { title: "Dynamic Face Lift", tech: "CV/AI", metric: "Vision", link: "https://github.com/AADITYA104/dynamic-face-lift" },
    { title: "NetGuard", tech: "Security", metric: "Protection", link: "https://github.com/AADITYA104/NetGuard" },
    { title: "Portfolio Kinju", tech: "Next.js", metric: "Modern UI", link: "https://github.com/AADITYA104/protfolio-kinju" },
    { title: "InspectFlow Sync", tech: "Full Stack", metric: "Automation", link: "https://github.com/AADITYA104/inspectflow-sync" },
    { title: "CXBulk", tech: "Full Stack", metric: "Scale", link: "https://github.com/AADITYA104/CXBulk" },
    { title: "Codexservice", tech: "Backend", metric: "API", link: "https://github.com/AADITYA104/Codexservice" },
    { title: "QR Code Page", tech: "Frontend", metric: "Utility", link: "https://github.com/AADITYA104/QR-CODE-PAGE" },
    { title: "Digivualt", tech: "Web/Security", metric: "Vault", link: "https://github.com/YogeshTundiya/Digivualt" },
    { title: "Gym Pro System", tech: "Full Stack", metric: "Management", link: "https://github.com/YogeshTundiya/Gym_pro_system" },
    { title: "Lifeconnect", tech: "Web App", metric: "Social", link: "https://github.com/YogeshTundiya/Lifeconnect" },
    { title: "Gov Project", tech: "Full Stack", metric: "Public Tech", link: "https://github.com/YogeshTundiya/Gov-porject" }
  ]
};

// 1. TERMINAL BOOT SEQUENCE
const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [lines, setLines] = useState<string[]>([]);
    
    useEffect(() => {
        const bootData = [
            "> INITIALIZING ADITYA_OS...",
            "> LOADING KERNEL V.4.0.2",
            "> MOUNTING REPOSITORIES...",
            "> 15 PROJECTS IDENTIFIED",
            "> ESTABLISHING AI_CORE CONNECTIVITY...",
            "> SYNCING GITHUB_NODE: AADITYA104",
            "> SCANNING FULL_STACK_MODULES...",
            "> AUTHORIZING ACCESS: ADITYA DEVMURARI",
            "> DEPLOYING INTERFACE..."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < bootData.length) {
                setLines(prev => [...prev, bootData[i]]);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 600);
            }
        }, 120);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[1000] flex items-center justify-center p-10 font-mono">
            <div className="max-w-xl w-full">
                {lines.map((line, idx) => (
                    <div 
                      key={idx} 
                      className="text-cyan-500 mb-2 whitespace-nowrap overflow-hidden"
                      style={{ animation: "typing 0.3s steps(40, end) forwards" }}
                    >
                        {line}
                    </div>
                ))}
                <div className="w-4 h-6 bg-cyan-500 animate-pulse mt-4" />
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes typing { from { width: 0; } to { width: 100%; } }
            `}} />
        </div>
    );
};

// 2. PROJECT BACKGROUND ANIMATIONS (Real Video Loops from Giphy)
const VideoBackground = ({ src }: { src: string }) => (
  <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 z-0"
    style={{ filter: 'brightness(0.7) contrast(1.2)' }}
  >
    <source src={src} type="video/mp4" />
    <div className="w-full h-full bg-cyan-900/20 animate-pulse" />
  </video>
);

const GetCardAnimation = (tech: string) => {
  const t = tech.toLowerCase();
  
  if (t.includes("security") || t.includes("web3") || t.includes("solidity")) {
    return <VideoBackground src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.mp4" />;
  }
  if (t.includes("ml") || t.includes("ai") || t.includes("cv") || t.includes("nlp")) {
    return <VideoBackground src="https://media.giphy.com/media/l41YmxZHRBmsW71ks/giphy.mp4" />;
  }
  if (t.includes("health") || t.includes("medical")) {
    return <VideoBackground src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.mp4" />;
  }
  if (t.includes("backend") || t.includes("api") || t.includes("data")) {
    return <VideoBackground src="https://media.giphy.com/media/26tn33aiTi1jNDsJi/giphy.mp4" />;
  }
  
  // Default fallback video
  return <VideoBackground src="https://media.giphy.com/media/3o7TKrEzvPNBgZ9XHO/giphy.mp4" />;
};

// 3. MAGNETIC BUTTON WRAPPER
const MagneticElement = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();
            const center = { x: left + width / 2, y: top + height / 2 };
            const dist = Math.hypot(clientX - center.x, clientY - center.y);
            
            if (dist < 150) {
                xTo((clientX - center.x) * 0.4);
                yTo((clientY - center.y) * 0.4);
            } else {
                xTo(0);
                yTo(0);
            }
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        window.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={ref} className={`inline-block ${className || ''}`}>
            {children}
        </div>
    );
};

export default function Home() {
  const [booted, setBooted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Cursor Refs
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);

  // 3D Hero Ref
  const heroContentRef = useRef<HTMLDivElement>(null);
  
  // Background Grid Ref
  const gridRef = useRef<HTMLDivElement>(null);

  // Horizontal Scroll Ref
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  // Setup GSAP Animations
  useEffect(() => {
    if (!booted) return;

    // We use a context to clean up all GSAP animations when component unmounts
    const ctx = gsap.context(() => {
      // 1. Custom Cursor & 3D Hero Mouse Move
      const xDot = gsap.quickSetter(cursorDotRef.current, "x", "px");
      const yDot = gsap.quickSetter(cursorDotRef.current, "y", "px");
      
      const xRing = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.5, ease: "power3.out" });
      const yRing = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.5, ease: "power3.out" });

      const handleGlobalMouseMove = (e: MouseEvent) => {
        const { clientX: x, clientY: y } = e;
        
        // Update Cursor
        xDot(x);
        yDot(y);
        xRing(x);
        yRing(y);
        
        // Update Label Coordinates
        if (cursorLabelRef.current) {
          cursorLabelRef.current.innerText = `X: ${Math.round(x)} Y: ${Math.round(y)}\nSYS: ONLINE`;
        }

        // Update 3D Hero Rotation (avoids React re-renders)
        if (heroContentRef.current) {
          const rotateY = ((x / window.innerWidth) - 0.5) * 20;
          const rotateX = ((y / window.innerHeight) - 0.5) * -20;
          gsap.to(heroContentRef.current, {
            rotateY,
            rotateX,
            duration: 1,
            ease: "power2.out",
            transformPerspective: 1000
          });
        }

        // Parallax Background Grid
        if (gridRef.current) {
          gsap.to(gridRef.current, {
            x: -x * 0.04,
            y: -y * 0.04,
            duration: 1,
            ease: "power2.out"
          });
        }
      };

      window.addEventListener("mousemove", handleGlobalMouseMove);

      // Handle Hover States for the cursor
      const interactiveElements = document.querySelectorAll("a, button, .hover-target");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(cursorRingRef.current, { scale: 2.5, backgroundColor: "rgba(6, 182, 212, 0.1)", borderColor: "rgba(6, 182, 212, 0.8)", duration: 0.3 });
          gsap.to(cursorDotRef.current, { scale: 0, duration: 0.3 });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(cursorRingRef.current, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(6, 182, 212, 0.4)", duration: 0.3 });
          gsap.to(cursorDotRef.current, { scale: 1, duration: 0.3 });
        });
      });

      // 2. Horizontal Scroll Section using ScrollTrigger
      if (horizontalSectionRef.current && horizontalTrackRef.current) {
        const scrollWidth = horizontalTrackRef.current.scrollWidth - window.innerWidth;
        
        gsap.to(horizontalTrackRef.current, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            pin: true,
            scrub: 1, // Smooth scrubbing
            start: "top top",
            end: () => `+=${scrollWidth}`
          }
        });
      }

      // 3. Fade up text elements (Reveal on Scroll)
      const revealElements = gsap.utils.toArray(".reveal-up") as HTMLElement[];
      revealElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%", // Reveal when element is 85% from top
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 4. Advanced Experience (Chronicle Logs) Animation
      const expBlocks = gsap.utils.toArray(".exp-block") as HTMLElement[];
      expBlocks.forEach((block) => {
        const bgText = block.querySelector(".exp-bg-text");
        const content = block.querySelector(".exp-content");
        const bullets = block.querySelectorAll(".exp-bullet");

        // Parallax for background text
        if (bgText) {
          gsap.to(bgText, {
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        }

        // Staggered reveal for content
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        tl.fromTo(content, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" })
          .fromTo(bullets, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.4");
      });

      return () => {
        window.removeEventListener("mousemove", handleGlobalMouseMove);
      };
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP context on unmount
  }, [booted]);

  if (!booted) return <BootSequence onComplete={() => setBooted(true)} />;

  return (
    <div ref={containerRef} className="bg-[#000] text-white font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black cursor-none">
      
      {/* 2. ADVANCED HUD CURSOR */}
      <div className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block">
        {/* Outer Ring */}
        <div 
          ref={cursorRingRef}
          className="absolute w-12 h-12 border border-cyan-500/40 rounded-full -ml-6 -mt-6 will-change-transform"
        />
        {/* Inner Dot */}
        <div 
          ref={cursorDotRef}
          className="absolute w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4] -ml-1 -mt-1 will-change-transform"
        />
        {/* Coordinates Label */}
        <div 
          ref={cursorLabelRef}
          className="absolute top-6 left-6 font-mono text-[8px] text-cyan-500 opacity-60 w-32 whitespace-pre"
        >
          X: 0 Y: 0<br/>SYS: ONLINE
        </div>
      </div>

      {/* 3. DYNAMIC BACKGROUND GRID */}
      <div className="fixed inset-0 -z-10 opacity-[0.15] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.2)_0%,transparent_60%)]" />
          <div 
            ref={gridRef}
            className="w-[150vw] h-[150vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{ 
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
                transform: `rotateX(60deg) scale(1.5)`
            }}
          />
      </div>

      {/* 4. HERO SECTION - 3D PERSPECTIVE */}
      <section className="min-h-screen flex items-center px-6 md:px-20 relative overflow-hidden">
          <div 
            ref={heroContentRef}
            className="w-full max-w-7xl mx-auto will-change-transform transform-style-3d"
          >
              <div className="overflow-hidden mb-6" style={{ transform: "translateZ(50px)" }}>
                <p className="font-mono text-cyan-500 text-xs md:text-sm tracking-[0.8em]">SYSTEM_ORIGIN: GUJARAT_IN</p>
              </div>
              <h1 className="text-[18vw] md:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase italic select-none" style={{ transform: "translateZ(100px)" }}>
                  {ProfileData.name.split(' ')[0]}<br/>
                  <span className="text-cyan-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">{ProfileData.name.split(' ')[1]}</span>
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-16 md:mt-24 gap-10 md:gap-20 items-end" style={{ transform: "translateZ(30px)" }}>
                  <div className="space-y-6">
                      <div className="w-20 h-[2px] bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
                      <p className="text-3xl md:text-5xl font-light text-gray-400 uppercase tracking-tight leading-none hover-target">{ProfileData.role}</p>
                  </div>
                  <div className="bg-white/5 p-8 border-l-2 border-cyan-500 backdrop-blur-md">
                      <p className="text-xs md:text-sm font-mono text-gray-300 leading-loose uppercase tracking-widest text-justify">{ProfileData.summary}</p>
                  </div>
              </div>
          </div>
      </section>

      {/* 5. STATS - METER STYLE */}
      <section className="py-32 px-6 md:px-20 border-y border-white/10 bg-black/80 backdrop-blur-sm relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 max-w-7xl mx-auto">
              {ProfileData.stats.map((stat, i) => (
                  <div key={i} className="reveal-up p-8 border border-white/5 group hover:bg-cyan-500 transition-all duration-500 overflow-hidden relative hover-target">
                      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                      <p className="text-4xl md:text-6xl font-black mb-3 group-hover:text-black transition-colors duration-300">{stat.value}</p>
                      <p className="text-[10px] md:text-xs font-mono text-gray-500 uppercase group-hover:text-black transition-colors duration-300">{stat.label}</p>
                  </div>
              ))}
          </div>
      </section>

      {/* 6. HORIZONTAL PROJECTS GALLERY (GSAP ScrollTrigger) */}
      <section 
        ref={horizontalSectionRef} 
        className="bg-white text-black overflow-hidden relative z-10 h-screen" 
      >
        <div className="h-full flex items-center">
            {/* The moving track */}
            <div 
              ref={horizontalTrackRef}
              className="flex gap-10 md:gap-20 px-10 md:px-32 whitespace-nowrap will-change-transform"
            >
                <div className="flex items-center min-w-[300px] md:min-w-[500px]">
                  <h2 className="text-[15vw] font-black tracking-tighter uppercase text-gray-200">DEPLOYMENTS</h2>
                </div>

                {ProfileData.projects.map((p, i) => (
                    <a 
                      key={i} 
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-target w-[80vw] h-[60vh] md:w-[450px] md:h-[550px] shrink-0 bg-[#050505] text-white p-8 md:p-14 flex flex-col justify-between group transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10 hover:border-cyan-500/50 relative overflow-hidden"
                    >
                        {/* Video Background */}
                        <div className="absolute inset-0 z-0 pointer-events-none bg-black">
                            {GetCardAnimation(p.tech)}
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-500" />
                        </div>

                        <div className="flex justify-between items-start relative z-10">
                            <span className="font-mono text-[10px] md:text-xs opacity-50 group-hover:text-cyan-400 transition-colors bg-black/50 px-2 py-1 rounded">MODULE_{String(i+1).padStart(2, '0')}</span>
                            <span className="text-3xl md:text-4xl group-hover:text-cyan-400 transition-colors transform group-hover:translate-x-2 group-hover:-translate-y-2 duration-300 drop-shadow-lg">↗</span>
                        </div>
                        <div className="relative z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-10 -mx-8 -mb-8 px-8 pb-8 md:-mx-14 md:-mb-14 md:px-14 md:pb-14">
                            <p className="font-mono text-[10px] md:text-xs text-cyan-500 mb-3 uppercase drop-shadow">Tech: {p.tech}</p>
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-tight md:leading-none mb-6 group-hover:text-white transition-colors whitespace-normal break-words drop-shadow-xl">{p.title}</h3>
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] text-cyan-500/80 uppercase">{p.metric}</span>
                              <div className="w-12 h-1 bg-white/20 group-hover:bg-cyan-500 transition-all duration-500 group-hover:w-24 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
      </section>

      {/* 7. SKILLS - MATRIX STYLE */}
      <section className="py-40 px-6 md:px-20 bg-black relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-20 xl:gap-40">
              <div className="reveal-up">
                  <h2 className="text-6xl md:text-[8rem] font-black leading-none uppercase italic border-l-[10px] border-cyan-500 pl-8">CORE<br/>STACK</h2>
                  <p className="mt-8 font-mono text-xs text-gray-400 tracking-[0.3em] uppercase leading-loose max-w-md">The foundations of digital architecture. Every tool verified and deployed in high-load environments.</p>
              </div>
              <div className="space-y-16">
                  {Object.entries(ProfileData.skills).map(([cat, list], i) => (
                      <div key={i} className="group reveal-up">
                          <p className="font-mono text-[10px] md:text-xs text-cyan-500 mb-4 uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
                              0{i+1} {"//"} {cat}
                          </p>
                          <div className="flex flex-wrap gap-3">
                              {list.map(s => (
                                  <div 
                                    key={s} 
                                    className="hover-target px-5 py-3 border border-white/10 text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-bold text-lg md:text-xl uppercase italic cursor-none"
                                  >
                                      {s}
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 8. EXPERIENCE - PERSPECTIVE LIST */}
      <section className="py-20 md:py-40 px-6 md:px-20 border-t border-white/10 bg-[#020202] relative z-10 overflow-hidden">
          <h2 className="reveal-up text-3xl md:text-5xl font-mono text-cyan-500 mb-20 md:mb-32 tracking-[0.3em] md:tracking-[1em] text-center opacity-70 uppercase">Chronicle_Logs</h2>
          
          <div className="max-w-5xl mx-auto relative border-l border-white/10 py-10">
              {ProfileData.experience.map((exp, i) => (
                  <div key={i} className="exp-block group relative pl-8 md:pl-16 mb-32 md:mb-40 last:mb-0">
                      
                      {/* Timeline Dot */}
                      <div className="absolute top-0 -left-[5px] w-[11px] h-[11px] bg-black border-2 border-cyan-500 rounded-full group-hover:bg-cyan-500 group-hover:shadow-[0_0_15px_#06b6d4] transition-all duration-500" />
                      
                      {/* Giant Background Parallax Text */}
                      <div className="exp-bg-text absolute top-10 left-10 md:left-20 text-[15vw] md:text-[10vw] font-black text-white opacity-[0.02] group-hover:opacity-[0.04] transition-opacity leading-none pointer-events-none uppercase italic select-none whitespace-nowrap">
                          {exp.company.split(' ')[0]}
                      </div>

                      <div className="exp-content relative z-10">
                          <div className="mb-6">
                              <p className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 font-mono mb-4 text-xs md:text-sm tracking-widest">{exp.period}</p>
                              <h3 className="text-2xl md:text-3xl font-bold uppercase text-gray-300 group-hover:text-white transition-colors">{exp.company}</h3>
                          </div>
                          
                          <h4 className="hover-target text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 uppercase text-white group-hover:text-cyan-400 transition-colors duration-500">{exp.role}</h4>
                          
                          <ul className="space-y-4 max-w-3xl">
                              {exp.bullets.map((b, idx) => (
                                  <li key={idx} className="exp-bullet flex items-start gap-4 text-base md:text-lg font-light text-gray-400 hover:text-white transition-colors italic">
                                      <span className="text-cyan-500 font-mono opacity-60 mt-1">[{idx+1}]</span> 
                                      <span className="leading-relaxed">{b}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* 8.5. EDUCATION - GRID */}
      <section className="py-20 md:py-40 px-6 md:px-20 border-t border-white/10 bg-black relative z-10">
          <h2 className="reveal-up text-3xl md:text-5xl font-mono text-cyan-500 mb-20 md:mb-32 tracking-[0.3em] md:tracking-[1em] text-center opacity-70 uppercase">ACADEMIC_DATA</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              {ProfileData.education.map((edu, i) => (
                  <div key={i} className="reveal-up p-8 md:p-12 border border-white/10 hover:border-cyan-500/50 bg-[#050505] group transition-all duration-500 hover:-translate-y-2 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors duration-700" />
                      <p className="text-cyan-500 font-mono mb-4 text-xs md:text-sm tracking-widest uppercase">{edu.status} {"//"} {edu.location}</p>
                      <h3 className="text-3xl md:text-4xl font-black uppercase text-white mb-6 leading-tight">{edu.degree}</h3>
                      <div className="w-12 h-[1px] bg-cyan-500 mb-6" />
                      <p className="text-lg md:text-xl font-light text-gray-400 italic">{edu.institution}</p>
                  </div>
              ))}
          </div>
      </section>

      {/* 9. CONTACT - MASSIVE CALL TO ACTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-cyan-500 text-black relative overflow-hidden z-10">
          {/* Subtle background pulsing */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-50 mix-blend-overlay"></div>
          
          <MagneticElement className="relative z-10 reveal-up">
            <h2 className="hover-target text-6xl md:text-[16vw] font-black leading-[0.75] tracking-tighter uppercase italic select-none hover:tracking-[-0.02em] transition-all duration-700">
                INITIATE<br/>ORIGIN
            </h2>
          </MagneticElement>
          
          <div className="mt-32 md:mt-40 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 w-full max-w-6xl text-left border-t-4 border-black pt-16 relative z-10 reveal-up">
              <div className="group">
                  <p className="font-mono text-[10px] md:text-xs mb-4 uppercase tracking-widest opacity-60 font-bold">Direct_Uplink</p>
                  <a 
                    href={`mailto:${ProfileData.email}`} 
                    className="hover-target text-2xl md:text-5xl lg:text-6xl font-black hover:bg-black hover:text-cyan-500 px-4 py-2 -ml-4 transition-colors uppercase italic inline-block cursor-none"
                  >
                    EMAIL_SYSTEM
                  </a>
              </div>
              <div className="md:text-right space-y-6">
                  <p className="font-mono text-[10px] md:text-xs mb-4 uppercase tracking-widest opacity-60 font-bold">Protocol_Network</p>
                  <div className="flex flex-col gap-3">
                    <a 
                      href={`https://${ProfileData.socials.linkedin}`} 
                      className="hover-target text-2xl md:text-4xl font-black hover:underline uppercase inline-block cursor-none"
                    >
                      Linkedin_Port
                    </a>
                    <a 
                      href={`https://${ProfileData.socials.github}`} 
                      className="hover-target text-2xl md:text-4xl font-black hover:underline uppercase inline-block cursor-none"
                    >
                      Github_Node
                    </a>
                  </div>
              </div>
          </div>
      </section>

      <footer className="py-8 px-6 text-center font-mono text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.5em] bg-black">
          Handcrafted // V.4.0.2 // Aditya Devmurari Architect // {new Date().getFullYear()}
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideRight {
            from { transform: translateX(-100%); }
            to { transform: translateX(400%); }
        }
        .transform-style-3d {
            transform-style: preserve-3d;
        }
      `}} />
    </div>
  );
}
