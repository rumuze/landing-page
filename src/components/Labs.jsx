import React, { useState, useEffect, useRef } from "react";
import { motion as Motion, AnimatePresence, useInView } from "framer-motion";
import {
  Terminal,
  Code2,
  Cpu,
  Sparkles,
  Server,
  Shield,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "./SEO";

const TerminalBlock = () => {
  const { t } = useTranslation();
  const [lines, setLines] = useState([
    t("labs.terminal.init"),
    t("labs.terminal.neural"),
    t("labs.terminal.quantum"),
  ]);

  useEffect(() => {
    const sequence = [
      { text: t("labs.terminal.status"), delay: 1000 },
      { text: t("labs.terminal.location"), delay: 2000 },
      { text: t("labs.terminal.optimize"), delay: 3500 },
      { text: t("labs.terminal.access"), delay: 5000 },
    ];

    let timeouts = [];
    sequence.forEach(({ text, delay }) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev.slice(-4), text]); // Keep last 5 lines
      }, delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [t]);

  return (
    <div className="terminal-premium font-mono text-xs md:text-sm p-6 rounded-xl bg-slate-50 dark:bg-black/90 border border-slate-200 dark:border-green-500/30 text-slate-800 dark:text-green-400 shadow-2xl dark:shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)] backdrop-blur-md break-all whitespace-pre-wrap">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-green-500/20 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-auto opacity-50">
          {t("labs.terminal.authorized")}
        </span>
      </div>
      <div className="space-y-1 h-[120px] overflow-hidden">
        <AnimatePresence>
          {lines.map((line, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="type-reveal flex items-center gap-2"
              style={{ ["--reveal-delay"]: `${i * 0.12}s` }}
            >
              <span className="opacity-50">
                {new Date().toLocaleTimeString("en-US", { hour12: false })}
              </span>
              <span>{line}</span>
            </Motion.div>
          ))}
        </AnimatePresence>
        <div className="cursor-blink w-2 h-4 bg-slate-800 dark:bg-green-400 mt-2" />
      </div>
    </div>
  );
};

const Labs = () => {
  const { i18n, t } = useTranslation();
  const isAr = i18n.language === "ar";
  const containerRef = useRef(null);

  const projects = [
    {
      id: "holo_ui",
      titleKey: "holo_ui.title",
      categoryKey: "holo_ui.category",
      statusKey: "holo_ui.status",
      descriptionKey: "holo_ui.description",
      tech: ["Unity", "SwiftUI", "Hand Tracking"],
      icon: <Sparkles className="text-purple-400" />,
    },
    {
      id: "quantum_encryption",
      titleKey: "quantum_encryption.title",
      categoryKey: "quantum_encryption.category",
      statusKey: "quantum_encryption.status",
      descriptionKey: "quantum_encryption.description",
      tech: ["Rust", "WASM", "Kyber-512"],
      icon: <Shield className="text-cyan" />,
    },
    {
      id: "neural_search",
      titleKey: "neural_search.title",
      categoryKey: "neural_search.category",
      statusKey: "neural_search.status",
      descriptionKey: "neural_search.description",
      tech: ["Pinecone", "OpenAI", "Python"],
      icon: <Cpu className="text-orange-400" />,
    },
    {
      id: "edge_compute",
      titleKey: "edge_compute.title",
      categoryKey: "edge_compute.category",
      statusKey: "edge_compute.status",
      descriptionKey: "edge_compute.description",
      tech: ["Cloudflare Workers", "P2P", "WebRTC"],
      icon: <Server className="text-green-400" />,
    },
    {
      id: "generative_branding",
      titleKey: "generative_branding.title",
      categoryKey: "generative_branding.category",
      statusKey: "generative_branding.status",
      descriptionKey: "generative_branding.description",
      tech: ["Stable Diffusion", "React Three Fiber"],
      icon: <Activity className="text-pink-400" />,
    },
    {
      id: "autonomous_dao",
      titleKey: "autonomous_dao.title",
      categoryKey: "autonomous_dao.category",
      statusKey: "autonomous_dao.status",
      descriptionKey: "autonomous_dao.description",
      tech: ["Solidity", "Ethereum", "IPFS"],
      icon: <Code2 className="text-blue-400" />,
    },
  ];

  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;
    const elements = rootEl.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -50px 0px", threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white overflow-hidden relative selection:bg-cyan selection:text-black font-mono ${isAr ? "rtl" : "ltr"}`}
    >
      <SEO path={isAr ? '/ar/labs' : '/labs'} />

      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20 dark:opacity-20 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500/10 dark:bg-cyan/20 blur-[100px]"></div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        {/* Header Section with Live Terminal */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 hero-premium"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 dark:bg-cyan/10 border border-blue-200 dark:border-cyan/30 text-blue-700 dark:text-cyan text-xs font-bold tracking-[0.2em] uppercase">
              <Terminal size={14} />
              <span>{t("labs.badge")}</span>
            </div>

            <h1 className="headline-sweep text-5xl md:text-7xl font-black leading-none tracking-tighter text-slate-900 dark:text-white">
              {t("labs.heading")}
            </h1>

            <p className="text-slate-600 dark:text-gray-400 text-lg max-w-xl leading-relaxed">
              {t("labs.intro")}
              <span className="glow-pulse text-slate-900 dark:text-white font-bold ml-1">
                {t("labs.intro_highlight")}
              </span>
            </p>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TerminalBlock />
          </Motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-20 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-cyan transition-colors tracking-widest uppercase group"
          >
            <span>{t("labs.cta_beta")}</span>
            <ArrowUpRight
              size={14}
              className={`group-hover:-translate-y-0.5 ${isAr ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"} transition-transform`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, idx }) => {
  const { t } = useTranslation();
  const title = t(`labs.projects.${project.titleKey}`);
  const status = t(`labs.projects.${project.statusKey}`);
  const description = t(`labs.projects.${project.descriptionKey}`);
  const category = t(`labs.projects.${project.categoryKey}`);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      className="group card-premium reveal-on-scroll relative p-8 bg-white/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl dark:shadow-none hover:border-blue-300/50 dark:hover:border-cyan/50 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300 rounded-2xl overflow-hidden backdrop-blur-sm"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent dark:from-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300 border border-slate-200 dark:border-white/5 group-hover:border-blue-400/30 dark:group-hover:border-cyan/30">
            {project.icon}
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded border tracking-widest ${
              project.status === "LIVE ALPHA"
                ? "text-emerald-700 dark:text-green-400 border-emerald-200 dark:border-green-500/30 bg-emerald-50 dark:bg-green-500/10"
                : project.status === "BETA"
                  ? "text-amber-700 dark:text-yellow-400 border-amber-200 dark:border-yellow-500/30 bg-amber-50 dark:bg-yellow-500/10"
                  : "text-blue-700 dark:text-cyan border-blue-200 dark:border-cyan/30 bg-blue-50 dark:bg-cyan/10"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="mb-1 text-[10px] text-slate-500 dark:text-gray-500 font-bold tracking-widest uppercase">
          {category}
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto border-t border-slate-100 dark:border-white/5 pt-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] text-slate-500 dark:text-gray-500 px-2 py-1 bg-slate-100 dark:bg-white/5 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Motion.div>
  );
};

export default Labs;
