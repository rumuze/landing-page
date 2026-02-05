import React from 'react';
import { Cpu, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-purple">
                <Cpu className="text-background w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">RUMUZE</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Pioneering the intersection of elite software development and 
              disruptive digital marketing. 
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-cyan transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-cyan transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-cyan transition-colors"><Github size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-cyan transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Solutions</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">ERP Systems</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cloud Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Integration</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Growth Strategy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brand Identity</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Paid Ads</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SEO Optimization</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © 2026 Rumuze Agency. All rights reserved. Decoding Technology, Scaling Brands.
          </p>
          <div className="flex gap-8 text-gray-500 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
