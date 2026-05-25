"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CyberName } from "../../components/CyberName";

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
    frameworks: ["React.js", "Next.js", "Node.js", "Tailwind CSS", "FastAPI"],
    "AI/ML & Web3": ["Machine Learning", "NLP", "AI Agents", "Solidity", "Smart Contracts", "Scikit-learn"],
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
      role: "Full Stack Developer Intern",
      company: "Aksharraj Infotech",
      period: "Feb 2026 – Apr 2026",
      bullets: [
        "Worked on end-to-end development of ETH.VOTE, bridging traditional web systems with decentralised blockchain logic.",
        "Developed secure blockchain-based voting features and implemented cryptography standards to protect user data.",
        "Collaborated in daily agile sprints to fix bugs and improve overall application performance."
      ]
    },
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
      status: "Completed",
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
    { title: "DigiVault", tech: "Web/Security", metric: "Vault", link: "https://github.com/YogeshTundiya/Digivualt" },
    { title: "Gym Pro System", tech: "Full Stack", metric: "Management", link: "https://github.com/YogeshTundiya/Gym_pro_system" },
    { title: "Lifeconnect", tech: "Web App", metric: "Social", link: "https://github.com/YogeshTundiya/Lifeconnect" },
    { title: "Gov Portal", tech: "Full Stack", metric: "Public Tech", link: "https://github.com/YogeshTundiya/Gov-porject" }
  ]
};

const MOCK_LOGS = [
    "SYSTEM_OS V.4.0.2 SECURE BOOT INITIATED",
    "LOADING CORE ALGORITHMS... OK",
    "ESTABLISHING SECURE SSH UPLINK...",
    "MOUNTING HOST NODE: AADITYA104/MY-PORFOLIO-",
    "COMPILING NEXT.js APP ROUTER BUNDLES...",
    "CONNECTING TO AI NEURAL NETWORKS... VERIFIED",
    "ANALYZING SECURITY PROTOCOLS... STABLE",
    "PARSING FULL STACK R&D DEPLOYMENTS...",
    "SYNCHRONIZING REPOSITORIES...",
    "OPTIMIZING RENDERING METRICS... SUCCESS",
    "AUTHORIZING ADITYA DEVMURARI DEVELOPER ACCESS...",
    "GRANTING SYSTEM DRIVER INJECTION...",
    "DEPLOYING FRONTEND INTERFACE HUD...",
];

// 1. DUAL-PANEL CYBERNETIC OS CORE DIAGNOSTICS HUD LOADER
const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");
    const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
    const [isExiting, setIsExiting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const shutterTopRef = useRef<HTMLDivElement>(null);
    const shutterBottomRef = useRef<HTMLDivElement>(null);
    const coreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const duration = 2000;
        const intervalTime = 20;
        const totalSteps = duration / intervalTime;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const currentProgress = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
            setProgress(currentProgress);

            if (currentProgress < 20) setStatusText("INITIALIZING SYSTEM DIAGNOSTICS...");
            else if (currentProgress < 40) setStatusText("ESTABLISHING SECURE PORT SYNC...");
            else if (currentProgress < 60) setStatusText("LOADING FRONTEND REPOS AND COMPONENTS...");
            else if (currentProgress < 85) setStatusText("CONNECTING SECURE CLOUD NODES...");
            else if (currentProgress < 98) setStatusText("DECRYPTING INTERFACE STACK...");
            else setStatusText("ACCESS GRANTED. BOOT COMPLETE.");

            const logIdx = Math.floor((currentProgress / 100) * MOCK_LOGS.length);
            setConsoleLogs(MOCK_LOGS.slice(0, logIdx + 1));

            if (currentProgress >= 100) {
                clearInterval(interval);
                
                setTimeout(() => {
                    setIsExiting(true);
                    
                    const tl = gsap.timeline({
                        onComplete: onComplete
                    });

                    tl.to(coreRef.current, {
                        scale: 1.8,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.inOut"
                    });
                    
                    tl.to(shutterTopRef.current, {
                        yPercent: -100,
                        duration: 0.8,
                        ease: "power4.inOut"
                    }, "-=0.4");

                    tl.to(shutterBottomRef.current, {
                        yPercent: 100,
                        duration: 0.8,
                        ease: "power4.inOut"
                    }, "-=0.8");
                }, 400);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[10000] overflow-hidden bg-black select-none font-mono text-cyan-500">
            {/* Top Shutter */}
            <div 
              ref={shutterTopRef} 
              className="absolute top-0 left-0 w-full h-1/2 bg-[#020202] border-b border-cyan-500/30 flex flex-col justify-end p-8 overflow-hidden z-25"
            >
                <div className="absolute inset-0 opacity-[0.05] cyber-grid-animate" style={{
                    backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }} />
                
                <div className="flex justify-between items-center text-[10px] opacity-60 relative z-10">
                    <span>HOST: AADITYA104_MY_PORTFOLIO</span>
                    <span>SECURE BOOT // ENG V4.0.2</span>
                </div>
            </div>

            {/* Bottom Shutter */}
            <div 
              ref={shutterBottomRef} 
              className="absolute bottom-0 left-0 w-full h-1/2 bg-[#020202] border-t border-cyan-500/30 p-8 overflow-hidden z-25"
            >
                <div className="absolute inset-0 opacity-[0.05] cyber-grid-animate" style={{
                    backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }} />

                <div className="flex justify-between items-center text-[10px] opacity-60 mb-6 relative z-10">
                    <span>KERNEL: CONNECTED_SECURE</span>
                    <span>CPU_ALLOC: AUTO_NODE</span>
                </div>

                <div className="max-w-xl mx-auto w-full relative z-10">
                    <div className="flex justify-between text-[10px] mb-2 font-bold uppercase tracking-wider">
                        <span className="animate-pulse">{statusText}</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-black border border-cyan-500/20 rounded overflow-hidden p-[2px]">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_#06b6d4] transition-all duration-75"
                          style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Diagnostics HUD Overlay */}
            {!isExiting && (
                <div className="absolute inset-0 z-20 flex flex-col md:grid md:grid-cols-3 p-10 pt-24 pb-24 items-center gap-6 justify-center">
                    {/* Left Panel */}
                    <div className="w-full h-[200px] md:h-[350px] overflow-hidden border border-cyan-500/10 bg-black/40 backdrop-blur p-4 rounded text-[9px] text-cyan-400/80 leading-relaxed font-mono flex flex-col-reverse justify-start">
                        <div className="space-y-1">
                            {consoleLogs.map((log, idx) => (
                                <div key={idx} className="truncate">
                                    <span className="text-cyan-600 font-bold pr-2">&gt;</span>{log}
                                </div>
                            ))}
                            <div className="w-2 h-3.5 bg-cyan-400 animate-pulse inline-block" />
                        </div>
                    </div>

                    {/* Center Core */}
                    <div ref={coreRef} className="flex flex-col items-center justify-center p-6 relative">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <div className="absolute text-center">
                                <span className="text-4xl md:text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_#06b6d4]">{progress}%</span>
                                <div className="text-[7px] text-cyan-400/60 uppercase tracking-widest mt-1 font-bold">AI_CORE_READY</div>
                            </div>
                            <svg className="absolute w-full h-full text-cyan-500 animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 3" />
                            </svg>
                            <svg className="absolute w-[80%] h-[80%] text-cyan-400 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="15 8" />
                            </svg>
                            <div className="absolute w-[70%] h-[70%] border border-cyan-500/10 rounded-full bg-cyan-500/[0.02] shadow-[0_0_30px_rgba(6,182,212,0.15)] animate-pulse" />
                        </div>
                        <div className="text-[10px] text-white font-bold tracking-[0.4em] uppercase mt-6 text-center select-none">
                            ADITYA_DEVMURARI_OS
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="w-full h-[200px] md:h-[350px] border border-cyan-500/10 bg-black/40 backdrop-blur p-6 rounded flex flex-col justify-around text-xs leading-none">
                        <div className="text-[10px] font-bold border-b border-cyan-500/20 pb-2 mb-2 tracking-widest uppercase">
                            SYSTEM_HARDWARE_METERS
                        </div>
                        {[
                            { name: "CPU CORE LOAD", val: Math.min(progress * 1.1, 88) },
                            { name: "MEMORY BUFFER", val: Math.min(progress * 0.9 + 10, 94) },
                            { name: "NETWORK NODE RATE", val: Math.min(progress * 1.3, 100) },
                            { name: "GPU SHADER CACHE", val: Math.min(progress * 0.7, 72) },
                        ].map((m, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-[9px] tracking-wider uppercase opacity-80">
                                    <span>{m.name}</span>
                                    <span>{Math.round(m.val)}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-black border border-cyan-500/10 p-[1px] rounded overflow-hidden">
                                    <div 
                                      className="h-full bg-cyan-500 transition-all duration-300 shadow-[0_0_5px_#06b6d4]" 
                                      style={{ width: `${m.val}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================================
// 2. PROJECT CARD BACKGROUND ANIMATIONS (Stunning Cyber-OS HUD System)
// ============================================================
const PROJECT_THEMES = [
  { // 0: AI Threat Detection
    primary: "rgb(239, 68, 68)", // Red
    glow: "rgba(239, 68, 68, 0.15)",
    bgGrad: "from-red-950/20 via-black to-black",
    orb1: "bg-red-500/10",
    orb2: "bg-rose-500/5",
    accent: "text-red-500"
  },
  { // 1: Blockchain Voting
    primary: "rgb(99, 102, 241)", // Indigo
    glow: "rgba(99, 102, 241, 0.15)",
    bgGrad: "from-indigo-950/20 via-black to-black",
    orb1: "bg-indigo-500/10",
    orb2: "bg-violet-500/5",
    accent: "text-indigo-400"
  },
  { // 2: Healthcare Chatbot
    primary: "rgb(16, 185, 129)", // Emerald
    glow: "rgba(16, 185, 129, 0.15)",
    bgGrad: "from-emerald-950/20 via-black to-black",
    orb1: "bg-emerald-500/10",
    orb2: "bg-teal-500/5",
    accent: "text-emerald-400"
  },
  { // 3: Fake News Detection
    primary: "rgb(6, 182, 212)", // Cyan
    glow: "rgba(6, 182, 212, 0.15)",
    bgGrad: "from-cyan-950/20 via-black to-black",
    orb1: "bg-cyan-500/10",
    orb2: "bg-sky-500/5",
    accent: "text-cyan-400"
  },
  { // 4: Dynamic Face Lift
    primary: "rgb(13, 148, 136)", // Teal
    glow: "rgba(13, 148, 136, 0.15)",
    bgGrad: "from-teal-950/20 via-black to-black",
    orb1: "bg-teal-500/10",
    orb2: "bg-emerald-500/5",
    accent: "text-teal-400"
  },
  { // 5: NetGuard
    primary: "rgb(245, 158, 11)", // Amber
    glow: "rgba(245, 158, 11, 0.15)",
    bgGrad: "from-amber-950/20 via-black to-black",
    orb1: "bg-amber-500/10",
    orb2: "bg-orange-500/5",
    accent: "text-amber-500"
  },
  { // 6: Portfolio Kinju
    primary: "rgb(236, 72, 153)", // Pink
    glow: "rgba(236, 72, 153, 0.15)",
    bgGrad: "from-pink-950/20 via-black to-black",
    orb1: "bg-pink-500/10",
    orb2: "bg-fuchsia-500/5",
    accent: "text-pink-400"
  },
  { // 7: InspectFlow Sync
    primary: "rgb(139, 92, 246)", // Violet
    glow: "rgba(139, 92, 246, 0.15)",
    bgGrad: "from-violet-950/20 via-black to-black",
    orb1: "bg-violet-500/10",
    orb2: "bg-purple-500/5",
    accent: "text-violet-400"
  },
  { // 8: CXBulk
    primary: "rgb(244, 63, 94)", // Rose
    glow: "rgba(244, 63, 94, 0.15)",
    bgGrad: "from-rose-950/20 via-black to-black",
    orb1: "bg-rose-500/10",
    orb2: "bg-pink-500/5",
    accent: "text-rose-400"
  },
  { // 9: Codexservice
    primary: "rgb(132, 204, 22)", // Lime
    glow: "rgba(132, 204, 22, 0.15)",
    bgGrad: "from-lime-950/20 via-black to-black",
    orb1: "bg-lime-500/10",
    orb2: "bg-green-500/5",
    accent: "text-lime-400"
  },
  { // 10: QR Code Page
    primary: "rgb(14, 165, 233)", // Sky
    glow: "rgba(14, 165, 233, 0.15)",
    bgGrad: "from-sky-950/20 via-black to-black",
    orb1: "bg-sky-500/10",
    orb2: "bg-blue-500/5",
    accent: "text-sky-400"
  },
  { // 11: Digivualt
    primary: "rgb(234, 179, 8)", // Gold
    glow: "rgba(234, 179, 8, 0.15)",
    bgGrad: "from-yellow-950/20 via-black to-black",
    orb1: "bg-yellow-500/10",
    orb2: "bg-amber-500/5",
    accent: "text-yellow-400"
  },
  { // 12: Gym Pro System
    primary: "rgb(249, 115, 22)", // Orange
    glow: "rgba(249, 115, 22, 0.15)",
    bgGrad: "from-orange-950/20 via-black to-black",
    orb1: "bg-orange-500/10",
    orb2: "bg-red-500/5",
    accent: "text-orange-400"
  },
  { // 13: Lifeconnect
    primary: "rgb(244, 63, 94)", // Rose
    glow: "rgba(244, 63, 94, 0.15)",
    bgGrad: "from-rose-950/20 via-black to-black",
    orb1: "bg-rose-500/10",
    orb2: "bg-indigo-500/5",
    accent: "text-rose-400"
  },
  { // 14: Gov Project
    primary: "rgb(59, 130, 246)", // Blue
    glow: "rgba(59, 130, 246, 0.15)",
    bgGrad: "from-blue-950/20 via-black to-black",
    orb1: "bg-blue-500/10",
    orb2: "bg-amber-500/5",
    accent: "text-blue-400"
  }
];

const ProjectBg = ({ index }: { index: number }) => {
  const theme = PROJECT_THEMES[index % PROJECT_THEMES.length];
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(p => !p);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Unique Dynamic Telemetry widgets for each card
  const renderTelemetry = () => {
    switch (index) {
      case 0: // AI Threat Detection - Threat Coordinates + Circular Radar Sweep
        return (
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 select-none opacity-40 group-hover:opacity-85 transition-opacity duration-500">
            <svg className="w-32 h-32 text-red-500/40 group-hover:text-red-500/80 transition-colors duration-500 animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 50 5 A 45 45 0 0 1 95 50 L 50 50 Z" fill="url(#radar-sweep)" />
              <defs>
                <radialGradient id="radar-sweep" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mt-4 font-mono text-[9px] text-red-500/80 space-y-1 text-center bg-black/60 p-2 border border-red-500/20 backdrop-blur-sm rounded">
              <div className="flex justify-between gap-4"><span>LOC_X: 47.92</span><span>LOC_Y: 19.34</span></div>
              <div className="text-[8px] animate-pulse text-red-400 font-bold">● SYSTEM_ALERT: INTRUSION_PREVENTED</div>
            </div>
          </div>
        );
      case 1: // Blockchain Voting - Hexagonal cluster block chain
        return (
          <div className="absolute inset-0 flex justify-center items-center opacity-40 group-hover:opacity-80 transition-opacity duration-500">
            <svg className="w-36 h-36 text-indigo-500/40 group-hover:text-indigo-400/80 transition-colors" viewBox="0 0 100 100">
              {/* Floating hex modules */}
              <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <polygon points="50,30 70,41.5 70,65 50,76.5 30,65 30,41.5" fill="none" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="15" x2="50" y2="30" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="32.5" x2="70" y2="41.5" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="67.5" x2="70" y2="65" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="85" x2="50" y2="76.5" stroke="currentColor" strokeWidth="1" />
              <line x1="20" y1="67.5" x2="30" y2="65" stroke="currentColor" strokeWidth="1" />
              <line x1="20" y1="32.5" x2="30" y2="41.5" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div className="absolute font-mono text-[8px] text-indigo-400/70 bottom-8 left-8 right-8 bg-black/60 p-2 border border-indigo-500/10 backdrop-blur-sm rounded">
              <div className="truncate">BLOCK_HASH: 0x9f7...28d4</div>
              <div className="flex justify-between mt-1"><span>NONCE: 108342</span><span className="text-emerald-400">SYNCED ✓</span></div>
            </div>
          </div>
        );
      case 2: // Healthcare Chatbot - Beating EKG Heartbeat Line
        return (
          <div className="absolute inset-0 flex flex-col justify-center p-6 opacity-45 group-hover:opacity-85 transition-opacity duration-500">
            <svg className="w-full h-24 text-emerald-500" viewBox="0 0 200 60">
              <path
                d="M 0 30 L 40 30 L 48 10 L 54 50 L 60 30 L 80 30 L 85 30 L 92 5 L 98 55 L 105 30 L 140 30 L 146 15 L 152 45 L 158 30 L 200 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="400"
                strokeDashoffset={pulse ? "0" : "400"}
                className="transition-all duration-[2000ms] ease-in-out"
              />
            </svg>
            <div className="font-mono text-[9px] text-emerald-400 bg-black/55 p-2 rounded border border-emerald-500/10 self-start mt-2">
              <div className="flex gap-4"><span>HR: 74 BPM</span><span>SpO2: 99%</span><span>SYS_STATUS: ACTIVE</span></div>
            </div>
          </div>
        );
      case 3: // Fake News Detection - NLP vector logs
        return (
          <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-40 group-hover:opacity-80 transition-opacity duration-500 font-mono text-[9px] text-cyan-400 space-y-1.5 bg-gradient-to-t from-black/80 via-transparent">
            <div className="border-l-2 border-cyan-500 pl-2 py-1 space-y-1 bg-black/40 backdrop-blur-sm">
              <div className="text-[8px] opacity-60">SYSTEM_NLP_VECTORS:</div>
              <div className="truncate">[VEC_01]: [0.24, -0.89, 0.43, 0.12]</div>
              <div className="truncate">[VEC_02]: [-0.15, 0.54, 0.77, -0.32]</div>
              <div className="flex justify-between items-center text-cyan-300 font-bold text-[8px] pt-1 border-t border-cyan-500/10">
                <span>SIMILARITY_SCORE: 0.941</span>
                <span className="text-emerald-400">CREDIBILITY_VALID</span>
              </div>
            </div>
          </div>
        );
      case 4: // Dynamic Face Lift - 3D Geometric Mesh Nodal points
        return (
          <div className="absolute inset-0 flex justify-center items-center opacity-35 group-hover:opacity-75 transition-opacity duration-500">
            <svg className="w-40 h-40 text-teal-500" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              <g className="animate-pulse">
                {/* Face landmarks */}
                <circle cx="35" cy="40" r="2" fill="currentColor" />
                <circle cx="65" cy="40" r="2" fill="currentColor" />
                <circle cx="50" cy="55" r="2.5" fill="currentColor" />
                <circle cx="35" cy="65" r="2" fill="currentColor" />
                <circle cx="65" cy="65" r="2" fill="currentColor" />
                <circle cx="50" cy="72" r="2" fill="currentColor" />
                {/* Connecting mesh lines */}
                <line x1="35" y1="40" x2="50" y2="55" stroke="currentColor" strokeWidth="0.5" />
                <line x1="65" y1="40" x2="50" y2="55" stroke="currentColor" strokeWidth="0.5" />
                <line x1="35" y1="40" x2="35" y2="65" stroke="currentColor" strokeWidth="0.5" />
                <line x1="65" y1="40" x2="65" y2="65" stroke="currentColor" strokeWidth="0.5" />
                <line x1="35" y1="65" x2="50" y2="55" stroke="currentColor" strokeWidth="0.5" />
                <line x1="65" y1="65" x2="50" y2="55" stroke="currentColor" strokeWidth="0.5" />
                <line x1="35" y1="65" x2="50" y2="72" stroke="currentColor" strokeWidth="0.5" />
                <line x1="65" y1="65" x2="50" y2="72" stroke="currentColor" strokeWidth="0.5" />
              </g>
            </svg>
          </div>
        );
      case 5: // NetGuard - Firewall Shield Hologram
        return (
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-40 group-hover:opacity-85 transition-opacity duration-500">
            <svg className="w-32 h-32 text-amber-500 animate-pulse" viewBox="0 0 100 100">
              <path d="M50,15 L80,25 L80,55 C80,75 50,88 50,88 C50,88 20,75 20,55 L20,25 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M50,22 L73,30 L73,53 C73,69 50,80 50,80 C50,80 27,69 27,53 L27,30 Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div className="font-mono text-[8px] text-amber-500/80 bg-black/60 p-1.5 border border-amber-500/20 backdrop-blur-sm rounded mt-2 uppercase">
              SHIELD_STATUS: HARDENED_PROT
            </div>
          </div>
        );
      case 6: // Portfolio Kinju - Neon Floating cubes
        return (
          <div className="absolute inset-0 flex justify-center items-center opacity-30 group-hover:opacity-75 transition-opacity duration-500">
            <div className="relative w-40 h-40 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute top-4 left-4 w-12 h-12 border border-pink-500/30 group-hover:border-pink-500/60 rounded transform rotate-12 transition-all" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border border-fuchsia-500/30 group-hover:border-fuchsia-500/60 rounded transform -rotate-45 transition-all" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-pink-500 rounded animate-pulse" />
            </div>
          </div>
        );
      case 7: // InspectFlow Sync - Linear flow pipeline
        return (
          <div className="absolute inset-0 flex flex-col justify-center p-8 opacity-45 group-hover:opacity-85 transition-opacity duration-500 space-y-4">
            {[0, 1, 2].map(n => (
              <div key={n} className="w-full relative h-1 bg-violet-950 rounded overflow-hidden">
                <div 
                  className="absolute top-0 bottom-0 w-8 bg-violet-400 shadow-[0_0_8px_rgb(139,92,246)] rounded sweep-animate" 
                  style={{ animationDelay: `${n * 1.5}s`, animationDuration: '4s' }}
                />
              </div>
            ))}
            <div className="font-mono text-[8px] text-violet-400 bg-black/55 p-1 rounded border border-violet-500/10 self-start">
              DATA_SYNC_PIPELINE: STREAM_OK
            </div>
          </div>
        );
      case 8: // CXBulk - Bouncing dynamic DB scaling chart bar charts
        return (
          <div className="absolute inset-0 flex items-end justify-around p-8 opacity-40 group-hover:opacity-85 transition-opacity duration-500">
            {[45, 80, 55, 90, 70, 40].map((h, i) => (
              <div key={i} className="w-4 bg-rose-950/40 border border-rose-500/20 rounded-t overflow-hidden flex flex-col justify-end" style={{ height: '70%' }}>
                <div 
                  className="w-full bg-gradient-to-t from-rose-600 to-rose-400 shadow-[0_0_8px_rgb(244,63,94)] transition-all duration-[1000ms] ease-out" 
                  style={{ height: pulse ? `${h}%` : `${h - 25}%` }}
                />
              </div>
            ))}
          </div>
        );
      case 9: // Codexservice - Console brackets terminal typing
        return (
          <div className="absolute inset-0 p-6 flex flex-col justify-center opacity-40 group-hover:opacity-85 transition-opacity duration-500 font-mono text-[10px] text-lime-400 space-y-1">
            <div className="text-[8px] text-lime-500/50"># API_GATEWAY_CONSOLE</div>
            <div className="flex items-center gap-1"><span>&gt; GET /api/v1/services</span><span className="w-1.5 h-3.5 bg-lime-400 animate-pulse" /></div>
            <div className="text-lime-300">{"{ status: \"200 OK\", latency: \"14ms\" }"}</div>
            <div className="text-lime-500/70">&gt; DATABASE CONNECTED [POOL_OK]</div>
          </div>
        );
      case 10: // QR Code Page - scanner align target layout
        return (
          <div className="absolute inset-0 flex justify-center items-center opacity-35 group-hover:opacity-75 transition-opacity duration-500">
            <svg className="w-36 h-36 text-sky-500" viewBox="0 0 100 100">
              {/* Corner brackets inside the SVG */}
              <path d="M 15 30 L 15 15 L 30 15" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 85 30 L 85 15 L 70 15" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 15 70 L 15 85 L 30 85" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 85 70 L 85 85 L 70 85" fill="none" stroke="currentColor" strokeWidth="2" />
              {/* Center scan line */}
              <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
            </svg>
          </div>
        );
      case 11: // Digivault - Locker concentric rings rotating
        return (
          <div className="absolute inset-0 flex justify-center items-center opacity-35 group-hover:opacity-80 transition-opacity duration-500">
            <svg className="w-36 h-36 text-yellow-500" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="30 10" className="animate-spin" style={{ animationDuration: '10s' }} />
              <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="15 5" className="animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
              <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
              <text x="50" y="54" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="bold">🔒</text>
            </svg>
          </div>
        );
      case 12: // Gym Pro System - Workout concentric progress ring meters
        return (
          <div className="absolute inset-0 flex justify-center items-center opacity-35 group-hover:opacity-80 transition-opacity duration-500">
            <svg className="w-32 h-32 text-orange-500" viewBox="0 0 100 100">
              {/* Concentric progress rings */}
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="4" strokeOpacity="0.1" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="220" strokeDashoffset={pulse ? "60" : "120"} className="transition-all duration-[1500ms]" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="4" strokeOpacity="0.1" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="160" strokeDashoffset={pulse ? "90" : "30"} className="transition-all duration-[1500ms]" />
            </svg>
          </div>
        );
      case 13: // Lifeconnect - Interconnected web mesh net nodes
        return (
          <div className="absolute inset-0 flex justify-center items-center opacity-40 group-hover:opacity-80 transition-opacity duration-500">
            <svg className="w-40 h-40 text-rose-400" viewBox="0 0 100 100">
              <g className="animate-pulse">
                <circle cx="20" cy="30" r="3" fill="currentColor" />
                <circle cx="80" cy="30" r="3" fill="currentColor" />
                <circle cx="50" cy="50" r="4.5" fill="currentColor" />
                <circle cx="30" cy="75" r="3" fill="currentColor" />
                <circle cx="70" cy="75" r="3" fill="currentColor" />
                {/* connections */}
                <line x1="20" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="0.8" />
                <line x1="80" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="0.8" />
                <line x1="30" y1="75" x2="50" y2="50" stroke="currentColor" strokeWidth="0.8" />
                <line x1="70" y1="75" x2="50" y2="50" stroke="currentColor" strokeWidth="0.8" />
                <line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="30" y1="75" x2="70" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              </g>
            </svg>
          </div>
        );
      case 14: // Gov Project - Holographic revolving star emblem
        return (
          <div className="absolute inset-0 flex justify-center items-center opacity-40 group-hover:opacity-80 transition-opacity duration-500">
            <svg className="w-36 h-36 text-blue-500 animate-spin" style={{ animationDuration: '24s' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
              {/* Geometric star */}
              <polygon points="50,20 58,38 78,38 62,50 68,68 50,56 32,68 38,50 22,38 42,38" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 z-0 bg-gradient-to-br ${theme.bgGrad} overflow-hidden select-none transition-all duration-500 group-hover:scale-105`}>
      {/* 1. Underlying animated grid backdrop */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-overlay cyber-grid-animate"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${theme.primary} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme.primary} 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      {/* 2. Floating blur neon orbs */}
      <div className={`absolute top-1/4 left-1/4 w-40 h-40 rounded-full blur-[60px] opacity-35 ${theme.orb1} orb-float-1-animate`} />
      <div className={`absolute bottom-1/4 right-1/4 w-36 h-36 rounded-full blur-[50px] opacity-25 ${theme.orb2} orb-float-2-animate`} />

      {/* 3. Concentric glowing scanlines */}
      <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${theme.accent.split('-')[1]}-500 to-transparent opacity-0 group-hover:opacity-100 scanline-animate transition-opacity duration-300 shadow-[0_0_12px_${theme.primary}]`} />

      {/* 4. Glassmorphism HUD corners */}
      <div className="absolute inset-4 pointer-events-none border border-white/[0.03] group-hover:border-cyan-500/10 transition-colors duration-500">
        {/* Top-Left */}
        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${theme.accent} opacity-30 group-hover:opacity-100 transition-opacity`} />
        {/* Top-Right */}
        <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${theme.accent} opacity-30 group-hover:opacity-100 transition-opacity`} />
        {/* Bottom-Left */}
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${theme.accent} opacity-30 group-hover:opacity-100 transition-opacity`} />
        {/* Bottom-Right */}
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${theme.accent} opacity-30 group-hover:opacity-100 transition-opacity`} />
      </div>

      {/* 5. Custom Dynamic Telemetry Dashboard Widget */}
      {renderTelemetry()}

      {/* 6. Dynamic matrix scanning status info lines at the top */}
      <div className="absolute top-6 left-6 right-6 flex justify-between font-mono text-[8px] opacity-45 group-hover:opacity-90 transition-opacity text-white/50">
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${theme.primary === 'rgb(239, 68, 68)' ? 'bg-red-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
          STATUS_OK // ENGINE_SYS_V4
        </span>
        <span>SYS_CORE_SECURE_OS</span>
      </div>
    </div>
  );
};

const GetCardAnimation = (_tech: string, index: number) => <ProjectBg index={index} />;

// ============================================================
// 3.PLACEHOLDER (was GeometricFloat end marker)
// ============================================================
const _placeholder = 0; void _placeholder;

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

// ============================================================
// 3.5 DYNAMIC ANIMATING HELPER COMPONENTS
// ============================================================

// High-speed HUD Rolling Count Up Stat card
const StatCard = ({ label, value }: { label: string; value: string }) => {
    const [displayVal, setDisplayVal] = useState("0");
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const numericMatch = value.match(/\d+/);
                    if (numericMatch) {
                        const target = parseInt(numericMatch[0]);
                        const suffix = value.replace(numericMatch[0], "");
                        
                        let current = 0;
                        const duration = 1200;
                        const steps = 40;
                        const stepTime = duration / steps;
                        const increment = target / steps;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                setDisplayVal(`${target}${suffix}`);
                                clearInterval(timer);
                            } else {
                                setDisplayVal(`${Math.round(current)}${suffix}`);
                            }
                        }, stepTime);
                        
                        observer.disconnect();
                    } else {
                        setDisplayVal(value);
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, [value]);

    return (
        <div 
          ref={cardRef} 
          className="reveal-up p-8 border border-white/5 group hover:bg-cyan-500 transition-all duration-500 overflow-hidden relative hover-target"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            <p className="text-4xl md:text-6xl font-black mb-3 group-hover:text-black transition-colors duration-300">
                {displayVal}
            </p>
            <p className="text-[10px] md:text-xs font-mono text-gray-500 uppercase group-hover:text-black transition-colors duration-300">
                {label}
            </p>
        </div>
    );
};

// 3D Tilt HUD aiming reticle project card
const ProjectCard = ({ p, i }: { p: typeof ProfileData.projects[0]; i: number }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const card = cardRef.current;
        const target = targetRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rx = ((y / rect.height) - 0.5) * -15;
        const ry = ((x / rect.width) - 0.5) * 15;

        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        
        if (target) {
            target.style.left = `${x}px`;
            target.style.top = `${y}px`;
            target.style.opacity = "1";
        }
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        const target = targetRef.current;
        if (!card) return;

        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        if (target) {
            target.style.opacity = "0";
        }
    };

    return (
        <a 
          ref={cardRef}
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="hover-target w-[85vw] h-[60vh] md:w-[450px] md:h-[550px] shrink-0 bg-[#050505] text-white p-8 md:p-14 flex flex-col justify-between group transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10 hover:border-cyan-500/50 relative overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
            <div className="absolute inset-0 z-0 pointer-events-none bg-black">
                {GetCardAnimation(p.tech, i)}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            <div 
              ref={targetRef} 
              className="absolute pointer-events-none w-10 h-10 border border-cyan-500/40 rounded-full -ml-5 -mt-5 transition-opacity duration-300 opacity-0 mix-blend-screen flex items-center justify-center z-10"
              style={{ transitionProperty: "opacity" }}
            >
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                <div className="absolute w-[2px] h-3 bg-cyan-500/60" />
                <div className="absolute w-3 h-[2px] bg-cyan-500/60" />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity" />

            <div className="flex justify-between items-start relative z-10" style={{ transform: "translateZ(20px)" }}>
                <span className="font-mono text-[10px] md:text-xs opacity-50 group-hover:text-cyan-400 transition-colors bg-black/50 px-2 py-1 rounded">MODULE_{String(i+1).padStart(2, '0')}</span>
                <span className="text-3xl md:text-4xl group-hover:text-cyan-400 transition-colors transform group-hover:translate-x-2 group-hover:-translate-y-2 duration-300 drop-shadow-lg">↗</span>
            </div>
            
            <div className="relative z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-10 -mx-8 -mb-8 px-8 pb-8 md:-mx-14 md:-mb-14 md:px-14 md:pb-14" style={{ transform: "translateZ(40px)" }}>
                <p className="font-mono text-[10px] md:text-xs text-cyan-500 mb-3 uppercase drop-shadow">Tech: {p.tech}</p>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-tight md:leading-none mb-6 group-hover:text-white transition-colors whitespace-normal break-words drop-shadow-xl">{p.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-cyan-500/80 uppercase">{p.metric}</span>
                  <div className="w-12 h-1 bg-white/20 group-hover:bg-cyan-500 transition-all duration-500 group-hover:w-24 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                </div>
            </div>
        </a>
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

      if (heroContentRef.current) {
        gsap.set(heroContentRef.current, { transformPerspective: 1000 });
      }

      const rotateXTo = gsap.quickTo(heroContentRef.current, "rotateX", { duration: 1, ease: "power2.out" });
      const rotateYTo = gsap.quickTo(heroContentRef.current, "rotateY", { duration: 1, ease: "power2.out" });

      const gridXTo = gsap.quickTo(gridRef.current, "x", { duration: 1, ease: "power2.out" });
      const gridYTo = gsap.quickTo(gridRef.current, "y", { duration: 1, ease: "power2.out" });

      let lastLabelUpdate = 0;

      const handleGlobalMouseMove = (e: MouseEvent) => {
        const { clientX: x, clientY: y } = e;
        
        // Update Cursor immediately (GPU accelerated translation)
        xDot(x);
        yDot(y);
        xRing(x);
        yRing(y);
        
        // Throttle coordinate text updates to prevent layout thrashing (avoids heavy DOM reflows)
        const now = performance.now();
        if (now - lastLabelUpdate > 60) {
          if (cursorLabelRef.current) {
            cursorLabelRef.current.textContent = `X: ${Math.round(x)} Y: ${Math.round(y)}\nSYS: ONLINE`;
          }
          lastLabelUpdate = now;
        }

        // Update 3D Hero Rotation (avoids React re-renders & uses fast quickTo)
        if (heroContentRef.current) {
          const rotateY = ((x / window.innerWidth) - 0.5) * 20;
          const rotateX = ((y / window.innerHeight) - 0.5) * -20;
          rotateXTo(rotateX);
          rotateYTo(rotateY);
        }

        // Parallax Background Grid (uses fast quickTo)
        if (gridRef.current) {
          gridXTo(-x * 0.04);
          gridYTo(-y * 0.04);
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

        tl.fromTo(content, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
        tl.fromTo(bullets, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.4");
      });

      // Active Timeline Line Draw Trigger
      gsap.fromTo(".timeline-drawn-line", 
        { scaleY: 0 }, 
        { 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: ".chronicle-logs-container",
            start: "top 60%",
            end: "bottom 80%",
            scrub: true
          }
        }
      );

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
              <h1 className="text-[18vw] md:text-[12rem] font-black select-none" style={{ transform: "translateZ(100px)" }}>
                  <CyberName name={ProfileData.name} />
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
                  <StatCard key={i} label={stat.label} value={stat.value} />
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
                    <ProjectCard key={i} p={p} i={i} />
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
      <section className="chronicle-logs-container py-20 md:py-40 px-6 md:px-20 border-t border-white/10 bg-[#020202] relative z-10 overflow-hidden">
          <h2 className="reveal-up text-3xl md:text-5xl font-mono text-cyan-500 mb-20 md:mb-32 tracking-[0.3em] md:tracking-[1em] text-center opacity-70 uppercase">Chronicle_Logs</h2>
          
          <div className="max-w-5xl mx-auto relative py-10">
              {/* Underlying thin track line */}
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/10" />
              {/* Active scroll-drawn glowing line */}
              <div 
                className="absolute top-0 left-0 w-[2px] bg-gradient-to-b from-cyan-500 to-rose-500 shadow-[0_0_8px_#06b6d4] origin-top timeline-drawn-line" 
                style={{ height: "100%", transformOrigin: "top" }}
              />
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
