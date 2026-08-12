import React from "react";
import { motion } from "motion/react";
import { HOW_IT_WORKS_STEPS } from "../data/researchData";
import { Compass, Search, UserCheck, Users, BookOpenCheck } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return Search;
      case 1:
        return UserCheck;
      case 2:
        return Users;
      case 3:
        return BookOpenCheck;
      default:
        return Compass;
    }
  };

  return (
    <section className="py-24 relative bg-slate-950/80 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest shadow-md">
            <Compass className="w-3.5 h-3.5" />
            <span>Structured Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
            How It <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            A clear 4-step path from project selection to international publication and academic recognition.
          </p>
        </motion.div>

        {/* 4-Step Grid with Connecting Lines on Desktop */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const Icon = getStepIcon(idx);
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 space-y-4 relative group hover:border-cyan-500/50 transition-all shadow-xl backdrop-blur-md overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

                {/* Step Number & Icon */}
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-3xl font-extrabold font-mono text-cyan-400/90 group-hover:text-cyan-300 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/40 group-hover:scale-110 transition-all shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors relative z-10 font-display">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Subtext */}
                <p className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80 relative z-10">
                  {step.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
