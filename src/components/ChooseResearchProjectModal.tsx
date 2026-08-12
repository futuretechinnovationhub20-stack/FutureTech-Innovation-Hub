import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown, ChevronUp, Sparkles, Clock, Users, ArrowRight, ShieldCheck, CheckCircle2, Star } from "lucide-react";
import { ResearchProjectPlan, RESEARCH_PROJECT_PLANS } from "../data/projectPlansData";

interface ChooseResearchProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyForPlan?: (plan: ResearchProjectPlan, selectedPosition?: string) => void;
}

export const ChooseResearchProjectModal: React.FC<ChooseResearchProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Track expanded cards by plan ID
  const [expandedPlanIds, setExpandedPlanIds] = useState<Record<string, boolean>>({
    "q1-project": true, // Default open Q1 for quick preview
  });

  const toggleExpand = (id: string) => {
    setExpandedPlanIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-900 border border-cyan-500/40 p-5 sm:p-8 space-y-6 shadow-2xl my-6 text-slate-100"
          >
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Research & Publication Tracks</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight">
                Choose Your <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">Research Project</span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Select a publication-oriented collaborative project. Structured literature review, simulation modeling, and peer-reviewed co-authorship support.
              </p>
            </div>

            {/* 4 Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {RESEARCH_PROJECT_PLANS.map((plan) => {
                const isExpanded = !!expandedPlanIds[plan.id];
                const mainAuthorPricing = plan.authorPositions[0];

                return (
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    key={plan.id}
                    className={`relative rounded-2xl bg-slate-950/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                      plan.isFeatured
                        ? "border-cyan-500/60 shadow-[0_0_30px_rgba(34,213,238,0.15)] bg-gradient-to-b from-cyan-950/20 via-slate-950 to-slate-950"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {/* Featured Badge */}
                    {plan.isFeatured && (
                      <div className="absolute top-0 right-0">
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md">
                          <Star className="w-3 h-3 fill-slate-950" />
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Card Header Content */}
                    <div className="p-5 sm:p-6 space-y-4">
                      
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-wide">
                          {plan.title}
                        </h3>
                        <p className="text-xs font-semibold text-cyan-400/90 font-mono mt-0.5">
                          {plan.subtitle}
                        </p>
                      </div>

                      {/* Metadata Pills */}
                      <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
                        {plan.duration && (
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Duration: {plan.duration}</span>
                          </span>
                        )}

                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-violet-400" />
                          <span>Team: {plan.teamMembers}</span>
                        </span>
                      </div>

                      {/* Quick Price Overview (Main Author & Advance) */}
                      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 font-mono text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Main Author Investment:</span>
                          <span className="font-extrabold text-cyan-300">
                            {mainAuthorPricing?.bdtPrice} | <span className="text-white">{mainAuthorPricing?.intlPrice}</span>
                          </span>
                        </div>

                        {plan.totalCost && (
                          <div className="flex items-center justify-between border-t border-slate-800/80 pt-1.5 text-[11px]">
                            <span className="text-slate-400">Total Project Cost:</span>
                            <span className="font-semibold text-slate-200">
                              {plan.totalCost.bdt} | International: {plan.totalCost.intl}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between border-t border-slate-800/80 pt-1.5 text-[11px]">
                          <span className="text-slate-400">Advance Payment:</span>
                          <span className="font-bold text-emerald-400">
                            {plan.advance.bdt} | International: {plan.advance.intl}
                          </span>
                        </div>
                      </div>

                      {/* Notes / Refund Policy */}
                      <div className="space-y-1 text-[11px] text-slate-400 font-mono">
                        {plan.refundPolicy && (
                          <p className="text-amber-300/90 flex items-center gap-1">
                            <span>•</span>
                            <span>{plan.refundPolicy}</span>
                          </p>
                        )}
                        <p className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{plan.paymentNote}</span>
                        </p>
                      </div>

                      {/* Expanded Author Positions List */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-slate-800/80 space-y-2 animate-fadeIn">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                            Author Position Pricing Breakdown:
                          </span>

                          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 text-xs font-mono">
                            {plan.authorPositions.map((ap) => (
                              <div
                                key={ap.position}
                                className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-between hover:border-cyan-500/30 transition-all"
                              >
                                <span className="font-semibold text-slate-200">{ap.position}</span>
                                <div className="text-right">
                                  <span className="text-cyan-300 font-bold">{ap.bdtPrice}</span>
                                  <span className="text-slate-500 text-[10px] mx-1">|</span>
                                  <span className="text-slate-300 font-semibold">{ap.intlPrice}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Card Action Footer */}
                    <div className="p-4 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between gap-3">
                      
                      {/* View Details Button */}
                      <button
                        onClick={() => toggleExpand(plan.id)}
                        className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 hover:text-white transition-all cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {/* Apply Now Button */}
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdZ8Pe-_oGpaF4BHFk74WfYbqPKEfIQGitC6n2vGDd0AnVegg/viewform?usp=publish-editor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 text-slate-950 font-extrabold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95 text-center"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>

                    </div>

                  </motion.div>
                );
              })}
            </div>

            {/* Small Disclaimer */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed font-mono text-center max-w-3xl mx-auto">
              Publication targets are subject to research quality, peer review, editorial decisions, and journal/conference policies. Participation does not guarantee publication or acceptance.
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
