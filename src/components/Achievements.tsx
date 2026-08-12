import React from "react";
import { motion } from "motion/react";
import {
  Award,
  CheckCircle2,
  Globe,
  Layers,
  Sparkles,
  Target,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  Users
} from "lucide-react";

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative bg-slate-950/90 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-lg">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Proven Track Record & Academic Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
            Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">Achievements</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Delivering measurable academic excellence through structured collaborative methodologies, international research groups, and high-quality manuscript development.
          </p>
        </motion.div>

        {/* PRIMARY & LARGEST ACHIEVEMENT: 100+ Completed Projects Hero Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950 border border-cyan-500/40 p-8 sm:p-12 shadow-[0_0_50px_rgba(34,213,238,0.12)] overflow-hidden group">
            
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-700" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Huge Number Callout */}
              <div className="lg:col-span-5 text-center lg:text-left space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Primary Milestone</span>
                </div>
                
                {/* Largest Statistic */}
                <div className="text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 drop-shadow-[0_0_35px_rgba(34,213,238,0.3)]">
                  100+
                </div>

                <div className="text-cyan-400/90 font-mono text-xs uppercase tracking-widest font-semibold">
                  Global Project Milestone Reached
                </div>
              </div>

              {/* Right Column: Title, Description & Highlights */}
              <div className="lg:col-span-7 space-y-4 text-center lg:text-left border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-6 lg:pt-0 lg:pl-10">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight">
                  Successfully Completed Research Projects
                </h3>
                
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Empowering student researchers, academic mentors, and independent scholars worldwide through structured literature synthesis, simulation benchmarks, and manuscript co-authorship across cutting-edge engineering disciplines.
                </p>

                {/* Key Sub-metrics Badges */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-mono">
                  <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Peer-Reviewed Quality Standards</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 flex items-center gap-1.5 shadow-sm">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>28+ Partner Nations</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 flex items-center gap-1.5 shadow-sm">
                    <Layers className="w-4 h-4 text-violet-400" />
                    <span>8 Interdisciplinary Domains</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* PROMINENT SUPPORTING STATEMENT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8"
        >
          <div className="relative rounded-2xl bg-gradient-to-r from-violet-950/70 via-slate-900 to-cyan-950/70 border border-violet-500/40 p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur-md">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-950 border border-violet-500/50 flex items-center justify-center text-violet-300 shrink-0 shadow-lg shadow-violet-950/50">
                <Target className="w-6 h-6 text-violet-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                  Publication Quality Standard
                </span>
                <p className="text-lg sm:text-xl font-bold text-white font-display leading-snug">
                  "Most of our publication-oriented projects are designed with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-pink-300 to-cyan-300 underline decoration-violet-500/50 underline-offset-4 font-black">Q1 journal targets</span>."
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950/90 border border-violet-500/40 text-violet-200 text-xs font-mono font-semibold shadow-inner">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>High-Impact Standard</span>
              </span>
            </div>

          </div>
        </motion.div>

        {/* SUPPORTING THREE MAIN STATISTICS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Stat 2: 98% */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all text-center space-y-3 group hover:shadow-xl hover:shadow-emerald-950/20"
          >
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight">
              98%
            </div>
            <div className="text-base font-bold text-white font-display">
              Reported Project Success Rate
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Driven by structured milestone tracking, weekly literature synthesis, and rigorous peer review feedback loops.
            </p>
          </motion.div>

          {/* Stat 3: Global */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all text-center space-y-3 group hover:shadow-xl hover:shadow-sky-950/20"
          >
            <div className="w-10 h-10 mx-auto rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-sky-400 tracking-tight uppercase">
              Global
            </div>
            <div className="text-base font-bold text-white font-display">
              Research Collaboration
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Connecting student researchers, academic mentors, and postdocs across international universities and labs.
            </p>
          </motion.div>

          {/* Stat 4: Multiple */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 transition-all text-center space-y-3 group hover:shadow-xl hover:shadow-violet-950/20"
          >
            <div className="w-10 h-10 mx-auto rounded-xl bg-violet-950/80 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-violet-400 tracking-tight uppercase">
              Multiple
            </div>
            <div className="text-base font-bold text-white font-display">
              Engineering & Technology Research Domains
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Active tracks across Artificial Intelligence, Smart Grid Cybersecurity, Renewable Energy, Material Science, and Power Engineering.
            </p>
          </motion.div>

        </div>

        {/* Clean Organizational Experience & Quality Commitment */}
        <div className="mt-16 pt-12 border-t border-slate-900 grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300">
          
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm font-display">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Rigorous Literature Review</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every project begins with a comprehensive review of state-of-the-art literature to identify clear research gaps and technical novelty.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm font-display">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Structured Co-Authorship</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent contribution guidelines ensure all active team members earn merit-based co-authorship recognition.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm font-display">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Peer-Review Readiness</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Manuscripts undergo internal technical evaluation, figure formatting, and plagiarism checks prior to journal or conference submission.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
