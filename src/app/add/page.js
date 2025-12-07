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
    category: "Development",
    user_id: 1 // Simulating logged-in user
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/skill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        // Wait a moment to show the success state before redirecting
        setTimeout(() => router.push("/"), 1500);
      } else {
        alert("Failed to add skill. Please check your connection.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* === ATMOSPHERE === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
      </div>

      <div className="w-full max-w-xl relative z-10">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group text-sm font-medium">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Marketplace
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl overflow-hidden"
        >
          {/* Top Glow */}
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
            
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Skill Title</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-0 group-focus-within:opacity-50 transition duration-500 blur"></div>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Advanced React Patterns"
                  className="relative w-full bg-slate-950/80 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-transparent transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Category</label>
              <div className="relative">
                <select 
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-indigo-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Development</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Writing</option>
                  <option>Consulting</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Description</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-0 group-focus-within:opacity-50 transition duration-500 blur"></div>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe the value you provide..."
                  className="relative w-full bg-slate-950/80 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-transparent transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading || success}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg ${
                success 
                  ? "bg-emerald-600 hover:bg-emerald-500" 
                  : "bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02]"
              } disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100`}
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : success ? (
                <>
                  <Check size={20} /> Published!
                </>
              ) : (
                <>
                  <Zap size={20} fill="currentColor" /> Publish Skill
                </>
              )}
            </button>

          </form>
        </motion.div>
      </div>
    </main>
  );
}
