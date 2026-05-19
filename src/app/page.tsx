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

// ============================================================
// 2. PROJECT CARD BACKGROUND ANIMATIONS (one component, 15 unique draws)
// ============================================================
const ProjectCanvas = ({ index }: { index: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    const W = c.width, H = c.height;
    let raf: number, t = 0;

    // --- shared helpers ---
    const clr = (alpha=0.07) => { ctx.fillStyle=`rgba(0,0,0,${alpha})`; ctx.fillRect(0,0,W,H); };
    const glow = (col: string, blur=8) => { ctx.shadowColor=col; ctx.shadowBlur=blur; };
    const noGlow = () => { ctx.shadowBlur=0; };

    // 0 - AI Threat Detection: Red radar sweep + blinking targets
    const drops0 = Array.from({length:Math.floor(W/18)},()=>0);
    const targets0 = Array.from({length:5},(_,i)=>({x:40+(i*W/5),y:40+(i*30)%H}));
    // 1 - Blockchain Voting: Hex blocks chain
    // 2 - Healthcare Chatbot: EKG heartbeat
    const ekg: number[] = []; for(let i=0;i<W;i++) ekg.push(H/2);
    // 3 - Fake News Detection: Text scan lines
    // 4 - Dynamic Face Lift: Face mesh grid
    // 5 - NetGuard: Shield + firewall pulses
    // 6 - Portfolio Kinju: Neon cubes floating
    const cubes = Array.from({length:8},(_,i)=>({x:(i*73)%W,y:(i*55)%H,s:20+(i*11)%20,a:i*0.4,v:0.4+(i%4)*0.2}));
    // 7 - InspectFlow Sync: Pipeline nodes
    const pipes = Array.from({length:6},(_,i)=>({x:0,y:(i+1)*(H/7),p:0}));
    // 8 - CXBulk: Animated bar chart
    const bars = Array.from({length:10},(_,i)=>({h:(i*37)%70+20,target:(i*53)%80+20}));
    // 9 - Codexservice: Brackets typing
    const code = ["{}","[]",'</>','fn()','API','REST','POST','GET'];
    // 10 - QR Code: Pixel grid flicker
    const qr = Array.from({length:100},(_,i)=>((i*73+i*i*13)%3===0?1:0));
    // 11 - Digivualt: Vault tumbler rings
    // 12 - Gym Pro: Progress rings
    const rings = [{r:60,spd:0.01,col:'#06b6d4'},{r:45,spd:-0.015,col:'#a78bfa'},{r:30,spd:0.02,col:'#34d399'}];
    // 13 - Lifeconnect: Social particle web
    const soc = Array.from({length:20},(_,i)=>({x:(i*97)%W,y:(i*61)%H,vx:(((i*13)%7)-3)*0.4,vy:(((i*17)%7)-3)*0.4}));
    // 14 - Gov Project: Rotating star emblem

    const draw = () => {
      t += 0.03;
      switch(index) {
        case 0: { // AI Threat Detection - Red radar
          clr(0.04);
          const cx=W/2,cy=H/2,maxR=Math.min(W,H)*0.45;
          ctx.strokeStyle=`rgba(239,68,68,0.15)`; ctx.lineWidth=1;
          [0.3,0.6,1].forEach(f=>{ ctx.beginPath();ctx.arc(cx,cy,maxR*f,0,Math.PI*2);ctx.stroke(); });
          const sweep=t%( Math.PI*2);
          const grad=ctx.createConicGradient(sweep,cx,cy);
          grad.addColorStop(0,'rgba(239,68,68,0.6)'); grad.addColorStop(0.15,'rgba(239,68,68,0)');
          grad.addColorStop(1,'rgba(239,68,68,0)');
          ctx.fillStyle=grad; ctx.beginPath();ctx.arc(cx,cy,maxR,0,Math.PI*2);ctx.fill();
          targets0.forEach(tg=>{ if(Math.abs(Math.atan2(tg.y-cy,tg.x-cx)-sweep)<0.3){ glow('#ef4444',15); ctx.fillStyle='#ef4444'; ctx.beginPath();ctx.arc(tg.x,tg.y,4,0,Math.PI*2);ctx.fill();noGlow(); } });
          ctx.strokeStyle='rgba(239,68,68,0.8)'; ctx.lineWidth=2;
          ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(sweep)*maxR,cy+Math.sin(sweep)*maxR);ctx.stroke();
          break;
        }
        case 1: { // Blockchain Voting - Hex blocks
          clr(0.06);
          const hexes=[{x:W*0.2,y:H*0.4},{x:W*0.5,y:H*0.3},{x:W*0.8,y:H*0.4},{x:W*0.35,y:H*0.65},{x:W*0.65,y:H*0.65}];
          hexes.forEach((h,i)=>{
            const pulse=0.5+0.5*Math.sin(t*2+i);
            ctx.strokeStyle=`rgba(99,102,241,${0.4+pulse*0.5})`;
            glow('#6366f1',10*pulse); ctx.lineWidth=2;
            ctx.beginPath();
            for(let s=0;s<6;s++){const a=s*Math.PI/3;s===0?ctx.moveTo(h.x+25*Math.cos(a),h.y+25*Math.sin(a)):ctx.lineTo(h.x+25*Math.cos(a),h.y+25*Math.sin(a));}
            ctx.closePath();ctx.stroke();
            ctx.fillStyle=`rgba(99,102,241,${0.1+pulse*0.1})`;ctx.fill();
            noGlow();
          });
          hexes.forEach((a,i)=>{ if(i<hexes.length-1){const b=hexes[i+1]; ctx.strokeStyle='rgba(99,102,241,0.3)';ctx.lineWidth=1;ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.setLineDash([]);} });
          break;
        }
        case 2: { // Healthcare Chatbot - EKG heartbeat
          clr(0.08);
          for(let i=ekg.length-1;i>0;i--) ekg[i]=ekg[i-1];
          const pos=Math.floor(t*30)%60;
          ekg[0]= pos<5? H/2-80*Math.sin(pos*Math.PI/5) : pos<8? H/2+40*Math.sin((pos-5)*Math.PI/3) : H/2;
          ctx.strokeStyle='#34d399'; ctx.lineWidth=2;
          glow('#34d399',10);
          ctx.beginPath();
          ekg.forEach((y,i)=>i===0?ctx.moveTo(W-i*2,y):ctx.lineTo(W-i*2,y));
          ctx.stroke(); noGlow();
          ctx.fillStyle='#34d399'; ctx.font='11px monospace';
          ctx.fillText('PULSE: 72 BPM',10,20); ctx.fillText('O2: 98%',10,38);
          break;
        }
        case 3: { // Fake News Detection - Text scan
          clr(0.05);
          const lines=['ANALYZING: input_text_v2.txt','CHECKING SOURCE CREDIBILITY...','BIAS SCORE: 0.12','NLP VECTORS: MATCHING...','VERDICT: FALSE ✗','CONFIDENCE: 97.3%'];
          lines.forEach((l,i)=>{
            const alpha=0.3+0.7*Math.abs(Math.sin(t+i));
            ctx.fillStyle=i===4?`rgba(239,68,68,${alpha})`:`rgba(6,182,212,${alpha})`;
            ctx.font='11px monospace';
            ctx.fillText(l,10,30+i*28);
          });
          const scanY=(t*80)%H;
          ctx.strokeStyle='rgba(6,182,212,0.4)'; ctx.lineWidth=1;
          ctx.beginPath();ctx.moveTo(0,scanY);ctx.lineTo(W,scanY);ctx.stroke();
          break;
        }
        case 4: { // Dynamic Face Lift - Face mesh
          clr(0.06);
          const cx=W/2,cy=H/2;
          const pts=Array.from({length:24},(_,i)=>{const a=i/24*Math.PI*2;const r=80+20*Math.sin(t+i);return{x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r*0.75};});
          glow('#06b6d4',6); ctx.strokeStyle='rgba(6,182,212,0.5)'; ctx.lineWidth=1;
          pts.forEach((p,i)=>{ const n=pts[(i+1)%pts.length]; ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(n.x,n.y);ctx.stroke(); if(i%3===0){const m=pts[(i+8)%pts.length];ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(m.x,m.y);ctx.stroke();} });
          pts.forEach(p=>{ ctx.fillStyle='#06b6d4';ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill(); });
          noGlow();
          break;
        }
        case 5: { // NetGuard - Shield + firewall
          clr(0.05);
          const cx=W/2,cy=H/2;
          const pulse=0.5+0.5*Math.sin(t*2);
          glow('#f59e0b',20*pulse);
          ctx.strokeStyle=`rgba(245,158,11,${0.5+pulse*0.5})`; ctx.lineWidth=3;
          ctx.beginPath();ctx.moveTo(cx,cy-70);ctx.lineTo(cx+50,cy-40);ctx.lineTo(cx+50,cy+20);ctx.quadraticCurveTo(cx+50,cy+60,cx,cy+75);ctx.quadraticCurveTo(cx-50,cy+60,cx-50,cy+20);ctx.lineTo(cx-50,cy-40);ctx.closePath();ctx.stroke();
          ctx.fillStyle=`rgba(245,158,11,${0.05+pulse*0.08})`;ctx.fill();
          noGlow();
          [1,2,3].forEach(r=>{ ctx.strokeStyle=`rgba(245,158,11,${0.1*pulse})`;ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,r*40+10*Math.sin(t+r),0,Math.PI*2);ctx.stroke(); });
          break;
        }
        case 6: { // Portfolio Kinju - Neon cubes
          clr(0.06);
          cubes.forEach(cu=>{
            cu.y-=cu.v; if(cu.y<-cu.s) cu.y=H+cu.s;
            cu.a+=0.01;
            const hs=cu.s/2;
            const alpha=0.4+0.3*Math.sin(t+cu.x);
            glow('#ec4899',8); ctx.strokeStyle=`rgba(236,72,153,${alpha})`; ctx.lineWidth=1.5;
            ctx.save();ctx.translate(cu.x,cu.y);ctx.rotate(cu.a);
            ctx.strokeRect(-hs,-hs,cu.s,cu.s);
            ctx.restore(); noGlow();
          });
          break;
        }
        case 7: { // InspectFlow Sync - Pipeline
          clr(0.05);
          pipes.forEach((p,i)=>{
            p.p=(p.p+1.5)%W;
            ctx.strokeStyle=`rgba(6,182,212,0.2)`;ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(0,p.y);ctx.lineTo(W,p.y);ctx.stroke();
            glow('#06b6d4',12); ctx.strokeStyle='#06b6d4'; ctx.lineWidth=3;
            ctx.beginPath();ctx.moveTo(p.p-30,p.y);ctx.lineTo(p.p,p.y);ctx.stroke();
            ctx.fillStyle='#06b6d4';ctx.beginPath();ctx.arc(p.p,p.y,5,0,Math.PI*2);ctx.fill();
            noGlow();
            ctx.fillStyle='rgba(6,182,212,0.6)';ctx.font='10px monospace';
            ctx.fillText(['INPUT','PARSE','VALID','SYNC','QUEUE','OUT'][i],10,p.y-6);
          });
          break;
        }
        case 8: { // CXBulk - Bar chart
          clr(0.07);
          bars.forEach((b,i)=>{
            b.h+=(b.target-b.h)*0.03;
            if(Math.abs(b.h-b.target)<1){b.target=20+(i*37+Math.floor(t*10))%80;}
            const x=15+i*(W-30)/10, bh=b.h/100*H*0.7;
            const grad=ctx.createLinearGradient(0,H-bh,0,H);
            grad.addColorStop(0,'rgba(6,182,212,0.9)');grad.addColorStop(1,'rgba(6,182,212,0.2)');
            ctx.fillStyle=grad;
            glow('#06b6d4',6); ctx.fillRect(x,H-bh,18,bh); noGlow();
          });
          break;
        }
        case 9: { // Codexservice - Code typing
          clr(0.04);
          const line=Math.floor(t/1.5)%code.length;
          code.forEach((l,i)=>{
            const alpha= i<=line? 0.9 : 0.2;
            ctx.fillStyle=i%2===0?`rgba(6,182,212,${alpha})`:`rgba(167,139,250,${alpha})`;
            ctx.font='bold 22px monospace';
            ctx.fillText(l, W/2-30, 60+i*55);
          });
          const curX=W/2-30+(i=>i<code[line%code.length].length?i*13:code[line%code.length].length*13)(Math.floor((t%1.5)/1.5*code[line%code.length].length));
          ctx.fillStyle='rgba(6,182,212,0.9)';ctx.fillRect(W/2-30+code[line].length*13,60+line*55+5,2,20);
          break;
        }
        case 10: { // QR Code - Pixel grid
          clr(0.03);
          const cell=Math.floor(W/10);
          qr.forEach((v,i)=>{
            const row=Math.floor(i/10),col=i%10;
            const flicker=Math.sin(t*3+i*0.7)>0.5?v:qr[(i+13)%100];
            ctx.fillStyle=flicker?`rgba(6,182,212,0.8)`:'rgba(6,182,212,0.05)';
            ctx.fillRect(col*cell,row*cell,cell-2,cell-2);
          });
          break;
        }
        case 11: { // Digivualt - Vault rings
          clr(0.05);
          const cx=W/2,cy=H/2;
          [80,58,36].forEach((r,i)=>{
            const angle=t*(i%2===0?0.5:-0.7)*(i+1);
            ctx.strokeStyle=['#f59e0b','#06b6d4','#a78bfa'][i]; ctx.lineWidth=6;
            glow(['#f59e0b','#06b6d4','#a78bfa'][i],12);
            ctx.beginPath();ctx.arc(cx,cy,r,angle,angle+Math.PI*1.4);ctx.stroke();
            ctx.beginPath();ctx.arc(cx,cy,r,angle+Math.PI,angle+Math.PI*2.4);ctx.stroke();
            noGlow();
          });
          ctx.fillStyle='rgba(245,158,11,0.8)';ctx.font='bold 18px monospace';
          ctx.textAlign='center';ctx.fillText('🔒',cx,cy+7);ctx.textAlign='left';
          break;
        }
        case 12: { // Gym Pro - Progress rings
          clr(0.05);
          const cx=W/2,cy=H/2;
          rings.forEach((rg,i)=>{
            const progress=0.5+0.5*Math.sin(t*rg.spd*30+i);
            ctx.strokeStyle=`rgba(0,0,0,0.3)`; ctx.lineWidth=8;
            ctx.beginPath();ctx.arc(cx,cy,rg.r,0,Math.PI*2);ctx.stroke();
            glow(rg.col,10); ctx.strokeStyle=rg.col; ctx.lineWidth=8;
            ctx.beginPath();ctx.arc(cx,cy,rg.r,-Math.PI/2,-Math.PI/2+progress*Math.PI*2);ctx.stroke();
            noGlow();
          });
          ctx.fillStyle='rgba(6,182,212,0.9)';ctx.font='bold 14px monospace';ctx.textAlign='center';
          ctx.fillText('FITNESS',cx,cy+5);ctx.textAlign='left';
          break;
        }
        case 13: { // Lifeconnect - Social web
          clr(0.06);
          soc.forEach(n=>{ n.x+=n.vx;n.y+=n.vy; if(n.x<0||n.x>W)n.vx*=-1; if(n.y<0||n.y>H)n.vy*=-1; });
          soc.forEach((a,i)=>soc.slice(i+1).forEach(b=>{
            const d=Math.hypot(a.x-b.x,a.y-b.y);
            if(d<90){ctx.strokeStyle=`rgba(167,139,250,${1-d/90})`;ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
          }));
          soc.forEach((n,i)=>{ glow('#a78bfa',8);ctx.fillStyle=i%5===0?'#ec4899':'#a78bfa';ctx.beginPath();ctx.arc(n.x,n.y,i%5===0?5:3,0,Math.PI*2);ctx.fill(); });
          noGlow();
          break;
        }
        case 14: { // Gov Project - Star emblem
          clr(0.05);
          const cx=W/2,cy=H/2;
          glow('#f59e0b',15); ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=2;
          for(let s=0;s<5;s++){ const a=s*Math.PI*2/5-Math.PI/2+t*0.2; const a2=a+Math.PI/5; ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*70,cy+Math.sin(a)*70);ctx.lineTo(cx+Math.cos(a2)*30,cy+Math.sin(a2)*30);ctx.stroke(); }
          [90,110].forEach(r=>{ ctx.strokeStyle='rgba(245,158,11,0.3)';ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke(); });
          noGlow();
          ctx.fillStyle='rgba(245,158,11,0.8)';ctx.font='10px monospace';ctx.textAlign='center';
          ctx.fillText('PUBLIC SECTOR',cx,H-15);ctx.textAlign='left';
          break;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [index]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-50 group-hover:opacity-90 transition-opacity duration-700" />;
};

const GetCardAnimation = (_tech: string, index: number) => <ProjectCanvas index={index} />;

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

        tl.fromTo(content, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
        tl.fromTo(bullets, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.4");
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
                            {GetCardAnimation(p.tech, i)}
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
