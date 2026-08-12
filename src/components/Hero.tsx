import React from "react";
import { motion } from "motion/react";
import { HeroCanvas } from "./HeroCanvas";
import { ArrowRight, Globe2, Award, Zap, Sparkles } from "lucide-react";

interface HeroProps {
  onExploreProjects: () => void;
  onJoinCommunity: () => void;
  onOpenAiAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onJoinCommunity,
  onOpenAiAssistant,
}) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950">
      {/* Canvas 3D Background */}
      <HeroCanvas mode="neural" />

      {/* Futuristic Background Accents with Motion Pulse */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            
            {/* Top pill badge */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wide shadow-inner shadow-cyan-950/50 cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-semibold uppercase">FutureTech Innovation Hub</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Global Research Network</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
              Building the Future Through{" "}
              <motion.span 
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.25)]"
              >
                Global Research
              </motion.span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Collaborate with researchers worldwide, develop impactful research, and pursue publication opportunities in leading international journals and conferences.
            </p>

            {/* Tagline highlight */}
            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-cyan-400/90 tracking-wider uppercase">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Research
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Collaborate
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> Publish
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Innovate
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreProjects}
                id="hero-explore-projects-btn"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 group active:scale-95 cursor-pointer"
              >
                <span>Explore Research Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onJoinCommunity}
                id="hero-join-community-btn"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Join Our Research Community</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenAiAssistant}
                id="hero-ai-assistant-btn"
                className="px-4 py-3.5 rounded-xl text-sm font-semibold text-violet-300 bg-violet-950/40 border border-violet-500/30 hover:bg-violet-900/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
                <span className="hidden sm:inline">AI Project Matchmaker</span>
              </motion.button>
            </div>

            {/* Key Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div className="space-y-0.5 group">
                <div className="text-2xl font-bold text-white font-mono tracking-tight text-cyan-300 group-hover:scale-105 transition-transform inline-block">100+</div>
                <div className="text-xs text-slate-400">Completed Projects</div>
              </div>
              <div className="space-y-0.5 group">
                <div className="text-2xl font-bold text-white font-mono tracking-tight text-emerald-400 group-hover:scale-105 transition-transform inline-block">98%</div>
                <div className="text-xs text-slate-400">Success Rate</div>
              </div>
              <div className="space-y-0.5 group">
                <div className="text-2xl font-bold text-white font-mono tracking-tight text-violet-400 group-hover:scale-105 transition-transform inline-block">50+</div>
                <div className="text-xs text-slate-400">IEEE Accepted Papers</div>
              </div>
              <div className="space-y-0.5 group">
                <div className="text-2xl font-bold text-white font-mono tracking-tight text-sky-300 group-hover:scale-105 transition-transform inline-block">28+</div>
                <div className="text-xs text-slate-400">Countries Represented</div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: 3D Holographic Visual Card with Motion Float */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            
            {/* Floating Container Animation */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl bg-gradient-to-b from-cyan-500/30 via-slate-800/50 to-violet-600/30 p-[1px] shadow-2xl shadow-cyan-950/50 backdrop-blur-md"
            >
              <div className="bg-slate-950/90 rounded-[15px] overflow-hidden p-4 space-y-4">
                
                {/* Image Showcase */}
                <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden group">
                  <img
                    src="/src/assets/images/lab_hero_visual_1786513546641.jpg"
                    alt="FutureTech 3D Laboratory Visualization"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Status Overlay */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>Active Global Research Environment</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 text-xs">
                    <p className="font-semibold text-white">Interdisciplinary Lab Focus</p>
                    <p className="text-slate-300 text-[11px] mt-0.5">
                      Smart Grid • Renewable PV • Cyber Defense • AI Architectures
                    </p>
                  </div>
                </div>

                {/* Floating Micro Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">50+ IEEE Accepted</p>
                      <p className="text-[10px] text-slate-400">Peer-reviewed papers</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/40 transition-all flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-violet-950/80 border border-violet-500/40 flex items-center justify-center text-violet-400">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Global Teams</p>
                      <p className="text-[10px] text-slate-400">Collaborative co-authors</p>
                    </div>
                  </motion.div>
                </div>

              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

