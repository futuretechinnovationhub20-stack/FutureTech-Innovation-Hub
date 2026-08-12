import React, { useState, useEffect } from "react";
import { X, CheckCircle, Send, Sparkles, ShieldCheck, DollarSign } from "lucide-react";
import { ResearchProjectPlan, RESEARCH_PROJECT_PLANS } from "../data/projectPlansData";

interface ResearchProjectApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: ResearchProjectPlan | null;
  initialPosition?: string;
}

export const ResearchProjectApplicationModal: React.FC<ResearchProjectApplicationModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  initialPosition,
}) => {
  const [currentPlan, setCurrentPlan] = useState<ResearchProjectPlan>(
    selectedPlan || RESEARCH_PROJECT_PLANS[0]
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [academicLevel, setAcademicLevel] = useState("BSc");
  const [researchArea, setResearchArea] = useState("Artificial Intelligence & Machine Learning");
  const [authorPosition, setAuthorPosition] = useState("Main Author");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync selected plan and initial position when props change
  useEffect(() => {
    if (selectedPlan) {
      setCurrentPlan(selectedPlan);
      if (
        initialPosition &&
        selectedPlan.authorPositions.some((p) => p.position === initialPosition)
      ) {
        setAuthorPosition(initialPosition);
      } else {
        setAuthorPosition(selectedPlan.authorPositions[0]?.position || "Main Author");
      }
    }
  }, [selectedPlan, initialPosition]);

  // When current plan changes, adjust author position if current selection isn't valid
  useEffect(() => {
    if (currentPlan) {
      const isValidPos = currentPlan.authorPositions.some((p) => p.position === authorPosition);
      if (!isValidPos) {
        setAuthorPosition(currentPlan.authorPositions[0]?.position || "Main Author");
      }
    }
  }, [currentPlan]);

  if (!isOpen) return null;

  const currentPricing = currentPlan.authorPositions.find((p) => p.position === authorPosition) || currentPlan.authorPositions[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !email.trim() || !country.trim() || !university.trim() || !department.trim()) {
      setErrorMsg("Please fill in all required fields marked with *");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFullName("");
    setEmail("");
    setCountry("");
    setUniversity("");
    setDepartment("");
    setAcademicLevel("BSc");
    setResearchArea("Artificial Intelligence & Machine Learning");
    setMessage("");
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl my-8 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display">Research Project Application</h3>
            <p className="text-xs text-slate-400">FutureTech Innovation Hub • Global Collaboration Track</p>
          </div>
        </div>

        {isSubmitted ? (
          /* Submission Success View */
          <div className="py-6 space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-xl shadow-emerald-950/50">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <h4 className="text-xl font-bold text-white font-display">Application Received!</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Thank you for your interest in FutureTech Innovation Hub. Your research project inquiry has been received successfully. Our research coordination team will contact you regarding availability and next steps.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-left space-y-2 text-slate-300 max-w-lg mx-auto">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-500">Selected Track:</span>
                <span className="text-cyan-400 font-bold">{currentPlan.title}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-500">Author Position:</span>
                <span className="text-violet-300">{authorPosition}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-500">Applicant:</span>
                <span>{fullName} ({email})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Position Investment:</span>
                <span className="text-emerald-400 font-bold">{currentPricing?.bdtPrice} / {currentPricing?.intlPrice}</span>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg"
            >
              Done & Close
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">

            {/* Selected Project Box */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 block font-semibold">
                  Selected Research Project
                </span>
                <h4 className="text-sm font-bold text-white font-display">{currentPlan.title}</h4>
                <p className="text-[11px] text-slate-400">{currentPlan.subtitle} • {currentPlan.teamMembers}</p>
              </div>

              {/* Selector to change project plan inside modal */}
              <select
                value={currentPlan.id}
                onChange={(e) => {
                  const found = RESEARCH_PROJECT_PLANS.find((p) => p.id === e.target.value);
                  if (found) setCurrentPlan(found);
                }}
                className="bg-slate-950 border border-cyan-500/40 rounded-lg px-3 py-1.5 text-xs text-cyan-300 focus:outline-none"
              >
                {RESEARCH_PROJECT_PLANS.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.title}
                  </option>
                ))}
              </select>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-mono text-[11px]">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-mono text-[11px]">
                  Email <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex.morgan@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Country */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-mono text-[11px]">
                  Country <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bangladesh / United States / Germany"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* University / Institution */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-mono text-[11px]">
                  University / Institution <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BUET / MIT / TU Munich"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Department */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-mono text-[11px]">
                  Department <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Electrical & Electronic Engineering / CS"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Academic Level */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-mono text-[11px]">
                  Academic Level <span className="text-cyan-400">*</span>
                </label>
                <select
                  value={academicLevel}
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="BSc">BSc</option>
                  <option value="MSc">MSc</option>
                  <option value="PhD">PhD</option>
                  <option value="Researcher">Researcher</option>
                  <option value="Faculty / Academic">Faculty / Academic</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Research Area */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-slate-300 font-mono text-[11px]">
                  Research Area <span className="text-cyan-400">*</span>
                </label>
                <select
                  value={researchArea}
                  onChange={(e) => setResearchArea(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Smart Grid">Smart Grid</option>
                  <option value="Renewable Energy">Renewable Energy</option>
                  <option value="Floating Photovoltaic">Floating Photovoltaic</option>
                  <option value="Power Systems">Power Systems</option>
                  <option value="Material Science">Material Science</option>
                  <option value="Electrical & Electronic Engineering">Electrical & Electronic Engineering</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Author Position Dropdown (Changes according to selected project) */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-slate-300 font-mono text-[11px]">
                  Author Position <span className="text-cyan-400">*</span>
                </label>
                <select
                  value={authorPosition}
                  onChange={(e) => setAuthorPosition(e.target.value)}
                  className="w-full bg-slate-950 border border-cyan-500/40 rounded-xl px-3.5 py-2.5 text-white font-semibold focus:outline-none focus:border-cyan-400"
                >
                  {currentPlan.authorPositions.map((p) => (
                    <option key={p.position} value={p.position}>
                      {p.position} — BDT {p.bdtPrice} | International {p.intlPrice}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Selected Price Banner before submission */}
            {currentPricing && (
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Selected Position Investment:</span>
                  <span className="text-cyan-300 font-bold">{authorPosition}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 font-mono block">BDT Price</span>
                    <span className="text-base font-extrabold text-white font-mono">{currentPricing.bdtPrice}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 font-mono block">International Price</span>
                    <span className="text-base font-extrabold text-cyan-300 font-mono">{currentPricing.intlPrice}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                  <span>Advance Payment:</span>
                  <span className="text-emerald-400 font-semibold">{currentPlan.advance.bdt} | International: {currentPlan.advance.intl}</span>
                </div>
              </div>
            )}

            {/* Research Interest / Message */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-mono text-[11px]">
                Research Interest / Message <span className="text-cyan-400">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe your research experience, technical skills (Python, MATLAB, LaTeX, etc.), or any questions..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Disclaimer & Submission */}
            <div className="pt-2 space-y-4">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[10px] text-slate-400 leading-relaxed font-mono">
                Publication targets are subject to research quality, peer review, editorial decisions, and journal/conference policies. Participation does not guarantee publication or acceptance.
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Research Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Research Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        )}

        {/* Bottom Contact Questions Section */}
        <div className="pt-4 border-t border-slate-800 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-300">
            Have questions about a research project?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <a
              href="mailto:futuretechinnovationhub20@gmail.com"
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>📧</span>
              <span>Email us: <span className="underline underline-offset-4">futuretechinnovationhub20@gmail.com</span></span>
            </a>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <a
              href="https://www.facebook.com/share/1beLydV1Km/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>📘</span>
              <span className="underline underline-offset-4">Visit our Facebook Page</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
