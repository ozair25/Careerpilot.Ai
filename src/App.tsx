import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line 
} from 'recharts';
import { 
  Layout, 
  Menu, 
  LogOut, 
  FileText, 
  MessageSquare, 
  Map, 
  ChevronRight, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  TrendingUp,
  BrainCircuit,
  Mic,
  Star,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { cn } from './lib/utils';
import Markdown from 'react-markdown';

// --- Components ---

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50, scale: 0.9 }} 
    animate={{ opacity: 1, y: 0, scale: 1 }} 
    exit={{ opacity: 0, scale: 0.9 }}
    className={cn(
      "fixed bottom-10 right-10 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border",
      type === 'success' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"
    )}
  >
    {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
    <p className="text-sm font-bold tracking-tight">{message}</p>
    <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
      <LogOut className="rotate-45" size={14} />
    </button>
  </motion.div>
);

const Button = ({ className, variant = 'primary', ...props }: any) => {
  const variants: any = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20",
    secondary: "bg-white text-black hover:bg-slate-200 shadow-xl",
    ghost: "text-slate-400 hover:bg-white/5 hover:text-white",
    outline: "border border-white/10 text-white hover:bg-white/5"
  };
  return (
    <button 
      className={cn(
        "px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none tracking-tight",
        variants[variant],
        className
      )} 
      {...props} 
    />
  );
};

const Card = ({ children, className }: any) => (
  <div className={cn("glass-card p-6", className)}>
    {children}
  </div>
);

// --- Sections ---

const LandingPage = () => {
  const { loginWithGoogle } = useAuth();
  
  return (
    <div className="min-h-screen bg-[#050508] text-white geometric-bg">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#050508]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <div className="w-5 h-5 border-2 border-white rotate-45"></div>
            </div>
            <span className="text-xl font-bold tracking-tight">CareerPilot AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Success Stories</a>
            <Button onClick={loginWithGoogle}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-48 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-400 text-xs font-black uppercase tracking-widest border border-indigo-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Next-Gen Career Intelligence
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[1] tracking-tighter">
              Master Interviews. <br />
              <span className="text-indigo-500">Get Hired.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-medium">
              Your personal AI-powered career coach. Analyze resumes, practice mock interviews, and build personalized roadmaps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={loginWithGoogle} className="text-lg py-5 px-10">Start Mock Interview</Button>
              <Button variant="outline" className="text-lg py-5 px-10">Analyze Resume</Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-indigo-600/20 blur-[120px] rounded-full -z-10"></div>
            <Card className="p-2 border-white/10 bg-white/5 backdrop-blur-2xl">
               <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2076" 
                alt="Professional Workspace" 
                className="w-full h-auto rounded-2xl grayscale"
              />
            </Card>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-10 -left-10 bg-[#0A0A10]/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-600/20 text-cyan-400 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">ATS Match Score</div>
                  <div className="text-2xl font-black text-cyan-400 font-mono">84%</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12 text-center">
          {[
            { label: "AI Interviews Conducted", value: "50K+" },
            { label: "Average Salary Boost", value: "35%" },
            { label: "Positive Feedback", value: "99%" },
            { label: "Dream Jobs Secured", value: "12K+" },
          ].map((stat, i) => (
            <div key={i} className="flex-1 min-w-[200px]">
              <div className="text-5xl font-black mb-3 font-mono">{stat.value}</div>
              <div className="text-xs font-black text-slate-500 tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-5xl font-black tracking-tight">Everything you need to level up</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium">Tools designed for the modern elite candidate.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="text-indigo-400" />,
                title: "Resume Optimizer",
                desc: "Get deep ATS insights and bullet point suggestions that actually catch recruiters' eyes."
              },
              {
                icon: <MessageSquare className="text-cyan-400" />,
                title: "Mock Interviewer",
                desc: "Practice with a dynamic AI that adapts to your role and gives real-time feedback."
              },
              {
                icon: <Map className="text-purple-400" />,
                title: "Career Roadmap",
                desc: "Step-by-step personalized learning paths built from where you are to where you want to be."
              }
            ].map((f, i) => (
              <Card key={i} className="group hover:bg-white/[0.05] transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-[#0A0A10]/50 border-white/10 p-12 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
              <div className="flex-1 space-y-10">
                <h2 className="text-5xl font-black leading-tight tracking-tighter">Join the elite rank of candidates.</h2>
                <p className="text-slate-400 text-2xl font-medium italic">"CareerPilot AI helped me identify exactly what was missing. Three weeks later, I accepted an offer at a top-tier tech firm."</p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full border-2 border-indigo-500 p-0.5">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Sarah J." className="rounded-full" />
                  </div>
                  <div>
                    <div className="font-black text-lg tracking-tight">Sarah Jenkins</div>
                    <div className="text-xs font-black text-indigo-400 uppercase tracking-widest">Platform Engineer @ Stripe</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="aspect-square bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-center text-xl font-black italic tracking-tighter text-white/20 uppercase">Logo {i}</div>
                 ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-slate-500 text-sm font-bold uppercase tracking-widest">
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rotate-45"></div>
            </div>
            CareerPilot AI
          </div>
          <div>© 2024 AI Build Pro. All rights reserved.</div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white whitespace-nowrap">Privacy</a>
            <a href="#" className="hover:text-white whitespace-nowrap">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Dashboard ---

const sidebarItems = [
  { id: 'overview', icon: TrendingUp, label: 'Overview' },
  { id: 'resume', icon: FileText, label: 'Resume Analyzer' },
  { id: 'interview', icon: MessageSquare, label: 'Mock Interview' },
  { id: 'roadmap', icon: Map, label: 'Career Roadmap' },
  { id: 'jobs', icon: Briefcase, label: 'Job Fixer' },
  { id: 'rag', icon: BrainCircuit, label: 'Knowledge Base' },
  { id: 'admin', icon: Layout, label: 'Admin Panel' }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-[#050508] text-white overflow-hidden geometric-bg">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0A0A10]/80 backdrop-blur-xl border-r border-white/10 flex flex-col p-6 hidden lg:flex">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <div className="w-4 h-4 border border-white rotate-45"></div>
          </div>
          <span className="font-bold tracking-tight text-white">CareerPilot AI</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left",
                activeTab === item.id 
                  ? "bg-white/10 text-white" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {activeTab === item.id ? (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              ) : (
                <item.icon size={18} />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
           <div className="flex items-center gap-3 px-2">
             <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
               <img src={user?.photoURL || ''} alt="Avatar" />
             </div>
             <div>
               <p className="text-sm font-bold truncate max-w-[120px]">{user?.displayName}</p>
               <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Candidate</p>
             </div>
           </div>
           <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 text-xs font-black text-slate-500 hover:text-red-400 uppercase tracking-widest transition-all"
           >
             <LogOut size={16} />
             Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        <header className="h-20 bg-[#050508]/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-black tracking-tight">
              {sidebarItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="outline" className="text-xs px-4 py-2">Pro Member</Button>
          </div>
        </header>

        <main className="p-8 max-w-6xl w-full mx-auto flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && <OverviewView />}
              {activeTab === 'resume' && <ResumeView />}
              {activeTab === 'interview' && <InterviewView />}
              {activeTab === 'roadmap' && <RoadmapView />}
              {activeTab === 'jobs' && <JobView />}
              {activeTab === 'rag' && <RAGView />}
              {activeTab === 'admin' && <AdminView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// ... Views ...

const JobView = () => {
  const [jd, setJd] = useState('');
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analyze-job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd, resume })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Analysis failed");
      }
      const data = await res.json();
      setResult(data);
      (window as any).showToast("Matching analysis finished!", "success");
    } catch (err: any) {
      (window as any).showToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <Card className="space-y-10 bg-[#0A0A10]">
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tight">AI Job Matcher</h2>
          <p className="text-slate-400 font-medium">Verify your resume's compatibility with any external job description.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
           <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Job Description</label>
             <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500/50 min-h-[300px] text-white placeholder-slate-700 font-medium text-sm" 
              placeholder="Paste exact JD text here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
           </div>
           <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Your Resume Profile</label>
             <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500/50 min-h-[300px] text-white placeholder-slate-700 font-medium text-sm" 
              placeholder="Paste your current resume text here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
           </div>
        </div>
        <Button onClick={analyze} className="w-full py-5 text-xs font-black uppercase tracking-[0.2em]" disabled={loading || !jd || !resume}>
          {loading ? "Matching Matrix..." : "Analyze Alignment"}
        </Button>
      </Card>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
           <Card className="text-center relative overflow-hidden bg-indigo-600/10 border-indigo-500/20 py-16">
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Compatibility Score</div>
              <div className="text-8xl font-black text-white font-mono">{result.matchScore}%</div>
              <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <motion.div initial={{ width: 0 }} animate={{ width: `${result.matchScore}%` }} className="h-full bg-indigo-500" />
              </div>
           </Card>
           <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-white/5">
                <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 px-1 border-l-2 border-rose-500 pl-3">Critical Keyword Gaps</h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((k: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-tighter">{k}</span>
                  ))}
                </div>
              </Card>
              <Card className="border-white/5">
                <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 px-1 border-l-2 border-indigo-500 pl-3">Strategic Recommendations</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium italic">"{result.recommendations}"</p>
              </Card>
           </div>
        </motion.div>
      )}
    </div>
  );
};
const AdminView = () => (
  <div className="space-y-12 pb-20">
     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Base', val: '1,280', color: 'text-indigo-400' },
          { label: 'Cloud Usage', val: '78%', color: 'text-cyan-400' },
          { label: 'Data Nodes', val: '4.5k', color: 'text-purple-400' },
          { label: 'Active Links', val: '42', color: 'text-rose-400' }
        ].map((s, i) => (
          <Card key={i} className="py-8 border-white/5 bg-white/[0.02]">
            <div className="text-[10px] uppercase font-black text-slate-500 mb-2 tracking-widest">{s.label}</div>
            <div className={cn("text-4xl font-black font-mono", s.color)}>{s.val}</div>
          </Card>
        ))}
     </div>
     <Card className="p-0 overflow-hidden bg-[#0A0A10]/50 border-white/10">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
           <h3 className="text-sm font-black text-white uppercase tracking-widest">Active Candidates Control</h3>
           <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">System Operational</span>
           </div>
        </div>
        <table className="w-full text-left">
           <thead className="bg-white/5 border-b border-white/5">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Identifier</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Compute</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Pulse</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-white/5">
              {[1,2,3,4,5,6].map(i => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-black border border-indigo-500/20">U{i}</div>
                    <div className="text-sm font-bold text-slate-200 tracking-tight">Candidate_{i}_Core</div>
                  </td>
                  <td className="px-8 py-6"><span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">Authorized</span></td>
                  <td className="px-8 py-6 text-sm font-mono text-indigo-400">{(Math.random() * 1000).toFixed(0)} TKNS</td>
                  <td className="px-8 py-6 text-xs text-slate-500 font-bold uppercase tracking-tighter">{i * 12}m Prior</td>
                </tr>
              ))}
           </tbody>
        </table>
     </Card>
  </div>
);

const RAGView = () => {
  const [text, setText] = useState('');
  const [ingesting, setIngesting] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const handleIngest = async () => {
    if (!text.trim()) return;
    setIngesting(true);
    try {
      const res = await fetch('/api/knowledge/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, metadata: { type: 'manual', date: new Date().toISOString() } })
      });
      if (!res.ok) throw new Error(await res.text());
      setText('');
      (window as any).showToast("Knowledge ingested successfully!", "success");
    } catch (err: any) {
      (window as any).showToast("Ingestion failed: " + err.message);
    } finally {
      setIngesting(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const res = await fetch('/api/knowledge/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data.results || []);
    } catch (err: any) {
      (window as any).showToast(err.message);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="space-y-6 bg-[#0A0A10]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20">
              <Upload size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Ingest Intelligence</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Feed the Master Brain</p>
            </div>
          </div>
          <textarea 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500/50 min-h-[300px] text-white placeholder-slate-700 font-medium text-sm"
            placeholder="Paste technical documentation, interview patterns, or company research..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleIngest} disabled={ingesting || !text.trim()} className="w-full py-4 uppercase text-xs tracking-widest font-black">
            {ingesting ? "Absorbing..." : "Sync Knowledge"}
          </Button>
        </Card>

        <div className="space-y-8">
          <Card className="bg-[#0A0A10]">
             <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-cyan-600/20 text-cyan-400 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                <Search size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight">Neuron Query</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Semantic Search Pipeline</p>
              </div>
            </div>
            <div className="flex gap-4">
              <input 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-500/50 text-white placeholder-slate-700 font-medium"
                placeholder="Ask your knowledge base..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={searching || !query.trim()} className="bg-cyan-600 hover:bg-cyan-700 text-xs px-8">EXECUTE</Button>
            </div>
          </Card>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Retrieved Contexts</h4>
            {results.length === 0 && !searching && (
              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl text-slate-600">
                No active neural paths detected.
              </div>
            )}
            {results.map((r, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-white/5 border-white/5 p-6 hover:bg-white/10 transition-all">
                  <p className="text-sm text-slate-300 leading-relaxed font-medium line-clamp-3">"{r.content}"</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Similarity: {(r.similarity * 100).toFixed(1)}%</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const OverviewView = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-8">
      <header className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight mb-2">Welcome back, {user?.displayName?.split(' ')[0]}.</h2>
        <p className="text-slate-400 text-lg">Your interview readiness has increased by 12% this week.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Avg Interview Score', value: '78%', trend: '+5%', color: 'text-indigo-400' },
          { label: 'Resume ATS Score', value: '82/100', trend: '+12%', color: 'text-cyan-400' },
          { label: 'Learning Progress', value: '45%', trend: 'On Track', color: 'text-purple-400' }
        ].map((s, i) => (
          <Card key={i} className="relative overflow-hidden group">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{s.label}</div>
            <div className={cn("text-4xl font-black mb-4", s.color)}>{s.value}</div>
            <div className="text-xs font-bold text-green-400 flex items-center gap-1">
              <TrendingUp size={12} /> {s.trend}
            </div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-600/5 blur-2xl rounded-full group-hover:bg-indigo-600/10 transition-all"></div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 flex flex-col min-h-[400px]">
           <div className="mb-8 flex items-center justify-between">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Performance Metrics</h3>
             <select className="bg-white/5 border border-white/10 text-xs font-bold rounded-lg p-2 focus:outline-none">
               <option>Last 30 Days</option>
               <option>Last 6 Months</option>
             </select>
           </div>
           <div className="flex-1">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: 'Mon', score: 65 },
                  { name: 'Tue', score: 68 },
                  { name: 'Wed', score: 75 },
                  { name: 'Thu', score: 72 },
                  { name: 'Fri', score: 80 },
                  { name: 'Sat', score: 85 },
                  { name: 'Sun', score: 82 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 700 }} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A10', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} dot={{ fill: '#6366f1', strokeWidth: 2, r: 6 }} activeDot={{ r: 8, fill: '#818cf8' }} />
                </LineChart>
             </ResponsiveContainer>
           </div>
        </Card>

        <Card className="lg:col-span-4 flex flex-col">
           <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Recent Sessions</h3>
           <div className="space-y-4 flex-1">
              {[
                { company: 'Meta', role: 'AI Researcher', score: '9.4', time: '2d ago', color: 'bg-green-500/20 text-green-400' },
                { company: 'OpenAI', role: 'Frontend Eng', score: '7.8', time: '5d ago', color: 'bg-amber-500/20 text-amber-400' },
                { company: 'Google', role: 'Product Lead', score: '8.1', time: '1w ago', color: 'bg-indigo-500/20 text-indigo-400' },
              ].map((session, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/10 transition-all cursor-pointer">
                  <div>
                    <p className="font-bold text-sm tracking-tight">{session.company}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{session.role}</p>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-xs font-black px-2 py-1 rounded-lg inline-block", session.color)}>{session.score}</div>
                    <p className="text-[10px] text-slate-600 mt-1 font-bold">{session.time}</p>
                  </div>
                </div>
              ))}
           </div>
           <Button variant="outline" className="mt-6 w-full text-xs">View All History</Button>
        </Card>
      </div>
    </div>
  );
};

const ResumeView = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    setAnalyzing(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch('/api/analyze-resume', { method: 'POST', body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to analyze resume");
      }
      const data = await res.json();
      setResult(data);
      (window as any).showToast("Resume analysis complete!", "success");
    } catch (error: any) {
      console.error(error);
      (window as any).showToast(error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!result ? (
        <Card className="border-dashed border-2 border-white/10 flex flex-col items-center py-24 bg-white/5">
          <div className="w-20 h-20 bg-indigo-600/20 text-indigo-400 rounded-3xl flex items-center justify-center mb-8 border border-indigo-500/20">
            <Upload size={40} />
          </div>
          <h2 className="text-2xl font-black text-white mb-3 tracking-tight">AI Resume Polishing</h2>
          <p className="text-slate-500 mb-10 max-w-xs text-center font-medium leading-relaxed">Extract ATS insights and get professional bullet point recommendations instantly.</p>
          
          <input 
            type="file" 
            accept=".pdf,.docx,.doc" 
            id="resume-upload" 
            className="hidden" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
             <label 
              htmlFor="resume-upload" 
              className="flex-1 bg-white/5 border border-white/10 px-6 py-4 rounded-xl font-bold cursor-pointer hover:bg-white/10 flex items-center justify-center text-sm transition-all text-slate-300"
            >
              <Upload size={16} className="mr-2" />
              {file ? file.name : "Select Resume (PDF/DOCX)"}
            </label>
            <Button disabled={!file || analyzing} onClick={handleUpload} className="flex-1 h-14">
              {analyzing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : "Run Analysis"}
            </Button>
          </div>
        </Card>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="text-center relative overflow-hidden bg-indigo-600/10 border-indigo-500/20">
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">ATS Strength</div>
              <div className="text-7xl font-black text-white font-mono">{result.atsScore}%</div>
              <div className="mt-6 w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${result.atsScore}%` }} className="h-full bg-indigo-500" />
              </div>
            </Card>
            <Card className="text-center relative overflow-hidden bg-cyan-600/10 border-cyan-500/20">
              <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2">Technical Alignment</div>
              <div className="text-7xl font-black text-white font-mono">{result.grammarScore}%</div>
              <div className="mt-6 w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${result.grammarScore}%` }} className="h-full bg-cyan-400" />
              </div>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="space-y-6">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 <AlertCircle className="text-rose-400" size={16} /> Targeted Optimization
               </h3>
               <div className="space-y-4">
                 {result.weakBulletPoints.map((p: string, i: number) => (
                   <div key={i} className="space-y-2">
                     <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest pl-1">Weak Interaction:</p>
                     <p className="text-xs text-slate-500 bg-white/[0.02] p-4 rounded-2xl border border-white/5 leading-relaxed font-medium line-through decoration-rose-500/50 italic">
                       "{p}"
                     </p>
                     {result.improvedBullets?.[i] && (
                       <>
                         <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest pl-1">High-Impact Rewrite:</p>
                         <p className="text-xs text-indigo-100 bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 leading-relaxed font-medium">
                           "{result.improvedBullets[i]}"
                         </p>
                       </>
                     )}
                   </div>
                 ))}
               </div>
            </Card>

            <Card className="space-y-6">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 <BrainCircuit className="text-indigo-400" size={16} /> Strategic Improvements
               </h3>
               <div className="prose prose-invert prose-sm text-slate-400">
                 <Markdown>{result.improvements}</Markdown>
                 <div className="mt-8 mb-3 text-xs font-black text-white uppercase tracking-widest">Recommended Keywords</div>
                 <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((s: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-tighter">{s}</span>
                    ))}
                 </div>
               </div>
            </Card>
          </div>
          <Button onClick={() => setResult(null)} variant="outline" className="w-full py-4 uppercase text-xs tracking-widest">Upload Another Resume</Button>
        </motion.div>
      )}
    </div>
  );
};

const InterviewView = () => {
  const [role, setRole] = useState('');
  const [step, setStep] = useState('select'); // select, interview, feedback
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        await processSpeech(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied", err);
      (window as any).showToast("Microphone access required for voice input");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const processSpeech = async (blob: Blob) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('audio', blob);

    try {
      const res = await fetch('/api/speech-to-text', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.text) {
        setInput(data.text);
        // Optionally auto-send
      }
    } catch (err) {
      console.error("STT error", err);
    } finally {
      setLoading(false);
    }
  };

  const startInterview = async (selectedRole: string) => {
    setRole(selectedRole);
    setLoading(true);
    setStep('interview');
    setMessages([]);
    try {
      const res = await fetch('/api/mock-interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([{ role: 'ai', text: data.question }]);
    } catch (err: any) {
      console.error(err);
      setMessages([{ role: 'ai', text: "System Error: Failed to start the interview. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input || loading) return;
    const userMsg = input;
    const currentHistory = [...messages, { role: 'user', text: userMsg }];
    setInput('');
    setMessages(currentHistory);
    setLoading(true);

    try {
      const res = await fetch('/api/mock-interview/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          role, 
          history: currentHistory, 
          userResponse: userMsg 
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: 'ai', text: data.nextQuestion }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting to my brain right now. Can you try saying that again?" }]);
    } finally {
      setLoading(false);
    }
  };

  const endInterview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/mock-interview/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, history: messages })
      });
      const data = await res.json();
      setFeedback(data);
      setStep('feedback');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'select') return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-black tracking-tight">Mock Interview Lab</h2>
        <p className="text-slate-400 text-lg font-medium">Select a role to start a high-fidelity AI-simulated interview session.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Frontend Developer", icon: Layout, color: "bg-indigo-600/10 text-indigo-400 border-indigo-500/20" },
          { title: "Backend Developer", icon: Briefcase, color: "bg-cyan-600/10 text-cyan-400 border-cyan-500/20" },
          { title: "AI Engineer", icon: BrainCircuit, color: "bg-purple-600/10 text-purple-400 border-purple-500/20" },
          { title: "Marketing Manager", icon: TrendingUp, color: "bg-orange-600/10 text-orange-400 border-orange-500/20" },
          { title: "Product Manager", icon: Map, color: "bg-rose-600/10 text-rose-400 border-rose-500/20" },
          { title: "Executive Leader", icon: Star, color: "bg-emerald-600/10 text-emerald-400 border-emerald-500/20" }
        ].map((r, i) => (
          <Card key={i} className={cn("group hover:bg-white/[0.05] transition-all cursor-pointer border border-white/5", r.color)} onClick={() => startInterview(r.title)}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110 bg-white/5 border border-white/10">
              <r.icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">{r.title}</h3>
            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 45 Min Session
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  if (step === 'interview') return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col">
       <Card className="flex-1 flex flex-col p-0 overflow-hidden bg-[#0A0A10]/50">
          <div className="p-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                <BrainCircuit size={24} />
              </div>
              <div>
                <div className="font-black text-white tracking-tight">AI Interviewer — {role}</div>
                <div className="text-[10px] text-emerald-400 font-black flex items-center gap-2 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Session
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={endInterview} className="text-rose-500 hover:bg-rose-500/10 font-black py-2 px-4 text-xs">EXIT INTERVIEW</Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-8 geometric-bg relative">
            {messages.length === 0 && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                 <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center">
                    <Mic size={32} />
                 </div>
                 <p className="text-sm font-bold uppercase tracking-[0.2em]">Initializing AI Sync...</p>
              </div>
            )}
            {messages.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}
              >
                <div className={cn(
                  "max-w-[85%] p-6 rounded-3xl text-sm font-medium leading-relaxed shadow-2xl",
                  m.role === 'user' 
                    ? "bg-indigo-600 text-white rounded-tr-none border border-indigo-500 shadow-indigo-500/10" 
                    : "bg-[#0A0A10] text-slate-200 border border-white/10 rounded-tl-none"
                )}>
                  <Markdown>{m.text}</Markdown>
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#0A0A10] border border-white/10 p-6 rounded-3xl rounded-tl-none shadow-2xl">
                  <div className="flex gap-2 p-1">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-8 bg-white/[0.02] border-t border-white/5 flex gap-4 items-center">
            <Button 
              variant="outline" 
              className={cn("p-4 rounded-2xl shrink-0 h-14", isRecording && "bg-rose-500/20 border-rose-500 animate-pulse")}
              onClick={isRecording ? stopRecording : startRecording}
            >
              <Mic size={20} className={cn(isRecording ? "text-rose-400" : "text-slate-400")} />
            </Button>
            <input 
              className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500/50 transition-all font-medium text-white placeholder-slate-600"
              placeholder={isRecording ? "Listening..." : "Speak your mind..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage} disabled={loading || !input.trim()} className="px-10 h-14 uppercase text-xs tracking-widest font-black">SEND</Button>
          </div>
       </Card>
    </div>
  );

  if (step === 'feedback') {
    return (
       <div className="max-w-5xl mx-auto space-y-12 pb-20">
         <header className="text-center space-y-4">
           <h2 className="text-5xl font-black tracking-tight">Performance Summary</h2>
           <p className="text-slate-400 text-lg">Detailed analysis for your {role} simulation.</p>
         </header>

         <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Content Quality', val: feedback.clarityScore, color: 'text-indigo-400', bg: 'bg-indigo-600/10' },
              { label: 'Tech Precision', val: feedback.technicalAccuracy, color: 'text-cyan-400', bg: 'bg-cyan-600/10' },
              { label: 'Persona Score', val: feedback.communicationQuality, color: 'text-purple-400', bg: 'bg-purple-600/10' }
            ].map((s, i) => (
              <Card key={i} className={cn("text-center py-10 border-white/10 relative overflow-hidden", s.bg)}>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 relative z-10">{s.label}</div>
                <div className={cn("text-7xl font-black font-mono relative z-10", s.color)}>{s.val}%</div>
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.val}%` }} className={cn("h-full", s.color.replace('text', 'bg'))} />
                </div>
              </Card>
            ))}
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Filler Words', val: feedback.fillerWordCount, unit: '', color: 'text-orange-400' },
              { label: 'Speaking Pace', val: feedback.speakingPace, unit: '', color: 'text-blue-400' },
              { label: 'Presence', val: 'Elite', unit: '', color: 'text-emerald-400' },
              { label: 'Structure', val: 'Solid', unit: '', color: 'text-indigo-400' }
            ].map((s, i) => (
              <Card key={i} className="p-5 border-white/5 bg-white/[0.02]">
                <div className="text-[9px] uppercase font-black text-slate-500 mb-2 tracking-[0.2em]">{s.label}</div>
                <div className={cn("text-xl font-black tracking-tight", s.color)}>{s.val}{s.unit}</div>
              </Card>
            ))}
         </div>

         <div className="grid lg:grid-cols-12 gap-8">
           <Card className="lg:col-span-12 space-y-8 bg-[#0A0A10]">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Core Feedback</h3>
                <p className="text-xl text-slate-300 leading-relaxed font-medium italic">"{feedback.overallSummary}"</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
                 <div>
                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Strategic Improvements</h4>
                    <ul className="space-y-4">
                       {feedback.areasForImprovement.map((area: string, i: number) => (
                         <li key={i} className="flex items-start gap-4 text-slate-400 text-sm font-medium bg-white/5 p-4 rounded-2xl border border-white/5">
                           <ChevronRight className="text-indigo-500 shrink-0 mt-0.5" size={18} /> {area}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="space-y-6">
                   <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-6">Next Level Objectives</h4>
                   <div className="p-6 bg-indigo-600/10 rounded-3xl border border-indigo-500/20">
                     <p className="text-sm text-indigo-100 font-medium leading-relaxed">Based on this session, you are ready to tackle System Design workshops or mock negotiations.</p>
                     <Button className="mt-6 w-full text-xs py-3 uppercase tracking-widest">Schedule Advanced Mock</Button>
                   </div>
                 </div>
              </div>
           </Card>
         </div>
         <div className="flex gap-4">
            <Button onClick={() => setStep('select')} variant="outline" className="flex-1 py-4 uppercase text-xs tracking-[0.2em]">Try Another Role</Button>
            <Button onClick={() => window.print()} className="flex-1 py-4 uppercase text-xs tracking-[0.2em]">Export Report</Button>
         </div>
      </div>
    );
  }

  return null;
};


const RoadmapView = () => {
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole: role, currentSkills: skills })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Roadmap generation failed");
      }
      const data = await res.json();
      setRoadmap(data);
      (window as any).showToast("Master roadmap generated!", "success");
    } catch (err: any) {
      (window as any).showToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {!roadmap ? (
        <Card className="space-y-8 bg-[#0A0A10]">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight">Architect Your Career</h2>
            <p className="text-slate-400 font-medium">Define your destination. We'll plot the optimal learning trajectory.</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Target Role</label>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500/50 text-white placeholder-slate-700 font-medium"
                placeholder="e.g. Senior Machine Learning Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Current Arsenal</label>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500/50 min-h-[140px] text-white placeholder-slate-700 font-medium"
                placeholder="List your core libraries, languages, and frameworks..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <Button className="w-full py-5 text-xs font-black uppercase tracking-[0.2em]" onClick={generate} disabled={loading || !role}>
              {loading ? "Calculating Trajectory..." : "Generate Master Roadmap"}
            </Button>
          </div>
        </Card>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
           <div className="flex items-center justify-between">
              <h2 className="text-4xl font-black tracking-tight"><span className="text-indigo-500">Roadmap:</span> {role}</h2>
              <Button onClick={() => setRoadmap(null)} variant="outline" className="text-xs py-2">RESET</Button>
           </div>

           <div className="relative border-l border-white/10 ml-8 pl-14 space-y-16">
             {roadmap.roadmap.map((phase: any, i: number) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[76px] top-0 w-12 h-12 bg-[#0A0A10] border border-white/10 group-hover:border-indigo-500/50 rounded-2xl flex items-center justify-center text-white font-black font-mono transition-all">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black tracking-tight text-white">{phase.phase}</h3>
                    <Card className="grid md:grid-cols-2 gap-8 p-8 border-white/5 bg-white/[0.02]">
                       <div>
                         <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Skill Acquisition</div>
                         <div className="flex flex-wrap gap-2">
                            {phase.skills.map((s: string, j: number) => (
                              <span key={j} className="px-3 py-1.5 bg-white/5 border border-white/5 text-slate-300 rounded-xl text-xs font-bold">{s}</span>
                            ))}
                         </div>
                       </div>
                       <div className="border-l border-white/5 pl-8 hidden md:block">
                         <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-4">Milestones</div>
                         <ul className="space-y-3">
                            {phase.objectives.map((obj: string, j: number) => (
                              <li key={j} className="text-sm text-slate-500 flex items-start gap-3 italic leading-relaxed font-medium">
                                <CheckCircle2 size={16} className="text-indigo-500/30 shrink-0" /> {obj}
                              </li>
                            ))}
                         </ul>
                       </div>
                    </Card>
                  </div>
                </div>
             ))}
           </div>
        </motion.div>
      )}
    </div>
  );
};

// --- App Entry ---

const MainApp = () => {
  const { user, loading } = useAuth();
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Global error handler for child views
  (window as any).showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToast({ message, type });
  };
  
  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#050508] text-white geometric-bg">
      <div className="text-center space-y-8">
        <div className="w-20 h-20 border-t-2 border-r-2 border-indigo-500 rounded-full animate-spin mx-auto shadow-[0_0_50px_rgba(79,70,229,0.3)]"></div>
        <div className="text-xs font-black text-white animate-pulse tracking-[0.5em] uppercase">SYNCHRONIZING CORE</div>
      </div>
    </div>
  );

  return (
    <>
      {user ? <Dashboard /> : <LandingPage />}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

