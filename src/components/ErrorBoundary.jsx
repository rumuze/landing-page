import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-background text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card max-w-md w-full p-8 border-red-500/20"
          >
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/20 to-purple-500/20 border border-red-500/20 shadow-2xl shadow-red-500/10">
               <img src="/rumuze.svg" alt="Rumuze Logo" className="w-8 h-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-4">System Interruption</h1>
            <p className="text-slate-600 dark:text-gray-400 mb-6 max-w-xs mx-auto">
              Our engineering team has been automatically notified. We are resolving this anomaly.
            </p>
            <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/5 text-left text-xs font-mono mb-8 overflow-auto max-h-40 text-red-500/80">
               {this.state.error && this.state.error.toString()}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary w-full shadow-lg shadow-cyan/20"
            >
              Reinitialize System
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
