import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Bot, ArrowRight } from "lucide-react";
import { RESEARCH_AREAS } from "../data/researchData";

interface AiProjectFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedProject: (title: string) => void;
}

export const AiProjectFinderModal: React.FC<AiProjectFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectRecommendedProject,
}) => {
  const [academicLevel, setAcademicLevel] = useState("Undergraduate (BSc)");
  const [researchArea, setResearchArea] = useState("Artificial Intelligence & Machine Learning");
  const [interests, setInterests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    recommendation?: string;
    suggestedProjectTitles?: string[];
    publicationStrategy?: string;
  } | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          academicLevel,
          researchArea,
          interests,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult({
          recommendation: data.recommendation,
          suggestedProjectTitles: data.suggestedProjectTitles || [],
          publicationStrategy: data.publicationStrategy,
        });
      }
    } catch (err) {
      setResult({
        recommendation: "Your profile is a great fit for interdisciplinary publication projects at FutureTech Innovation Hub.",
        suggestedProjectTitles: [
          "AI-Based Cyberattack Prediction for Smart Grid Systems",
          "Floating Solar PV & Hybrid Renewable Power Optimization",
          "Quantum-Safe Cryptography in Distributed Energy Systems",
        ],
        publicationStrategy: "Focus on literature review of 2024-2026 IEEE papers and execute baseline simulation benchmarks.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-violet-500/40 p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-950 border border-violet-500/40 flex items-center justify-center text-violet-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">AI Research Matchmaker</h3>
                <p className="text-xs text-slate-400">FutureTech Smart Academic Advisor Engine</p>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-mono">Academic Level</label>
                <select
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="Undergraduate (BSc)">Undergraduate Student (BSc)</option>
                  <option value="Master's Student (MSc)">Master's Student (MSc)</option>
                  <option value="PhD Candidate">PhD Student / Candidate</option>
                  <option value="Independent Researcher">Independent Researcher / Postdoc</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-mono">Preferred Research Domain</label>
                <select
                  value={researchArea}
                  onChange={(e) => setResearchArea(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-violet-500"
                >
                  {RESEARCH_AREAS.map((a) => (
                    <option key={a.id} value={a.title}>
                      {a.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-mono">Technical Background & Key Tools (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Python, PyTorch, MATLAB Simulink, C++, Power Systems..."
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 text-white font-bold text-xs hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span>Analyzing Academic Profile...</span>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span>Generate Tailored Research Recommendations</span>
                  </>
                )}
              </button>
            </form>

            {/* AI Results */}
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 space-y-4"
              >
                <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-500/30 text-xs space-y-2">
                  <span className="font-semibold text-violet-300 uppercase tracking-wider block font-mono">
                    AI Recommendation Summary
                  </span>
                  <p className="text-slate-300 leading-relaxed">{result.recommendation}</p>
                </div>

                {result.suggestedProjectTitles && result.suggestedProjectTitles.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-slate-400">Recommended Project Targets</span>
                    <div className="space-y-2">
                      {result.suggestedProjectTitles.map((title, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            onSelectRecommendedProject(title);
                            onClose();
                          }}
                          className="w-full text-left p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <span className="text-xs font-semibold text-white group-hover:text-cyan-300">{title}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {result.publicationStrategy && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-mono text-cyan-400 block text-[10px] uppercase">Publication Strategy Advice</span>
                    <p>{result.publicationStrategy}</p>
                  </div>
                )}
              </motion.div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

