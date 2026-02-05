import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t('contact.success'));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-16 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className={`${isRtl ? 'lg:order-last' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              {t('contact.title').split(' ').slice(0, -1).join(' ')} <span className="text-cyan">{t('contact.title').split(' ').slice(-1)}</span>
            </h2>
            <p className="text-gray-400 mb-12 max-w-md">
              {t('contact.description')}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-cyan">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold">{t('contact.info.hq')}</h4>
                  <p className="text-sm text-gray-400">Silicon Valley, CA • Lagos, NG</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-purple">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold">{t('contact.info.email')}</h4>
                  <p className="text-sm text-gray-400">connect@rumuze.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-green-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold">{t('contact.info.phone')}</h4>
                  <p className="text-sm text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card cyan-glow p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.labels.name')}</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.labels.email')}</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('contact.labels.message')}</label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan transition-colors resize-none"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                {t('contact.labels.send')}
                <Send size={18} className="rtl-flip" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
