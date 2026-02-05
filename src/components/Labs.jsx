import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Code2, Cpu, Sparkles, Terminal, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from './SEO';

const Labs = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const experiments = [
    {
      id: "ai-evolution",
      title: "Self-Evolving AI Core",
      tag: "AI / RESEARCH",
      description: "Exploring recursive neural networks that optimize their own architecture in real-time.",
      status: "Active Research",
      icon: <Cpu className="text-cyan" />
    },
    {
      id: "quantum-ui",
      title: "Quantum State Management",
      tag: "FRONTEND / EXP",
      description: "A theoretical approach to state synchronization using entangled data nodes.",
      status: "Prototype",
      icon: <Sparkles className="text-purple" />
    },
    {
      id: "eco-block",
      title: "Eco-Friendly Blockchain",
      tag: "WEB3 / SUSTAIN",
      description: "Consensus algorithm designed for 99% less energy consumption than PoW.",
      status: "Whitepaper",
      icon: <Beaker className="text-green-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#00050a] font-mono selection:bg-cyan selection:text-background overflow-hidden relative transition-colors duration-300">
      <SEO 
        title="Rumuze Labs | AI & Research"
        description="The scientific division of Rumuze where we build self-evolving AI and future-tech experiments."
      />
      
      {/* Terminal Backdrop Effect */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <nav className="p-6 relative z-10 flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-cyan hover:gap-4 transition-all">
          <ArrowLeft size={18} className={isAr ? 'rotate-180' : ''} />
          <span>{isAr ? 'العودة' : 'BACK TO CORE'}</span>
        </Link>
        <div className="text-[10px] text-slate-500 dark:text-white/40 tracking-[0.3em]">
          SYSTEM STATUS: <span className="text-green-500 dark:text-green-400">NOMINAL</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan/10 border border-cyan/20 text-cyan text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
          >
            <Terminal size={12} />
            RUMUZE LABS // EXPERIMENTAL MODULE
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter text-slate-900 dark:text-white"
          >
            PUSHING THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-purple to-cyan bg-[length:200%_auto] animate-gradient">BOUNDARY OF POSSIBLE.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-white/60 max-w-2xl leading-relaxed"
          >
            Welcome to the Rumuze Research & Development division. This is where we break things, build things, 
            and explore the intersection of self-evolving AI, quantum computing architecture, and decentralized ecosystems.
          </motion.p>
        </div>

        {/* Research Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {experiments.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] p-8 hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:border-cyan/30 transition-all duration-500 relative overflow-hidden shadow-sm dark:shadow-none"
            >
              <div className="absolute top-0 right-0 p-4 opacity-[0.05] dark:opacity-10 group-hover:opacity-100 transition-opacity text-slate-900 dark:text-white">
                <Code2 size={40} />
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-lg mb-6 group-hover:scale-110 transition-transform">
                {exp.icon}
              </div>
              <div className="text-[10px] text-cyan/60 font-bold mb-2 tracking-widest">{exp.tag}</div>
              <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">{exp.title}</h3>
              <p className="text-sm text-slate-500 dark:text-white/40 mb-8 leading-relaxed">
                {exp.description}
              </p>
              <div className="flex justify-between items-center text-[10px] tracking-widest">
                <span className="flex items-center gap-2 text-slate-500 dark:text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></span>
                  {exp.status}
                </span>
                <button className="text-slate-700 dark:text-white hover:text-cyan flex items-center gap-1 transition-colors">
                  READ CASE <ArrowUpRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Deep Dive Mockup */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-32 border-t border-slate-200 dark:border-white/10 pt-20"
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight text-slate-900 dark:text-white">LATEST PUBLICATIONS</h2>
              <p className="text-sm text-slate-500 dark:text-white/40">Technical deep-dives into our core research.</p>
            </div>
            <button className="text-xs border border-slate-200 dark:border-white/10 px-6 py-2 hover:bg-white dark:hover:bg-white/5 tracking-[0.2em] transition-colors text-slate-700 dark:text-white">
              VIEW ARCHIVE
            </button>
          </div>

          <div className="space-y-4">
             {[1, 2].map(i => (
               <div key={i} className="flex justify-between items-center p-6 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.01] hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors group cursor-pointer shadow-sm dark:shadow-none">
                 <div className="flex items-center gap-6">
                    <span className="text-slate-400 dark:text-white/20 text-sm">0{i}</span>
                    <div>
                       <h4 className="font-bold text-slate-800 dark:text-white/80 group-hover:text-cyan transition-colors">Recursive Neural Optimization in Distributed Environments</h4>
                       <span className="text-[10px] text-slate-500 dark:text-white/40">RELEASED: 12.01.2026 // READ TIME: 12 MIN</span>
                    </div>
                 </div>
                 <ArrowUpRight className="text-slate-400 dark:text-white/20 group-hover:text-cyan transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
               </div>
             ))}
          </div>
        </motion.div>
      </main>

      {/* Grid Pattern Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-cyan/5 to-transparent pointer-events-none opacity-20"></div>
    </div>
  );
};

export default Labs;
