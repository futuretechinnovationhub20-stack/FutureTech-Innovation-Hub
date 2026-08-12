import React from "react";
import { Atom, ArrowUp, Mail, Facebook, Linkedin } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Atom className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white font-display">
                FutureTech <span className="text-cyan-400 font-normal">Innovation Hub</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              A global research collaboration platform connecting students, researchers, and academic professionals on publication-oriented research across engineering, AI, renewable energy, cybersecurity, smart grid, and material science.
            </p>

            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest pt-1">
              "Research • Collaborate • Publish • Innovate"
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Research Areas", "Research Projects", "Achievements", "Collaboration", "Contact"].map((link) => {
                const id = link.toLowerCase().replace(/\s+/g, "-");
                return (
                  <li key={link}>
                    <button
                      onClick={() => onNavigate(id)}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Research Areas */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">Research Areas</h4>
            <ul className="space-y-2">
              {["AI & Machine Learning", "Cybersecurity", "Renewable Energy", "Smart Grid", "Power Systems", "Material Science"].map((area) => (
                <li key={area}>
                  <button
                    onClick={() => onNavigate("research-areas")}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {area}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">Connect</h4>
            
            <div className="text-white font-semibold font-display text-xs">
              FutureTech Innovation Hub
            </div>

            <div className="space-y-2 text-xs font-mono">
              <a
                href="mailto:futuretechinnovationhub20@gmail.com"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors break-all"
              >
                <span>📧</span>
                <span>futuretechinnovationhub20@gmail.com</span>
              </a>

              <a
                href="https://www.facebook.com/share/1beLydV1Km/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <span>📘</span>
                <span>Facebook</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="mailto:futuretechinnovationhub20@gmail.com"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com/share/1beLydV1Km/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} FutureTech Innovation Hub. Global Research Organization.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
