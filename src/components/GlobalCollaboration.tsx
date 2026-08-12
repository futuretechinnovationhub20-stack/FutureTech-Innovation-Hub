import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Globe, Users, ArrowRight, Zap, Sparkles, CheckCircle2 } from "lucide-react";

interface GlobalCollaborationProps {
  onJoinCollaborator: () => void;
}

export const GlobalCollaboration: React.FC<GlobalCollaborationProps> = ({
  onJoinCollaborator,
}) => {
  const [activeActivityIndex, setActiveActivityIndex] = useState(0);

  const activities = [
    { text: "Smart Grid Cyberattack team assembled across Germany, India, and USA", time: "2 mins ago" },
    { text: "Floating Solar PV draft manuscript completed for IEEE conference target", time: "18 mins ago" },
    { text: "Researcher from Nanyang Technological University joined Perovskite PV group", time: "42 mins ago" },
    { text: "IEEE SPICSCON 2026 paper acceptance certificate verified on hub portal", time: "1 hour ago" },
    { text: "Quantum Cryptography team initiated benchmarking on hardware microcontrollers", time: "3 hours ago" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveActivityIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="collaboration" className="py-24 relative bg-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest shadow-md">
            <Globe className="w-3.5 h-3.5" />
            <span>International Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
            Collaborate Beyond <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">Borders</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Connect with students and researchers from different backgrounds and disciplines to develop collaborative research projects targeting premier international venues.
          </p>
        </motion.div>

        {/* Global Interactive Map & Network Connections Container */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl"
        >
          
          {/* Real-time Ticker Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono uppercase text-cyan-300 tracking-wider font-semibold">
                Live Global Collaboration Ticker
              </span>
            </div>

            <div className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2 shadow-inner">
              <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>{activities[activeActivityIndex].text}</span>
              <span className="text-slate-500">• {activities[activeActivityIndex].time}</span>
            </div>
          </div>

          {/* SVG Map Graphic with Beam Trajectories */}
          <div className="relative my-8 py-12 flex items-center justify-center">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-auto max-h-[380px] opacity-80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* World outline dots representation */}
              <defs>
                <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Grid backdrop */}
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
              <rect width="1000" height="500" fill="url(#gridPattern)" />

              {/* Beam Arcs between global hubs */}
              <path d="M 220 180 Q 360 80 500 150" stroke="url(#beamGradient)" strokeWidth="2" fill="none" className="animate-pulse" />
              <path d="M 500 150 Q 640 90 780 240" stroke="url(#beamGradient)" strokeWidth="2" fill="none" />
              <path d="M 780 240 Q 680 320 650 220" stroke="url(#beamGradient)" strokeWidth="2" fill="none" />
              <path d="M 220 180 Q 430 380 650 220" stroke="url(#beamGradient)" strokeWidth="2" fill="none" />

              {/* Hub Glowing Nodes */}
              {/* North America */}
              <g className="cursor-pointer group">
                <circle cx="220" cy="180" r="12" fill="rgba(34,211,238,0.2)" />
                <circle cx="220" cy="180" r="6" fill="#22d3ee" />
                <text x="220" y="210" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  North America
                </text>
              </g>

              {/* Europe */}
              <g className="cursor-pointer group">
                <circle cx="500" cy="150" r="14" fill="rgba(59,130,246,0.2)" />
                <circle cx="500" cy="150" r="7" fill="#3b82f6" />
                <text x="500" y="180" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  Europe Hub
                </text>
              </g>

              {/* Asia-Pacific */}
              <g className="cursor-pointer group">
                <circle cx="780" cy="240" r="16" fill="rgba(139,92,246,0.2)" />
                <circle cx="780" cy="240" r="8" fill="#8b5cf6" />
                <text x="780" y="270" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  Asia-Pacific Hub
                </text>
              </g>

              {/* South Asia & ME */}
              <g className="cursor-pointer group">
                <circle cx="650" cy="220" r="14" fill="rgba(34,211,238,0.2)" />
                <circle cx="650" cy="220" r="7" fill="#22d3ee" />
                <text x="650" y="250" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  South Asia & ME
                </text>
              </g>

              {/* Latin America & Africa */}
              <g className="cursor-pointer group">
                <circle cx="380" cy="340" r="10" fill="rgba(168,85,247,0.2)" />
                <circle cx="380" cy="340" r="5" fill="#a855f7" />
                <text x="380" y="365" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  Latin America / Africa
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Action Section */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold text-white font-display">Join as an International Research Partner</h4>
              <p className="text-xs text-slate-400">Co-author manuscripts, mentor student scholars, or propose new project topics.</p>
            </div>

            <button
              onClick={onJoinCollaborator}
              id="global-become-collaborator-btn"
              className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 shrink-0 cursor-pointer"
            >
              <span>Become a Research Collaborator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
