"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Zap, User, ShieldCheck } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(`${API_URL}/skill`);
        const data = await res.json();
        setSkills(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to fetch skills", e);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* === HERO SECTION === */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-8">
            <ShieldCheck size={14} /> Xano AI-Powered Backend
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Skill<span className="text-indigo-400">Bridge</span>
          </h1>
          
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            The decentralized time-banking economy. Exchange your expertise hour-for-hour. 
            <br/><span className="text-indigo-300">No money. Just skills.</span>
          </p>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-25 group-hover:opacity-50 transition duration-500 blur"></div>
            <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-full px-6 py-4 shadow-2xl">
              <Search size={20} className="text-slate-500 mr-4" />
              <input 
                type="text" 
                placeholder="Search for React, Python, Design..." 
                className="w-full bg-transparent border-none outline-none text-white placeholder-slate-500 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* === MARKETPLACE GRID === */}
      <section className="px-6 max-w-7xl mx-auto pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Available Skills</h2>
          <span className="text-sm text-slate-500">Live from Xano Database</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="h-64 rounded-3xl bg-slate-900/50 border border-white/5 animate-pulse"></div>
            ))}
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-slate-800 rounded-3xl bg-slate-900/30">
            <Zap size={48} className="mx-auto text-slate-700 mb-4" />
            <p className="text-slate-400 text-lg mb-6">The marketplace is empty.</p>
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all">
              Be the First Provider
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <motion.div 
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/20"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                    <Zap size={24} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-950 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {skill.category || "Tech"}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {skill.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">
                  {skill.description}
                </p>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <User size={14} />
                    <span>Provider #{skill.user_id}</span>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold text-white bg-white/5 hover:bg-indigo-600 px-4 py-2 rounded-full transition-all">
                    Request Swap <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
