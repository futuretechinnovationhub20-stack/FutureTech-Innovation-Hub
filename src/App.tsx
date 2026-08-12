import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ResearchAreas } from "./components/ResearchAreas";
import { ResearchProjects } from "./components/ResearchProjects";
import { Achievements } from "./components/Achievements";
import { GlobalCollaboration } from "./components/GlobalCollaboration";
import { HowItWorks } from "./components/HowItWorks";
import { WhoCanJoin } from "./components/WhoCanJoin";
import { EnrollmentForm } from "./components/EnrollmentForm";
import { Footer } from "./components/Footer";
import { AiProjectFinderModal } from "./components/AiProjectFinderModal";
import { ChooseResearchProjectModal } from "./components/ChooseResearchProjectModal";
import { ResearchProjectApplicationModal } from "./components/ResearchProjectApplicationModal";
import { ResearchProject } from "./types";
import { ResearchProjectPlan } from "./data/projectPlansData";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [preselectedProject, setPreselectedProject] = useState<ResearchProject | null>(null);
  const [preselectedLevel, setPreselectedLevel] = useState<string>("");
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  // New Modals for Project Selection & Application
  const [chooseProjectModalOpen, setChooseProjectModalOpen] = useState(false);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [selectedProjectPlan, setSelectedProjectPlan] = useState<ResearchProjectPlan | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectArea = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    scrollToSection("projects");
  };

  const handleApplyForProject = (project: ResearchProject) => {
    setPreselectedProject(project);
    scrollToSection("contact");
  };

  const handleApplyCategory = (categoryTitle: string) => {
    setPreselectedLevel(categoryTitle);
    scrollToSection("contact");
  };

  const handleOpenChooseProjectModal = () => {
    setChooseProjectModalOpen(true);
  };

  const handleApplyForPlan = (plan: ResearchProjectPlan) => {
    setSelectedProjectPlan(plan);
    setChooseProjectModalOpen(false);
    setApplicationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      {/* Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
        onOpenChooseProjectModal={handleOpenChooseProjectModal}
      />

      {/* Hero Section */}
      <Hero
        onExploreProjects={() => scrollToSection("projects")}
        onJoinCommunity={handleOpenChooseProjectModal}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* About Section */}
      <About onExploreProjects={() => scrollToSection("projects")} />

      {/* Research Areas Section */}
      <ResearchAreas onSelectArea={handleSelectArea} />

      {/* Research Projects Showcase Section */}
      <ResearchProjects
        selectedCategoryFilter={selectedCategoryFilter}
        onApplyForProject={handleApplyForProject}
      />

      {/* Achievements Section */}
      <Achievements />

      {/* Global Collaboration Section */}
      <GlobalCollaboration onJoinCollaborator={handleOpenChooseProjectModal} />

      {/* How It Works Timeline Section */}
      <HowItWorks />

      {/* Who Can Join Section */}
      <WhoCanJoin onApplyCategory={handleApplyCategory} />

      {/* Research Project Enrollment & Inquiry Form */}
      <EnrollmentForm
        preselectedProject={preselectedProject}
        preselectedLevel={preselectedLevel}
      />

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* AI Research Finder Modal */}
      <AiProjectFinderModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onSelectRecommendedProject={(projectTitle) => {
          setPreselectedProject({
            id: "rec-ai",
            title: projectTitle,
            domain: "AI • Collaborative Research",
            domainCategory: "AI",
            publicationTarget: "IEEE Conference Target",
            duration: "4-6 Months",
            availablePositions: "2 Research Co-Authors",
            status: "Open Positions",
            summary: "Recommended by FutureTech AI Academic Advisor.",
            objectives: ["Formulate literature synthesis", "Execute baseline modeling"],
            prerequisites: ["Motivation for academic writing"],
            teamLead: "FutureTech Academic Lead",
          });
          scrollToSection("contact");
        }}
      />

      {/* First Modal: Choose Your Research Project */}
      <ChooseResearchProjectModal
        isOpen={chooseProjectModalOpen}
        onClose={() => setChooseProjectModalOpen(false)}
        onApplyForPlan={handleApplyForPlan}
      />

      {/* Second Modal: Research Project Application */}
      <ResearchProjectApplicationModal
        isOpen={applicationModalOpen}
        onClose={() => setApplicationModalOpen(false)}
        selectedPlan={selectedProjectPlan}
      />
    </div>
  );
}
