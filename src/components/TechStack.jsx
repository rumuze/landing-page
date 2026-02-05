import React from 'react';
import { useTranslation } from 'react-i18next';

const TechStack = () => {
  const { t } = useTranslation();
  const techs = [
    "Laravel", "React", ".NET", "Python", "Node.js", "AWS", "Google Cloud", 
    "TailwindCSS", "Next.js", "MySQL", "PostgreSQL", "Docker", "Kubernetes", "Figma"
  ];

  return (
    <section id="tech-stack" className="py-20 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h3 className="text-gray-500 uppercase tracking-widest text-xs font-bold">{t('techStack.badge')}</h3>
      </div>
      
      <div className="flex overflow-hidden" dir="ltr">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techs, ...techs].map((tech, idx) => (
            <div 
              key={`${tech}-${idx}`} 
              className="mx-8 text-3xl md:text-5xl font-black text-white/20 hover:text-cyan transition-colors duration-500 cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
