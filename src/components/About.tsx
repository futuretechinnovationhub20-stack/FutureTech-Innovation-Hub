import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { COLLABORATOR_REGIONS } from "../data/researchData";
import { Globe, Microscope, BookOpen, Users, Compass, ChevronRight, CheckCircle2 } from "lucide-react";

interface AboutProps {
  onExploreProjects: () => void;
}

export const About: React.FC<AboutProps> = ({ onExploreProjects }) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>("ap");

  const selectedRegion =
    COLLABORATOR_REGIONS.find((r) => r.id === selectedRegionId) ||
    COLLABORATOR_REGIONS[0];

  const highlights = [
    {
      icon: Globe,
      title: "Global Collaboration",
      description: "Connect seamlessly with student researchers, academic mentors, and domain specialists across 28+ countries.",
      color: "text-cyan-400",
      bg: "bg-cyan-950/40 border-cyan-500/30",
    },
    {
      icon: Microscope,
      title: "Research Innovation",
      description: "Pioneer cutting-edge solutions in Smart Grid cybersecurity, floating solar PV, AI optimization, and advanced materials.",
      color: "text-blue-400",
      bg: "bg-blue-950/40 border-blue-500/30",
    },
    {
      icon: BookOpen,
      title: "Publication-Oriented Projects",
      description: "Focus on rigorous methodologies, literature synthesis, and experimental validation targeting IEEE conferences and peer-reviewed journals.",
      color: "text-violet-400",
      bg: "bg-violet-950/40 border-violet-500/30",
    },
    {
      icon: Users,
      title: "Interdisciplinary Teams",
      description: "Bridge computer science, electrical power systems, mechanical engineering, and data science to tackle multifaceted challenges.",
      color: "text-emerald-400",
      bg: "bg-emerald-950/40 border-emerald-500/30",
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-slate-950/90 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-[140px] pointer-events-none" />

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
            <Compass className="w-3.5 h-3.5" />
            <span>Organization Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
            Where Ideas Become <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">Research</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            FutureTech Innovation Hub connects ambitious students, researchers, and academic professionals worldwide with structured, publication-oriented research projects across multiple engineering and technology domains.
          </p>
        </motion.div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 space-y-4 group shadow-xl backdrop-blur-md relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Global Research Node Explorer */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 p-6 sm:p-10 rounded-3xl bg-slate-900/50 border border-slate-800/90 backdrop-blur-xl relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Region Selector List */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Interactive Network</span>
                <h3 className="text-2xl font-bold text-white font-display">
                  Global Collaborative Nodes
                </h3>
                <p className="text-sm text-slate-300">
                  Select a region to explore active research team density and partner academic networks.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {COLLABORATOR_REGIONS.map((region) => {
                  const isSelected = selectedRegionId === region.id;
                  return (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      key={region.id}
                      onClick={() => setSelectedRegionId(region.id)}
                      className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? "bg-cyan-950/80 border-cyan-500/60 text-white shadow-lg shadow-cyan-950/40"
                          : "bg-slate-900/70 border-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? "bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" : "bg-slate-600"}`} />
                        <span className="text-sm font-semibold">{region.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                        <span>{region.activeResearchers} Researchers</span>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? "rotate-90 text-cyan-400" : ""}`} />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Region Details Display Panel */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-950/90 border border-cyan-500/30 p-6 sm:p-8 space-y-6 relative shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRegion.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white">{selectedRegion.name} Research Hub</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">Active Collaboration Cluster</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
                      Verified Academic Region
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">{selectedRegion.activeResearchers}</div>
                      <div className="text-xs text-slate-300 mt-1">Active Collaborators</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-violet-400">{selectedRegion.activeProjects}</div>
                      <div className="text-xs text-slate-300 mt-1">Ongoing Projects</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">Top Participating Academic Networks</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedRegion.topInstitutions.map((inst, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{inst}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={onExploreProjects}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer group"
                    >
                      <span>View Projects in {selectedRegion.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
