import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import multer from "multer";
import { createRequire } from "module";
import { createClient } from "@supabase/supabase-js";
import { pipeline } from "@xenova/transformers";
import OpenAI from "openai";
import dotenv from "dotenv";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

dotenv.config();

const app = express();
const PORT = 3000;

// Multer setup for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Clients Initialization
const supabase = (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) 
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "AI_STUDIO_KEY_PLACEHOLDER",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Embedding Pipeline
let embedder: any = null;
async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embedder;
}

app.use(express.json());

// --- API Routes ---

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", engine: "Gemini 1.5 Flash" });
});

// JSON 404 for API
app.use("/api/*", (req, res, next) => {
  if (req.method === "POST" || req.method === "GET") {
    // If we're here, it means no route matched
    return res.status(404).json({ error: `API route ${req.originalUrl} not found` });
  }
  next();
});

// Resume Analysis Endpoint
app.post("/api/analyze-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let resumeText = "";
    const mimetype = req.file.mimetype;

    if (mimetype === "application/pdf") {
      // PDF handled multimodal below
    } else if (
      mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimetype === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      resumeText = result.value;
    } else {
      return res.status(400).json({ error: "Unsupported file type. Please upload PDF or DOCX." });
    }

    // Prepare prompt for Gemini
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    let result;
    const prompt = `Analyze the provided resume and provide a detailed review in JSON format.
      The analysis should include:
      - atsScore: A number from 0-100 indicating how well the resume is optimized for ATS.
      - grammarScore: A number from 0-100 for writing quality.
      - weakBulletPoints: Array of strings identifying specific bullet points that lack metrics or impact.
      - improvedBullets: Array of strings providing rewritten, high-impact versions of those weak points.
      - missingSkills: Array of recommended technical and soft skills to add.
      - improvements: Specific, actionable suggestions for overall improvement.
      - optimizedKeywords: List of industry-standard keywords to include for better searchability.
      - originalSkillsFound: Array of current skills detected in the resume.

      If only text is provided, analyze the text. If a document is provided, analyze the document directly.`;

    if (mimetype === "application/pdf") {
      // Send PDF bytes directly to Gemini 1.5 Flash
      result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: req.file.buffer.toString("base64"),
            mimeType: "application/pdf"
          }
        }
      ]);
    } else {
      if (!resumeText.trim()) return res.status(400).json({ error: "Empty document" });
      result = await model.generateContent(`${prompt}\n\nResume Text:\n${resumeText}`);
    }

    const responseText = result.response.text();
    const jsonStr = responseText.replace(/```json|```/g, "").trim();
    res.json(JSON.parse(jsonStr || "{}"));
  } catch (error: any) {
    console.error("Resume analysis error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze resume" });
  }
});

// Whisper Speech-to-Text
app.post("/api/speech-to-text", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No audio file" });
    if (!openai) return res.status(503).json({ error: "OpenAI API key not configured for Whisper STT" });

    // Use a temporary name for the buffer
    const transcription = await openai.audio.transcriptions.create({
      file: new File([req.file.buffer], "audio.webm", { type: "audio/webm" }),
      model: "whisper-1",
    });

    res.json({ text: transcription.text });
  } catch (error: any) {
    console.error("Whisper error:", error);
    res.status(500).json({ error: "Speech recognition failed: " + error.message });
  }
});

// Knowledge Base (RAG) Ingestion
app.post("/api/knowledge/ingest", async (req, res) => {
  const { text, metadata } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  if (!supabase) return res.status(503).json({ error: "Supabase not configured" });

  try {
    const embedder = await getEmbedder();
    const output = await embedder(text, { pooling: 'mean', normalize: true });
    const embedding = Array.from(output.data);

    const { data, error } = await supabase
      .from('knowledge_base')
      .insert([
        { content: text, embedding, metadata }
      ]);

    if (error) throw error;
    res.json({ status: "success", data });
  } catch (error: any) {
    console.error("Ingestion error:", error);
    res.status(500).json({ error: "Failed to ingest knowledge: " + error.message });
  }
});

// Knowledge Base (RAG) Query
app.post("/api/knowledge/query", async (req, res) => {
  const { query, limit = 3 } = req.body;
  if (!query) return res.status(400).json({ error: "Query is required" });
  if (!supabase) return res.status(503).json({ error: "Supabase not configured" });

  try {
    const embedder = await getEmbedder();
    const output = await embedder(query, { pooling: 'mean', normalize: true });
    const embedding = Array.from(output.data);

    // Call Supabase RPC for vector search
    // Assumes a function 'match_knowledge' exists in Postgres
    const { data, error } = await supabase.rpc('match_knowledge', {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: limit,
    });

    if (error) throw error;
    res.json({ results: data });
  } catch (error: any) {
    console.error("Query error:", error);
    // Fallback: If RPC doesn't exist, just return an error or try a basic search
    res.status(500).json({ error: "Failed to query knowledge base. Ensure 'match_knowledge' RPC is set up." });
  }
});

// Career Roadmap Generator
app.post("/api/generate-roadmap", async (req, res) => {
  const { targetRole, currentSkills } = req.body;
  if (!targetRole) return res.status(400).json({ error: "Target role is required" });

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a personalized career roadmap for becoming a ${targetRole} starting from current skills: ${currentSkills || 'Not specified'}.
      Provide the response in JSON format.
      Schema:
      {
        "roadmap": [
          {"phase": "string", "objectives": ["string"], "skills": ["string"]}
        ],
        "recommendedProjects": ["string"],
        "interviewPrepSteps": ["string"]
      }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonStr = responseText.replace(/```json|```/g, "").trim();
    res.json(JSON.parse(jsonStr || "{}"));
  } catch (error) {
    console.error("Roadmap error:", error);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

// Job Match Analysis
app.post("/api/analyze-job-match", async (req, res) => {
  const { jd, resume } = req.body;
  if (!jd || !resume) return res.status(400).json({ error: "JD and Resume text are required" });

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Compare the following Job Description (JD) and Resume and provide a match analysis in JSON format.
      JD: ${jd}
      Resume: ${resume}
      
      Schema:
      {
        "matchScore": number,
        "missingKeywords": ["string"],
        "missingSkills": ["string"],
        "recommendations": "string"
      }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonStr = responseText.replace(/```json|```/g, "").trim();
    res.json(JSON.parse(jsonStr || "{}"));
  } catch (error) {
    console.error("Job match error:", error);
    res.status(500).json({ error: "Failed to analyze job match" });
  }
});

// Mock Interview Flow
app.post("/api/mock-interview/start", async (req, res) => {
  const { role } = req.body;
  if (!role) return res.status(400).json({ error: "Role is required" });

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`You are an expert interviewer for a ${role} position. Start the interview by introducing yourself briefly (name yourself CareerPilot AI) and asking the first behavioral or technical question to the candidate. Keep it professional.`);
    res.json({ question: result.response.text() });
  } catch (error) {
    console.error("Interview start error:", error);
    res.status(500).json({ error: "Failed to start interview" });
  }
});

app.post("/api/mock-interview/respond", async (req, res) => {
  const { role, history, userResponse } = req.body;
  if (!userResponse) return res.status(400).json({ error: "User response is required" });

  try {
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are an expert interviewer. Provide brief evaluation of the previous response if relevant, then ask the next question. Do not break character."
    });

    const chatHistory = history.map((m: any) => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: `We are in a mock interview for a ${role} position. Stick to the role of an interviewer.` }] },
        ...chatHistory,
        { role: 'user', parts: [{ text: userResponse }] }
      ]
    });
    res.json({ nextQuestion: result.response.text() });
  } catch (error) {
    console.error("Interview respond error:", error);
    res.status(500).json({ error: "Failed to process response" });
  }
});

app.post("/api/mock-interview/feedback", async (req, res) => {
  const { role, history } = req.body;
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Analyze this mock interview transcript for a ${role} position and provide a detailed performance report in JSON format.
      Transcript: ${JSON.stringify(history)}
      
      Schema:
      {
        "clarityScore": number,
        "technicalAccuracy": number,
        "communicationQuality": number,
        "fillerWordCount": number,
        "speakingPace": "string",
        "areasForImprovement": ["string"],
        "overallSummary": "string"
      }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonStr = responseText.replace(/```json|```/g, "").trim();
    res.json(JSON.parse(jsonStr || "{}"));
  } catch (error) {
    console.error("Interview feedback error:", error);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
});

// Vite Middleware for Dev
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
