import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Linkedin, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ShareButton = ({ title, url }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: title || 'Rumuze',
    text: t('seo.ogDescription'),
    url: url || window.location.href,
  };

  const handleShare = async () => {
    // Try Native Share API first (Mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to Popover (Desktop)
      setIsOpen(!isOpen);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareData.url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-cyan/20 hover:border-cyan/50 hover:text-cyan transition-all shadow-lg shadow-cyan/5"
        aria-label="Share this page"
      >
        <Share2 size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-full right-0 mb-4 w-64 glass-card p-4 rounded-xl border border-white/10 shadow-2xl z-50 origin-bottom-right"
          >
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white mb-2 ml-1">Share via</h4>
              
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 transition-colors border border-blue-500/20"
                >
                  <Linkedin size={16} />
                  <span className="text-xs font-bold">LinkedIn</span>
                </a>
                
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2 rounded-lg bg-green-500/20 hover:bg-green-500/40 text-green-400 transition-colors border border-green-500/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/></svg>
                  <span className="text-xs font-bold">WhatsApp</span>
                </a>
              </div>

              <div className="relative mt-2">
                <input 
                  type="text" 
                  readOnly 
                  value={shareData.url}
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-xs text-gray-400 focus:outline-none"
                />
                <button 
                  onClick={copyToClipboard}
                  className="absolute right-1 top-1 bottom-1 px-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton;
