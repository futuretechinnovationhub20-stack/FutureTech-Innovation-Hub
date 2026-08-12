import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RESEARCH_PROJECTS } from "../data/researchData";
import { ResearchProject } from "../types";
import {
  Search,
  Users,
  Award,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  X,
  Send,
  CheckCircle2,
  Clock,
  BookOpen,
} from "lucide-react";

interface ResearchProjectsProps {
  selectedCategoryFilter: string;
  onApplyForProject: (project: ResearchProject) => void;
}

export const ResearchProjects: React.FC<ResearchProjectsProps> = ({
  selectedCategoryFilter,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProject, setActiveModalProject] = useState<ResearchProject | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("futuretech_saved_projects");
      if (saved) {
        setBookmarkedIds(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter((item) => item !== id);
    } else {
      updated = [...bookmarkedIds, id];
    }
    setBookmarkedIds(updated);
    try {
      localStorage.setItem("futuretech_saved_projects", JSON.stringify(updated));
    } catch (err) {
      // ignore
    }
  };

  const categories = ["All", "AI", "Energy", "Cybersecurity", "Smart Grid", "Material Science", "Other"];

  const filteredProjects = RESEARCH_PROJECTS.filter((proj) => {
    const matchesCategory =
      activeCategory === "All" || proj.domainCategory === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative bg-slate-950 border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Collaboration Calls</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
            Current Research <span className="text-cyan-400">Opportunities</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Explore active publication-oriented research projects, collaborate with international co-authors, and pursue peer-reviewed journal and IEEE conference milestones.
          </p>
        </motion.div>

        {/* Search & Category Filter Toolbar */}
        <div className="mt-12 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                    }`}
                  >
                    {cat}
                  </motion.button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics, keywords, domain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Projects Cards Grid */}
        <motion.div 
          layout
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((proj, index) => {
            const isBookmarked = bookmarkedIds.includes(proj.id);
            const isOpen = proj.status === "Open Positions";

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.015 }}
                key={proj.id}
                onClick={() => setActiveModalProject(proj)}
                className="group cursor-pointer rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-cyan-950/30 backdrop-blur-md relative"
              >
                <div className="space-y-4">
                  
                  {/* Status Badge & Bookmark */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold ${
                        isOpen
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-950/80 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {proj.status}
                    </span>

                    <button
                      onClick={(e) => toggleBookmark(proj.id, e)}
                      className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                      title={isBookmarked ? "Remove bookmark" : "Save project"}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {proj.title}
                  </h3>

                  {/* Domain Tags */}
                  <div className="text-xs font-mono text-cyan-400 bg-cyan-950/30 px-2.5 py-1 rounded-md border border-cyan-500/20 inline-block">
                    {proj.domain}
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {proj.summary}
                  </p>

                  {/* Key Metadata Table */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        Target:
                      </span>
                      <span className="font-medium text-slate-200 text-[11px] truncate max-w-[170px]">
                        {proj.publicationTarget}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        Duration:
                      </span>
                      <span className="font-mono text-slate-200 text-[11px]">{proj.duration}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        Positions:
                      </span>
                      <span className="font-medium text-emerald-300 text-[11px]">
                        {proj.availablePositions}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Bottom CTA */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">ID: {proj.id}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProject(proj);
                    }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:bg-cyan-900/50 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Project</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
            <p className="text-slate-400 text-sm">No research projects match your selected filters.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Project Details Modal Drawer */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-8">
                <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                  {activeModalProject.domainCategory} Research Opportunity
                </span>
                <h3 className="text-2xl font-bold text-white font-display leading-tight">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400">{activeModalProject.domain}</p>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400">Project Overview</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeModalProject.summary}
                </p>
              </div>

              {/* Key Objectives */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400">Core Objectives</h4>
                <div className="space-y-2">
                  {activeModalProject.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400">Required Skills & Prerequisites</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.prerequisites.map((pre, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-200 border border-slate-700">
                      {pre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Lead & Publication Target */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Research Team Lead</span>
                  <span className="font-semibold text-white">{activeModalProject.teamLead}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Publication Target</span>
                  <span className="font-semibold text-violet-300">{activeModalProject.publicationTarget}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
                >
                  Close Window
                </button>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdZ8Pe-_oGpaF4BHFk74WfYbqPKEfIQGitC6n2vGDd0AnVegg/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActiveModalProject(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 text-slate-950 text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <span>Apply / Enquire for this Project</span>
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

