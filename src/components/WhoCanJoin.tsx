import React from "react";
import { motion } from "motion/react";
import { WHO_CAN_JOIN_CARDS } from "../data/researchData";
import { GraduationCap, Microscope, Award, CheckCircle2, ArrowRight } from "lucide-react";

interface WhoCanJoinProps {
  onApplyCategory: (categoryTitle: string) => void;
}

export const WhoCanJoin: React.FC<WhoCanJoinProps> = ({ onApplyCategory }) => {
  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return GraduationCap;
      case "Microscope":
        return Microscope;
      case "Award":
        return Award;
      default:
        return GraduationCap;
    }
  };

  return (
    <section className="py-24 relative bg-slate-950 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-widest shadow-md">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Target Profiles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
            Who Can <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">Join</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Tailored tracks for undergraduate scholars, independent researchers, and academic professionals looking to publish high-impact work.
          </p>
        </motion.div>

        {/* 3 Premium Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {WHO_CAN_JOIN_CARDS.map((card, idx) => {
            const Icon = getCardIcon(card.icon);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 p-8 flex flex-col justify-between transition-all duration-300 shadow-xl backdrop-blur-md group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  {/* Card Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                        {card.title}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400 mt-0.5">{card.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Benefits checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">Key Advantages</span>
                    {card.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <div className="pt-8 relative z-10">
                  <button
                    onClick={() => onApplyCategory(card.title)}
                    className="w-full py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
                  >
                    <span>{card.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
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
