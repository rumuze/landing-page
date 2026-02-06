import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Terminal, Code2, Cpu, Sparkles, Server, Shield, Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from './SEO';

const TerminalBlock = () => {
  const [lines, setLines] = useState([
    "> INITIALIZING RUMUZE_CORE_V2.0...",
    "> LOADING NEURAL_NETWORKS...",
    "> CONNECTING TO QUANTUM_NODES..."
  ]);

  useEffect(() => {
    const sequence = [
      { text: "> SYSTEM_STATUS: ONLINE", delay: 1000 },
      { text: "> DETECTING USER_LOCATION...", delay: 2000 },
      { text: "> OPTIMIZING ASSETS FOR ENTROPY REDUCTION...", delay: 3500 },
      { text: "> ACCESS GRANTED: WELCOME TO THE LAB.", delay: 5000 },
    ];

    let timeouts = [];
    sequence.forEach(({ text, delay }) => {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev.slice(-4), text]); // Keep last 5 lines
      }, delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="font-mono text-xs md:text-sm p-6 rounded-xl bg-slate-50 dark:bg-black/90 border border-slate-200 dark:border-green-500/30 text-slate-800 dark:text-green-400 shadow-2xl dark:shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)] backdrop-blur-md break-all whitespace-pre-wrap">
       <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-green-500/20 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-auto opacity-50">Authorized Personnel Only</span>
       </div>
       <div className="space-y-1 h-[120px] overflow-hidden">
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                 <span className="opacity-50">{(new Date()).toLocaleTimeString('en-US', {hour12: false})}</span>
                 <span>{line}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-slate-800 dark:bg-green-400 mt-2"
          />
       </div>
    </div>
  );
};

const Labs = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const projects = [
    {
      id: "holo-ui",
      title: "Holo-Interface V1",
      category: "UX / SPATIAL",
      status: "BETA",
      description: "Experimental spatial UI patterns for Apple Vision Pro and Meta Quest 3.",
      tech: ["Unity", "SwiftUI", "Hand Tracking"],
      icon: <Sparkles className="text-purple-400" />
    },
    {
      id: "quantum-encryption",
      title: "Post-Quantum Cryptography",
      category: "SECURITY",
      status: "R&D",
      description: "Lattice-based cryptography implementation resistant to quantum decryption attacks.",
      tech: ["Rust", "WASM", "Kyber-512"],
      icon: <Shield className="text-cyan" />
    },
    {
      id: "neural-search",
      title: "Neural Search Engine",
      category: "AI / BACKEND",
      status: "LIVE ALPHA",
      description: "Semantic search engine using vector embeddings for context-aware query resolution.",
      tech: ["Pinecone", "OpenAI", "Python"],
      icon: <Cpu className="text-orange-400" />
    },
    {
      id: "edge-compute",
      title: "Edge Mesh Network",
      category: "INFRASTRUCTURE",
      status: "PROTOTYPE",
      description: "Decentralized CDN logic running entirely on client-side service workers.",
      tech: ["Cloudflare Workers", "P2P", "WebRTC"],
      icon: <Server className="text-green-400" />
    },
    {
      id: "generative-branding",
      title: "Generative Branding",
      category: "DESIGN",
      status: "CONCEPT",
      description: "AI model generating real-time brand assets based on user behavioral sentiment.",
      tech: ["Stable Diffusion", "React Three Fiber"],
      icon: <Activity className="text-pink-400" />
    },
    {
      id: "autonomous-dao",
      title: "Autonomous Enterprise DAO",
      category: "WEB3",
      status: "CLOSED BETA",
      description: "Smart contract system for fully automated corporate treasury management.",
      tech: ["Solidity", "Ethereum", "IPFS"],
      icon: <Code2 className="text-blue-400" />
    }
  ];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white overflow-hidden relative selection:bg-cyan selection:text-black font-mono ${isAr ? 'rtl' : 'ltr'}`}>
      <SEO 
        title="Rumuze Labs | Engineering the Future"
        description="Rumuze's R&D division. Where code meets quantum theory and AI evolution."
        path="/labs"
      />

      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 opacity-20 dark:opacity-20 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
         <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500/10 dark:bg-cyan/20 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        
        {/* Header Section with Live Terminal */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             className="space-y-6"
           >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 dark:bg-cyan/10 border border-blue-200 dark:border-cyan/30 text-blue-700 dark:text-cyan text-xs font-bold tracking-[0.2em] uppercase">
                 <Terminal size={14} />
                 <span>Research Division</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter text-slate-900 dark:text-white">
                 THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-cyan dark:via-purple dark:to-cyan bg-[length:200%_auto] animate-gradient-x">LABORATORY</span>
              </h1>
              
              <p className="text-slate-600 dark:text-gray-400 text-lg max-w-xl leading-relaxed">
                 Welcome to the bleeding edge. Here, we build the technologies that will define the next decade. 
                 <span className="text-slate-900 dark:text-white font-bold ml-1">No clients. No deadlines. Just raw innovation.</span>
              </p>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
           >
              <TerminalBlock />
           </motion.div>
        </div>

         {/* Projects Grid */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} idx={idx} />
            ))}
         </div>
        
        {/* Footer Link */}
        <div className="mt-20 text-center">
           <Link to="/contact" className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-cyan transition-colors tracking-widest uppercase group">
              <span>Interested in our beta program?</span>
              <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
           </Link>
        </div>

      </div>
    </div>
  );
};

const ProjectCard = ({ project, idx }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      className="group relative p-8 bg-white/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl dark:shadow-none hover:border-blue-300/50 dark:hover:border-cyan/50 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300 rounded-2xl overflow-hidden backdrop-blur-sm"
    >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent dark:from-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300 border border-slate-200 dark:border-white/5 group-hover:border-blue-400/30 dark:group-hover:border-cyan/30">
                {project.icon}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded border tracking-widest ${
                project.status === 'LIVE ALPHA' ? 'text-emerald-700 dark:text-green-400 border-emerald-200 dark:border-green-500/30 bg-emerald-50 dark:bg-green-500/10' :
                project.status === 'BETA' ? 'text-amber-700 dark:text-yellow-400 border-amber-200 dark:border-yellow-500/30 bg-amber-50 dark:bg-yellow-500/10' :
                'text-blue-700 dark:text-cyan border-blue-200 dark:border-cyan/30 bg-blue-50 dark:bg-cyan/10'
              }`}>
                {project.status}
              </span>
          </div>

          <div className="mb-1 text-[10px] text-slate-500 dark:text-gray-500 font-bold tracking-widest uppercase">{project.category}</div>
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan transition-colors">{project.title}</h3>
          <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow">
              {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto border-t border-slate-100 dark:border-white/5 pt-4">
              {project.tech.map(t => (
                <span key={t} className="text-[10px] text-slate-500 dark:text-gray-500 px-2 py-1 bg-slate-100 dark:bg-white/5 rounded">
                    {t}
                </span>
              ))}
          </div>
        </div>
    </motion.div>
  );
};

export default Labs;
