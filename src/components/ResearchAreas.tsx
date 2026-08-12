import React from "react";
import { motion } from "motion/react";
import { RESEARCH_AREAS } from "../data/researchData";
import { ResearchArea } from "../types";
import {
  Bot,
  Zap,
  Sun,
  Waves,
  BatteryCharging,
  Magnet,
  Radio,
  Laptop,
  ArrowUpRight,
  Layers,
} from "lucide-react";

interface ResearchAreasProps {
  onSelectArea: (categoryName: string) => void;
}

export const ResearchAreas: React.FC<ResearchAreasProps> = ({ onSelectArea }) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Bot":
        return Bot;
      case "Zap":
        return Zap;
      case "Sun":
        return Sun;
      case "Waves":
        return Waves;
      case "BatteryCharging":
        return BatteryCharging;
      case "Magnet":
        return Magnet;
      case "Radio":
        return Radio;
      case "Laptop":
        return Laptop;
      default:
        return Layers;
    }
  };

  const getDomainCategoryKey = (areaId: string): string => {
    switch (areaId) {
      case "ai-ml":
        return "AI";
      case "smart-grid-cyber":
        return "Cybersecurity";
      case "renewable-pv":
      case "floating-solar":
        return "Energy";
      case "power-engineering":
        return "Smart Grid";
      case "material-science":
        return "Material Science";
      default:
        return "All";
    }
  };

  return (
    <section id="research-areas" className="py-24 relative bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
            Specialized <span className="text-cyan-400">Research Areas</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Interdisciplinary research clusters targeting international journals, IEEE conference proceedings, and practical industrial deployment.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESEARCH_AREAS.map((area: ResearchArea, index: number) => {
            const IconComponent = getIconComponent(area.iconName);
            const categoryKey = getDomainCategoryKey(area.id);

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 p-6 flex flex-col justify-between shadow-xl hover:shadow-cyan-950/40 backdrop-blur-md"
              >
                {/* Glow Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Top Badge & 3D Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-700/80 group-hover:border-cyan-400 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan-300">
                      {area.activeProjectsCount} Active Projects
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2 line-clamp-3">
                      {area.shortDescription}
                    </p>
                  </div>

                  {/* Subtopics Pills */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">Focus Subtopics</span>
                    <div className="flex flex-wrap gap-1">
                      {area.subtopics.slice(0, 3).map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between relative z-10">
                  <span className="text-[10px] font-mono text-slate-400">Targeting IEEE / Scopus</span>
                  <button
                    onClick={() => onSelectArea(categoryKey)}
                    id={`explore-area-${area.id}`}
                    className="flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-cyan-200 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>Explore</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

