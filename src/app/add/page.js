"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Loader2, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AddSkill() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "development", 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // THE SHOTGUN PAYLOAD: Send ID in every possible format
    // This ensures Xano finds the one it's looking for.
    const payload = {
      ...formData,
      user_id: 1,      // Standard
      users_id: 1,     // Xano default plural
      user: 1,         // Table reference name
      requester_id: 1, // From your previous logic
      status: "active" // Just in case
    };

    try {
      const res = await fetch(`${API_URL}/skill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/"), 1500);
      } else {
        alert(`Xano Error: ${JSON.stringify(data)}`);
        setLoading(false);
      }
    } catch (error) {
      alert(`Network Error: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group text-sm font-medium">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Marketplace
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-inner">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Mint Your Skill</h1>
              <p className="text-slate-400 text-sm mt-1">Offer your expertise to the network.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Skill Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Advanced React Patterns"
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Category</label>
              <select 
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none transition-colors appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="writing">Writing</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Description</label>
              <textarea 
                required
                rows={4}
                placeholder="Describe the value you provide..."
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || success}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg ${
                success ? "bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : success ? <Check size={20} /> : <Zap size={20} />}
              {loading ? "Publishing..." : success ? "Published!" : "Publish Skill"}
            </button>

          </form>
        </motion.div>
      </div>
    </main>
  );
}
