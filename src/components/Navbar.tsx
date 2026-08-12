import React, { useState, useEffect } from "react";
import { Atom, Menu, X, Sparkles, ChevronRight, Compass } from "lucide-react";

interface NavbarProps {
  onOpenAiAssistant: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenChooseProjectModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAiAssistant,
  onNavigate,
  activeSection,
  onOpenChooseProjectModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "research-areas", label: "Research Areas" },
    { id: "projects", label: "Research Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "collaboration", label: "Collaboration" },
    { id: "contact", label: "Contact" },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-lg shadow-cyan-950/20"
          : "bg-transparent py-5 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick("home")}
            className="flex items-center gap-3 group text-left focus:outline-none"
            id="nav-brand-logo"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 p-[1px] shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Atom className="w-6 h-6 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block leading-tight font-display">
                FutureTech <span className="text-cyan-400 font-normal">Innovation Hub</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 block -mt-0.5">
                Global Research Platform
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? "text-cyan-300 font-semibold bg-cyan-950/40 border border-cyan-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/60"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenAiAssistant}
              id="nav-ai-matchmaker-btn"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-violet-300 bg-violet-950/50 border border-violet-500/30 hover:bg-violet-900/40 hover:border-violet-400/50 transition-all shadow-sm"
              title="Get personalized research recommendations via AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
              <span>AI Research Finder</span>
            </button>

            <button
              onClick={() => {
                if (onOpenChooseProjectModal) {
                  onOpenChooseProjectModal();
                } else {
                  handleLinkClick("contact");
                }
              }}
              id="nav-join-project-btn"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
            >
              <span>Join a Research Project</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAiAssistant}
              className="p-2 rounded-lg bg-violet-950/60 border border-violet-500/30 text-violet-300"
              title="AI Project Matcher"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:text-white"
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 font-semibold"
                    : "text-slate-300 hover:bg-slate-900/80 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <button
              onClick={() => {
                onOpenAiAssistant();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-violet-200 bg-violet-950/70 border border-violet-500/40"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>AI Research Assistant</span>
            </button>

            <button
              onClick={() => {
                if (onOpenChooseProjectModal) {
                  onOpenChooseProjectModal();
                  setMobileMenuOpen(false);
                } else {
                  handleLinkClick("contact");
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400"
            >
              <span>Join a Research Project</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
