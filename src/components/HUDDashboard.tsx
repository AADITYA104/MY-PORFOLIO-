'use client';

import { useState, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
type HUDTab = 'system' | 'skills' | 'projects' | 'trivia';

interface HUDDashboardProps {
  activeTab: HUDTab;
  setActiveTab: (tab: HUDTab) => void;
  highlightedSkill: string | null;
  selectedProject: string | null;
  setSelectedProject: (project: string | null) => void;
}

// ─── Project Data for Diagrams ────────────────────────────────────────────────
const PROJECT_DIAGRAMS: Record<string, {
  title: string;
  tech: string[];
  description: string;
  steps: { label: string; desc: string }[];
}> = {
  'eth.vote': {
    title: 'ETH.VOTE (Decentralized Voting DApp)',
    tech: ['Solidity', 'Web3.js', 'FastAPI', 'Next.js'],
    description: 'Decentralized voting DApp using EIP-712 cryptographic signatures to prevent Sybil attacks and vote tampering.',
    steps: [
      { label: 'Voter Auth & Signing', desc: 'Voter signs structured EIP-712 data off-chain using MetaMask' },
      { label: 'Relayer FastAPI Node', desc: 'Backend verifies signature integrity and bundles transactions' },
      { label: 'Ethereum Blockchain', desc: 'Solidity Smart Contract executes on-chain vote state update' },
      { label: 'Verified Results', desc: 'Immutably stored results with 100% data integrity' }
    ]
  },
  'ai threat detection': {
    title: 'AI Threat Detection System',
    tech: ['Python', 'Scikit-learn', 'NetGuard'],
    description: 'Network intrusion detection system with 92% accuracy classifying traffic threats in real-time.',
    steps: [
      { label: 'Network Stream', desc: 'Inbound raw TCP/UDP packets intercepted by NetGuard filter' },
      { label: 'Feature Extraction', desc: 'Packets parsed into mathematical features (rates, sizes, protocols)' },
      { label: 'Scikit-learn Classifier', desc: 'Pre-trained Machine Learning model scores traffic risk profile' },
      { label: 'Automated Mitigation', desc: 'Suspicious IPs flagged and firewall rules injected instantly' }
    ]
  },
  'healthcare ai chatbot': {
    title: 'Healthcare AI Triage Assistant',
    tech: ['Python', 'NLP', 'AI Agents'],
    description: 'Natural Language processing patient assistant reducing triage response times by 40%.',
    steps: [
      { label: 'Symptom Input', desc: 'Patient inputs natural language description of symptoms' },
      { label: 'NLP Entity Parsing', desc: 'Extractor identifies symptoms, duration, and severity markers' },
      { label: 'AI Risk Scoring', desc: 'Risk matrix assesses urgency (Critical, Moderate, Low)' },
      { label: 'Triage Route', desc: 'Directs patient to ER recommendation or self-care schedule' }
    ]
  }
};

// ─── Trivia Questions ─────────────────────────────────────────────────────────
const TRIVIA_QUESTIONS = [
  {
    id: 1,
    question: "What security standard did Aditya implement in ETH.VOTE to prevent vote tampering?",
    options: ["EIP-712 structured data signing", "ERC-20 token standard", "BIP-39 mnemonic phrases"],
    correct: 0,
    explanation: "Aditya implemented EIP-712 structured data hashing and signing to guarantee voter cryptographic identity."
  },
  {
    id: 2,
    question: "What was the network threat detection accuracy of Aditya's AI prototype?",
    options: ["80% accuracy", "92% accuracy", "99.9% accuracy"],
    correct: 1,
    explanation: "Aditya's AI Threat Detection prototype achieved a verified 92% anomaly detection rate using Python & Scikit-learn."
  },
  {
    id: 3,
    question: "At Gyanmanjari University R&D, Aditya built a prototype that sped up data processing by how much?",
    options: ["10% faster", "30% faster", "50% faster"],
    correct: 1,
    explanation: "Aditya architected a prototype system in the university R&D department that improved speed by 30%."
  }
];

export function HUDDashboard({
  activeTab,
  setActiveTab,
  highlightedSkill,
  selectedProject,
  setSelectedProject
}: HUDDashboardProps) {
  // --- Trivia State ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // --- Simulated Diagnostic State ---
  const [latency, setLatency] = useState(240);
  const [entropy, setEntropy] = useState(0.42);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(210 + Math.random() * 50));
      setEntropy(parseFloat((0.35 + Math.random() * 0.15).toFixed(2)));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleOptionClick = (idx: number) => {
    if (answered) return;
    setSelectedOption(idx);
  };

  const submitAnswer = () => {
    if (selectedOption === null || answered) return;
    setAnswered(true);
    if (selectedOption === TRIVIA_QUESTIONS[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setAnswered(false);
    if (currentQuestion < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  // --- Skill Radar Chart Data ---
  const skillPoints = [
    { label: 'Full Stack', val: 0.95, x: 200, y: 55 },      // Top
    { label: 'AI/ML', val: 0.90, x: 310, y: 135 },       // Top Right
    { label: 'Blockchain', val: 0.85, x: 268, y: 265 },  // Bottom Right
    { label: 'Security', val: 0.80, x: 132, y: 265 },    // Bottom Left
    { label: 'NLP', val: 0.85, x: 90, y: 135 }          // Top Left
  ];

  // Polygon calculations for radar chart
  const center = { x: 200, y: 160 };
  const getRadarPath = (level: number) => {
    return skillPoints.map(p => {
      const dx = p.x - center.x;
      const dy = p.y - center.y;
      const rx = center.x + dx * level;
      const ry = center.y + dy * level;
      return `${rx},${ry}`;
    }).join(' ');
  };

  const getAdityaSkillPath = () => {
    return skillPoints.map(p => {
      const dx = p.x - center.x;
      const dy = p.y - center.y;
      const rx = center.x + dx * p.val;
      const ry = center.y + dy * p.val;
      return `${rx},${ry}`;
    }).join(' ');
  };

  const cleanProjectKey = selectedProject?.toLowerCase() || '';
  const currentDiagramKey = Object.keys(PROJECT_DIAGRAMS).find(k => cleanProjectKey.includes(k)) || null;
  const diagram = currentDiagramKey ? PROJECT_DIAGRAMS[currentDiagramKey] : null;

  return (
    <div className="w-full h-full flex flex-col border border-white/[0.06] bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
      
      {/* ── Tabs Navigation ── */}
      <nav className="flex border-b border-white/[0.06] bg-white/[0.01]">
        {(['system', 'skills', 'projects', 'trivia'] as HUDTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 border-b-2 cursor-pointer ${
              activeTab === tab
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.01]'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* ── Main Tab Content ── */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 font-mono text-xs">
        
        {/* TAB 1: SYSTEM OVERVIEW */}
        {activeTab === 'system' && (
          <div className="space-y-4" style={{ animation: 'fadeUp 0.4s ease both' }}>
            <div className="border border-white/[0.05] rounded-xl p-4 bg-white/[0.01]">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">Core Diagnostics</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-white/[0.04] bg-black/35 rounded-lg">
                  <span className="text-gray-500 block text-[9px] uppercase">Loop Latency</span>
                  <span className="text-indigo-400 font-bold text-sm">{latency}ms</span>
                </div>
                <div className="p-3 border border-white/[0.04] bg-black/35 rounded-lg">
                  <span className="text-gray-500 block text-[9px] uppercase">Entropy Coefficient</span>
                  <span className="text-amber-400 font-bold text-sm">{entropy}</span>
                </div>
                <div className="p-3 border border-white/[0.04] bg-black/35 rounded-lg col-span-2 flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Secure Channel</span>
                    <span className="text-emerald-400 font-bold">Active EIP-712 Guard</span>
                  </div>
                  <span className="text-emerald-400 text-lg">🛡️</span>
                </div>
              </div>
            </div>

            <div className="border border-white/[0.05] rounded-xl p-4 bg-white/[0.01]">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Representative Console Log</p>
              <div className="bg-black/80 rounded-lg p-3 text-[10px] text-gray-400 font-mono space-y-1.5 h-36 overflow-y-auto border border-white/[0.03]"
                   style={{ scrollbarWidth: 'none' }}>
                <p className="text-indigo-500">{`>>> Initializing Agent Loop state...`}</p>
                <p className="text-gray-500">{`[OK] RetrieveNode loaded (14 keys)`}</p>
                <p className="text-gray-500">{`[OK] VerifierNode configured (temp=0.1)`}</p>
                <p className="text-gray-500">{`[INFO] System waiting for request...`}</p>
                <p className="text-emerald-500">{`>>> [Secure Node Connected]`}</p>
                <p className="text-gray-500">{`[INFO] Agent latency stabilized at ${latency}ms`}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE SKILLS MAP (RADAR CHART) */}
        {activeTab === 'skills' && (
          <div className="space-y-4 text-center" style={{ animation: 'fadeUp 0.4s ease both' }}>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider text-left">Interactive Skill Map</p>
            
            <div className="flex justify-center select-none relative">
              <svg width="360" height="320" className="mx-auto overflow-visible">
                {/* Radar Grids */}
                <polygon points={getRadarPath(0.25)} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <polygon points={getRadarPath(0.5)} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <polygon points={getRadarPath(0.75)} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
                <polygon points={getRadarPath(1.0)} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

                {/* Radar Grid Axes */}
                {skillPoints.map((p, idx) => (
                  <line
                    key={idx}
                    x1={center.x}
                    y1={center.y}
                    x2={p.x}
                    y2={p.y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                ))}

                {/* Aditya Area Plot */}
                <polygon
                  points={getAdityaSkillPath()}
                  fill="rgba(99, 102, 241, 0.15)"
                  stroke="rgba(99, 102, 241, 0.7)"
                  strokeWidth="2"
                  className="animate-pulse"
                />

                {/* Radar Dots */}
                {skillPoints.map((p, idx) => {
                  const isHighlighted = highlightedSkill?.toLowerCase() === p.label.toLowerCase() || 
                    (highlightedSkill?.toLowerCase() === 'blockchain' && p.label === 'Blockchain') ||
                    (highlightedSkill?.toLowerCase() === 'python' && p.label === 'AI/ML');

                  return (
                    <g key={idx}>
                      <circle
                        cx={center.x + (p.x - center.x) * p.val}
                        cy={center.y + (p.y - center.y) * p.val}
                        r={isHighlighted ? 6 : 4}
                        fill={isHighlighted ? '#a78bfa' : '#6366f1'}
                        className={isHighlighted ? "animate-ping" : ""}
                        style={{ opacity: isHighlighted ? 0.8 : 1 }}
                      />
                      <circle
                        cx={center.x + (p.x - center.x) * p.val}
                        cy={center.y + (p.y - center.y) * p.val}
                        r={isHighlighted ? 4 : 3}
                        fill={isHighlighted ? '#f59e0b' : '#6366f1'}
                      />
                      {/* Node Labels */}
                      <text
                        x={p.x + (p.x > center.x ? 12 : p.x < center.x ? -12 : 0)}
                        y={p.y + (p.y > center.y ? 8 : p.y < center.y ? -8 : 0)}
                        textAnchor={p.x > center.x ? "start" : p.x < center.x ? "end" : "middle"}
                        fill={isHighlighted ? '#f59e0b' : '#94a3b8'}
                        fontSize="9"
                        fontWeight={isHighlighted ? "bold" : "normal"}
                        className="font-mono transition-all duration-300"
                      >
                        {p.label} {Math.round(p.val * 100)}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            
            {highlightedSkill && (
              <div className="p-3 border border-amber-500/25 bg-amber-500/5 rounded-xl text-amber-300 text-[10px] animate-pulse">
                🎯 Core node focused: <strong className="uppercase">{highlightedSkill}</strong>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROJECT EXPLORER (ARCHITECTURE VIEWS) */}
        {activeTab === 'projects' && (
          <div className="space-y-4" style={{ animation: 'fadeUp 0.4s ease both' }}>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Interactive Project Explorer</p>

            {diagram ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-bold">{diagram.title}</h4>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="text-[9px] uppercase tracking-wider text-gray-500 hover:text-white"
                  >
                    Clear selection
                  </button>
                </div>

                <p className="text-gray-400 text-[11px] leading-relaxed">{diagram.description}</p>

                {/* Visual Architecture Steps Flow */}
                <div className="space-y-3 pt-2 relative before:absolute before:left-3 before:top-6 before:bottom-6 before:w-0.5 before:bg-white/[0.04]">
                  {diagram.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 font-mono text-[9px] font-bold text-indigo-300">
                        {idx + 1}
                      </div>
                      <div className="flex-1 border border-white/[0.04] bg-white/[0.01] rounded-lg p-2.5">
                        <span className="text-white font-semibold block text-[10px]">{step.label}</span>
                        <span className="text-[10px] text-gray-400 mt-0.5 block leading-normal">{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <div className="text-3xl opacity-35">🧭</div>
                <h4 className="text-gray-400 font-bold text-xs uppercase tracking-wider">No Project Loaded</h4>
                <p className="text-[10px] text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Query a project (like &quot;ETH.VOTE&quot;, &quot;Threat Detection&quot;, or &quot;Healthcare Chatbot&quot;) in the AI Chat on the left to display its real-time architecture blueprint.
                </p>
                <div className="pt-4 flex flex-wrap gap-2 justify-center">
                  {Object.keys(PROJECT_DIAGRAMS).map(k => (
                    <button 
                      key={k}
                      onClick={() => setSelectedProject(k)}
                      className="text-[9px] font-mono px-2.5 py-1.5 rounded-lg border border-white/[0.06] hover:border-indigo-500/30 bg-white/[0.01] hover:bg-indigo-500/5 text-gray-400 hover:text-indigo-300 transition-colors uppercase cursor-pointer"
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: RECRUITER TRIVIA QUIZ */}
        {activeTab === 'trivia' && (
          <div className="space-y-4" style={{ animation: 'fadeUp 0.4s ease both' }}>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Trivia Q&amp;A Challenge</p>

            {!quizFinished ? (
              <div className="space-y-4">
                {/* Question Info */}
                <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                  <span>QUESTION {currentQuestion + 1} OF {TRIVIA_QUESTIONS.length}</span>
                  <span>SCORE: {score}/{currentQuestion + (answered ? 1 : 0)}</span>
                </div>

                <div className="border border-white/[0.05] bg-white/[0.01] rounded-xl p-4">
                  <h4 className="text-white font-semibold leading-relaxed text-xs">
                    {TRIVIA_QUESTIONS[currentQuestion].question}
                  </h4>
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {TRIVIA_QUESTIONS[currentQuestion].options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === TRIVIA_QUESTIONS[currentQuestion].correct;
                    
                    let btnStyle = "border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] text-gray-300";
                    if (isSelected && !answered) {
                      btnStyle = "border-indigo-500/40 bg-indigo-500/10 text-indigo-300";
                    } else if (answered) {
                      if (isCorrect) {
                        btnStyle = "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
                      } else if (isSelected) {
                        btnStyle = "border-red-500/40 bg-red-500/10 text-red-300";
                      } else {
                        btnStyle = "border-white/[0.03] bg-transparent opacity-40 text-gray-600";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(idx)}
                        disabled={answered}
                        className={`w-full text-left p-3.5 border rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {answered && isCorrect && <span className="text-emerald-400">✓</span>}
                        {answered && isSelected && !isCorrect && <span className="text-red-400">✗</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {answered && (
                  <div className="p-3.5 border border-indigo-500/15 bg-indigo-500/5 rounded-xl text-[10px] text-indigo-300 leading-relaxed">
                    💡 <strong>Explanation:</strong> {TRIVIA_QUESTIONS[currentQuestion].explanation}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end pt-2">
                  {!answered ? (
                    <button
                      onClick={submitAnswer}
                      disabled={selectedOption === null}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-wider text-[10px] disabled:opacity-30 transition-all cursor-pointer shadow-[0_4px_12px_rgba(99,102,241,0.25)]"
                    >
                      Verify Answer
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer shadow-[0_4px_12px_rgba(99,102,241,0.25)]"
                    >
                      {currentQuestion === TRIVIA_QUESTIONS.length - 1 ? 'Finish Challenge' : 'Next Question'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              // Quiz Finished — Badges & Scheduler
              <div className="text-center py-4 space-y-4" style={{ animation: 'fadeUp 0.5s ease both' }}>
                <div className="text-4xl">🏆</div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Trivia Complete!</h3>
                <p className="text-[10px] text-gray-400">Your score: <span className="text-indigo-400 font-bold">{score}/{TRIVIA_QUESTIONS.length}</span></p>

                {score === TRIVIA_QUESTIONS.length ? (
                  // Perfect Score
                  <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-4 space-y-3">
                    <div className="inline-flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 border border-emerald-500/30 rounded-full px-2.5 py-1 bg-emerald-500/10 uppercase tracking-widest animate-pulse">
                      Verified Recruiter Badge
                    </div>
                    <p className="text-[10px] text-gray-300 leading-relaxed">
                      Amazing! You answered all questions correctly. Aditya&apos;s representative has unlocked the fast-track scheduler link.
                    </p>
                    <a
                      href="https://linkedin.com/in/devmurari-aditya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full justify-center py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                    >
                      📅 Book Direct Discussion
                    </a>
                  </div>
                ) : (
                  // Underperforming score
                  <div className="border border-amber-500/20 bg-amber-500/5 rounded-2xl p-4 space-y-3">
                    <p className="text-[10px] text-gray-300 leading-relaxed">
                      You answered {score} out of {TRIVIA_QUESTIONS.length} questions correctly. Re-read the facts about Aditya and try again to unlock the recruiter scheduling badge!
                    </p>
                    <button
                      onClick={resetQuiz}
                      className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
