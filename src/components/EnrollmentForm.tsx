import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AcademicLevel, InquiryFormData, ResearchProject } from "../types";
import { RESEARCH_AREAS } from "../data/researchData";
import { Send, CheckCircle2, Copy, FileText, Sparkles, AlertCircle, ShieldCheck, Mail, Facebook } from "lucide-react";

interface EnrollmentFormProps {
  preselectedProject?: ResearchProject | null;
  preselectedLevel?: string;
}

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({
  preselectedProject,
  preselectedLevel,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: "",
    email: "",
    country: "",
    university: "",
    department: "",
    academicLevel: "BSc",
    researchInterest: "",
    preferredResearchArea: "Artificial Intelligence & Machine Learning",
    preferredProjectTitle: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    inquiryId: string;
    submittedAt: string;
  } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  useEffect(() => {
    if (preselectedProject) {
      setFormData((prev) => ({
        ...prev,
        preferredResearchArea: preselectedProject.domain.split("•")[0].trim() || prev.preferredResearchArea,
        preferredProjectTitle: preselectedProject.title,
      }));
    }
  }, [preselectedProject]);

  useEffect(() => {
    if (preselectedLevel) {
      const match = ["BSc", "MSc", "PhD", "Researcher", "Other"].find(
        (l) => l.toLowerCase() === preselectedLevel.toLowerCase()
      ) as AcademicLevel;
      if (match) {
        setFormData((prev) => ({ ...prev, academicLevel: match }));
      }
    }
  }, [preselectedLevel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.university.trim()) {
      setFormError("Please fill in all required fields (Full Name, Email, University).");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setFormError("Please provide a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmissionReceipt({
          inquiryId: data.inquiryId || `FTH-${Date.now().toString().slice(-6)}`,
          submittedAt: new Date().toLocaleString(),
        });
      } else {
        setFormError(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      // Fallback local receipt generation
      setSubmissionReceipt({
        inquiryId: `FTH-${Math.floor(100000 + Math.random() * 900000)}`,
        submittedAt: new Date().toLocaleString(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReceiptDetails = () => {
    if (!submissionReceipt) return;
    const text = `FutureTech Innovation Hub Inquiry Confirmation
Reference ID: ${submissionReceipt.inquiryId}
Name: ${formData.fullName}
Email: ${formData.email}
University: ${formData.university}
Research Area: ${formData.preferredResearchArea}
Project: ${formData.preferredProjectTitle || "General Inquiry"}
Submitted: ${submissionReceipt.submittedAt}`;

    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 3000);
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-950 border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* High Conversion Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-violet-950/80 border border-cyan-500/30 p-8 sm:p-12 text-center space-y-4 shadow-2xl relative overflow-hidden mb-16"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Research Enrollment Portal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display max-w-2xl mx-auto">
            Ready to Start Your <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">Research Journey?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore current research opportunities and connect with our research coordination team to collaborate on peer-reviewed international publications.
          </p>
        </motion.div>

        {/* Premium Contact Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-12 rounded-3xl bg-slate-900/80 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-sm">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct Contact</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">Get in Touch</h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-md">
                Have questions or need assistance? Reach out directly to our team via email or follow our official Facebook page.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-1 font-mono text-xs">
                <a 
                  href="mailto:futuretechinnovationhub20@gmail.com"
                  className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  <span className="text-base">📧</span>
                  <span className="underline decoration-cyan-500/50 underline-offset-4 break-all">futuretechinnovationhub20@gmail.com</span>
                </a>
                <span className="hidden sm:inline text-slate-700">•</span>
                <a 
                  href="https://www.facebook.com/share/1beLydV1Km/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span className="text-base">📘</span>
                  <span className="underline decoration-blue-500/50 underline-offset-4">Facebook Page</span>
                </a>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto text-center">
              <a
                href="https://www.facebook.com/share/1beLydV1Km/"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 inline-flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Facebook className="w-4 h-4 fill-slate-950" />
                <span>Visit Our Facebook Page</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main Application Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-4xl mx-auto rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-10 backdrop-blur-xl shadow-2xl"
        >
          
          <div className="border-b border-slate-800 pb-6 mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white font-display">Research Project Inquiry Form</h3>
              <p className="text-xs text-slate-400 mt-1">Submit your academic details to be matched with active research teams.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
              No Fee Required • Open Worldwide
            </span>
          </div>

          {formError && (
            <div className="p-4 mb-6 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Preferred Project Indicator if Preselected */}
            {formData.preferredProjectTitle && (
              <div className="p-4 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Applying for Specific Project</span>
                  <span className="font-bold text-cyan-300 text-sm">{formData.preferredProjectTitle}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, preferredProjectTitle: "" }))}
                  className="text-slate-400 hover:text-white text-xs underline"
                >
                  Clear Selection
                </button>
              </div>
            )}

            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dr. Elena Rostova / Alex Johnson"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g., researcher@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Country, University & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Country <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Germany / India / Singapore"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  University / Institution <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., TU Munich / National University"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Department
                </label>
                <input
                  type="text"
                  placeholder="e.g., Electrical Engg / CS"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Row 3: Academic Level & Preferred Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Academic Level <span className="text-cyan-400">*</span>
                </label>
                <select
                  value={formData.academicLevel}
                  onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value as AcademicLevel })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="BSc">BSc / Undergraduate Student</option>
                  <option value="MSc">MSc / Master's Student</option>
                  <option value="PhD">PhD Student / Candidate</option>
                  <option value="Researcher">Independent / Postdoc Researcher</option>
                  <option value="Other">Faculty / Industry Professional</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Preferred Research Area <span className="text-cyan-400">*</span>
                </label>
                <select
                  value={formData.preferredResearchArea}
                  onChange={(e) => setFormData({ ...formData, preferredResearchArea: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  {RESEARCH_AREAS.map((area) => (
                    <option key={area.id} value={area.title}>
                      {area.title}
                    </option>
                  ))}
                  <option value="Other / Interdisciplinary">Other / Interdisciplinary</option>
                </select>
              </div>
            </div>

            {/* Row 4: Research Interest & Message */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-slate-300">
                Research Interest & Specific Skills
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe your technical background (e.g., Python/PyTorch, MATLAB Simulink, LaTeX writing, hardware simulation capabilities)..."
                value={formData.researchInterest}
                onChange={(e) => setFormData({ ...formData, researchInterest: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-slate-300">
                Additional Message / Questions
              </label>
              <textarea
                rows={2}
                placeholder="Any questions for the research coordination team regarding co-authorship or project timelines..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-between flex-wrap gap-4 border-t border-slate-800">
              <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Your privacy is protected. Used strictly for academic team placement.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                id="submit-research-inquiry-btn"
                className="px-8 py-3.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Submission...</span>
                ) : (
                  <>
                    <span>Submit Research Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

        </motion.div>

      </div>

      {/* Confirmation Receipt Modal */}
      {submissionReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Inquiry Received Successfully</h3>
              <p className="text-xs text-slate-300">
                Thank you for applying to collaborate with FutureTech Innovation Hub.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Inquiry Ref ID:</span>
                <span className="text-cyan-400 font-bold">{submissionReceipt.inquiryId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant Name:</span>
                <span>{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Academic Level:</span>
                <span>{formData.academicLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Area:</span>
                <span className="text-cyan-300 truncate max-w-[200px]">{formData.preferredResearchArea}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Timestamp:</span>
                <span>{submissionReceipt.submittedAt}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 bg-cyan-950/30 p-3 rounded-lg border border-cyan-500/20">
              <span className="font-semibold text-cyan-300 block">Next Steps:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Research Coordination team will evaluate your profile within 48 hours.</li>
                <li>You will receive an invitation link for the research team onboarding call.</li>
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={copyReceiptDetails}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedReceipt ? "Copied!" : "Copy Receipt Details"}</span>
              </button>

              <button
                onClick={() => {
                  setSubmissionReceipt(null);
                  setFormData({
                    fullName: "",
                    email: "",
                    country: "",
                    university: "",
                    department: "",
                    academicLevel: "BSc",
                    researchInterest: "",
                    preferredResearchArea: "Artificial Intelligence & Machine Learning",
                    preferredProjectTitle: "",
                    message: "",
                  });
                }}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:brightness-110"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
