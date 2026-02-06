import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Linkedin,
  Github,
  Globe,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "./LoadingSpinner";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = true;
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = true;
    if (!formData.message) tempErrors.message = true;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          company: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
        // Auto-hide success message after 8 seconds for new copy read time
        setTimeout(() => setSuccess(false), 8000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
       console.error("Submission error:", error);
       alert("Failed to send message. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const inputClasses = (error) => `
    w-full bg-white/50 dark:bg-white/5 border rounded-xl px-4 py-3 
    focus:outline-none focus:border-cyan text-slate-900 dark:text-white transition-all
    ${error ? "border-red-500 shake-animation" : "border-slate-200 dark:border-white/10"}
  `;

  return (
    <section
      id="contact"
      className="min-h-screen py-24 bg-slate-50 dark:bg-transparent transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div
        className={`absolute top-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[100px] ${isRtl ? "-left-64" : "-right-64"}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`space-y-12 ${isRtl ? "lg:order-last text-right" : "text-left"}`}
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
                {t("contact.title")}
              </h2>
              <p className="text-lg text-slate-600 dark:text-gray-400 max-w-lg leading-relaxed">
                {t("contact.description")}
              </p>
            </div>

            <div className="space-y-8">
              <a
                href="mailto:connect@rumuze.com"
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center text-cyan shadow-lg shadow-cyan/5 group-hover:scale-110 transition-transform duration-300 border border-slate-100 dark:border-white/10">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                    {t("contact.info.email")}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 group-hover:text-cyan transition-colors">
                    connect@rumuze.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center text-purple shadow-lg shadow-purple/5 group-hover:scale-110 transition-transform duration-300 border border-slate-100 dark:border-white/10">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                    {t("contact.info.phone")}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center text-green-500 shadow-lg shadow-green-500/5 group-hover:scale-110 transition-transform duration-300 border border-slate-100 dark:border-white/10">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                    {t("contact.info.hq")}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    Obour City, Cairo, EG
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-white/10">
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 rounded-full bg-white dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-cyan hover:shadow-lg hover:shadow-cyan/20 transition-all border border-slate-200 dark:border-white/10"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-white dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-cyan hover:shadow-lg hover:shadow-cyan/20 transition-all border border-slate-200 dark:border-white/10"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-white dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-cyan hover:shadow-lg hover:shadow-cyan/20 transition-all border border-slate-200 dark:border-white/10"
                >
                  <Globe size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence>
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 z-10 glass-card flex flex-col items-center justify-center text-center p-8 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-green-500/20 shadow-2xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-6"
                  >
                    <CheckCircle size={48} />
                  </motion.div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 max-w-xs">
                    {t("contact.success")}
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-8 px-6 py-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="glass-card shadow-2xl cyan-glow !p-8 md:!p-10 border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/40">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-gray-500 pl-1">
                      {t("contact.labels.name")}
                    </label>
                    <motion.div
                      animate={errors.name ? { x: [-5, 5, -5, 5, 0] } : {}}
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses(errors.name)}
                        placeholder={t("contact.labels.name")}
                      />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-gray-500 pl-1">
                      {t("contact.labels.company")}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClasses(false)}
                      placeholder={t("contact.labels.company")}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-gray-500 pl-1">
                      {t("contact.labels.email")}
                    </label>
                    <motion.div
                      animate={errors.email ? { x: [-5, 5, -5, 5, 0] } : {}}
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses(errors.email)}
                        placeholder="john@company.com"
                      />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-gray-500 pl-1">
                      {t("contact.labels.subject")}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={inputClasses(false)}
                      placeholder={t("contact.labels.subject")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-gray-500 pl-1">
                    {t("contact.labels.message")}
                  </label>
                  <motion.div
                    animate={errors.message ? { x: [-5, 5, -5, 5, 0] } : {}}
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className={`${inputClasses(errors.message)} resize-none`}
                      placeholder={t("contact.labels.message")}
                    ></textarea>
                  </motion.div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 shadow-xl shadow-cyan/20 ${loading ? "opacity-80 cursor-wait" : ""}`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" color="white" />
                      <span className="text-sm">PROCESSING...</span>
                    </div>
                  ) : (
                    <>
                      {t("contact.labels.send")}
                      <Send size={20} className="rtl-flip" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
