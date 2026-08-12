import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini Client lazily or if key present
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for research inquiries
  const inquiries: any[] = [];

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Submit Inquiry Endpoint
  app.post("/api/inquiries", (req, res) => {
    try {
      const inquiry = {
        id: `FTH-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`,
        ...req.body,
        submittedAt: new Date().toISOString(),
        status: "RECEIVED",
      };
      inquiries.push(inquiry);
      res.status(201).json({
        success: true,
        message: "Research inquiry received successfully.",
        inquiryId: inquiry.id,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to process inquiry" });
    }
  });

  // Smart Research Assistant / Project Matchmaker (Powered by Gemini API)
  app.post("/api/ai/recommend", async (req, res) => {
    try {
      const { researchArea, interests, academicLevel } = req.body;
      const area = researchArea || "Artificial Intelligence & Machine Learning";
      const level = academicLevel || "Undergraduate Student (BSc)";
      const userInterests = interests || "general engineering and simulation";

      const gemini = getGeminiClient();

      if (gemini) {
        try {
          const prompt = `You are the lead academic coordinator at FutureTech Innovation Hub.
Given a student researcher with the following profile:
- Academic Level: ${level}
- Research Domain: ${area}
- Key Skills/Interests: ${userInterests}

Provide a structured research recommendation in valid JSON format matching this schema:
{
  "recommendation": "A encouraging 2-sentence summary tailored to their level and domain explaining why FutureTech Hub's collaborative publication track is ideal for them.",
  "suggestedProjectTitles": ["Project Title 1 (Specific & IEEE style)", "Project Title 2", "Project Title 3"],
  "publicationStrategy": "A 2-sentence roadmap outlining literature review, simulation tools, and target journal/conference strategy (e.g., IEEE/Scopus)."
}
Do NOT include markdown formatting or backticks around the JSON.`;

          const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
            },
          });

          if (response.text) {
            const parsed = JSON.parse(response.text);
            return res.json({
              success: true,
              isRealGemini: true,
              recommendation: parsed.recommendation,
              suggestedProjectTitles: parsed.suggestedProjectTitles,
              publicationStrategy: parsed.publicationStrategy,
            });
          }
        } catch (aiErr) {
          console.error("Gemini API call error, falling back to rule-based engine:", aiErr);
        }
      }

      // Rule-based fallback if GEMINI_API_KEY is not set or API call fails
      let projectTitles: string[] = [];
      let strategy = "";

      if (area.includes("Cybersecurity")) {
        projectTitles = [
          "AI-Driven Threat Detection & Ransomware Prevention in Cloud Networks",
          "Quantum-Resilient Cryptographic Protocol Design for IoT Networks",
          "Zero-Trust Architecture & Federated Learning for Intrusion Detection",
        ];
        strategy = "Focus on analyzing recent 2024-2026 IEEE Transactions on Information Forensics and Security, build a benchmark simulation topology, and draft an IEEE two-column paper.";
      } else if (area.includes("Smart Grid") || area.includes("Power Systems")) {
        projectTitles = [
          "AI-Based Cyberattack & Anomaly Detection in Microgrid Systems",
          "Deep Reinforcement Learning for Dynamic Power Grid Load Dispatch",
          "Resilient Distributed Energy Management for Next-Gen Smart Grids",
        ];
        strategy = "Formulate MATLAB Simulink microgrid models, run IEEE 39-bus power system fault simulations, and structure results for IEEE Sustainable Energy or PES submissions.";
      } else if (area.includes("Renewable Energy") || area.includes("Photovoltaic")) {
        projectTitles = [
          "Floating Solar PV Thermal Modeling & Hybrid Energy Yield Optimization",
          "Machine Learning Prediction of Degradation in Perovskite Solar Cells",
          "Wind-Solar Hybrid Energy Storage Integration using Intelligent Control",
        ];
        strategy = "Execute SAM (System Advisor Model) energy simulations, benchmark performance metrics against standard benchmarks, and prepare paper for Q1/Q2 energy journals or IEEE conference.";
      } else {
        projectTitles = [
          "Deep Learning Optimization Frameworks for Complex Engineering Systems",
          "Edge AI & IoT Sensor Network Optimization for Real-Time Monitoring",
          "Transformer-Based Anomaly Detection in Multimodal Industrial Datasets",
        ];
        strategy = "Establish a novel theoretical framework, conduct comparative PyTorch/TensorFlow benchmarking, and draft structured sections for IEEE conference proceedings.";
      }

      return res.json({
        success: true,
        isRealGemini: false,
        recommendation: `Based on your profile as a ${level} specializing in ${area}, your background is ideal for high-impact publication projects at FutureTech Innovation Hub. Our research coordination team will pair you with experienced lead authors to streamline co-authorship.`,
        suggestedProjectTitles: projectTitles,
        publicationStrategy: strategy,
      });
    } catch (error) {
      return res.json({
        success: true,
        isRealGemini: false,
        recommendation: "Welcome to FutureTech Innovation Hub! Your profile aligns strongly with our collaborative research tracks targeting peer-reviewed publications.",
        suggestedProjectTitles: [
          "AI-Based Cyberattack Prediction for Smart Grid Systems",
          "Floating Solar PV & Wind Hybrid Power Optimization",
          "Perovskite Solar Cell Efficiency Modeling & Machine Learning",
        ],
        publicationStrategy: "Select a project matching your foundational skills, collaborate with international co-authors, and aim for IEEE conference submissions.",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FutureTech Innovation Hub server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
