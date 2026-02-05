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
            <h1 className="text-2xl font-black text-red-500 mb-4">Something went wrong</h1>
            <p className="text-slate-600 dark:text-gray-400 mb-6">
              The application encountered an unexpected error. 
            </p>
            <div className="bg-slate-100 dark:bg-black/30 p-4 rounded-lg text-left text-xs font-mono mb-6 overflow-auto max-h-40 text-red-400">
               {this.state.error && this.state.error.toString()}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              Reload Application
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
