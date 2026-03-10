import { useState } from 'react';
import { QrCode } from 'lucide-react';

const QrInput = ({ onGenerate, isAr }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (value) => {
    if (!value.trim()) return isAr ? 'الرجاء إدخال رابط' : 'Please enter a URL';
    try {
      new URL(value.startsWith('http') ? value : `https://${value}`);
      return '';
    } catch {
      return isAr ? 'رابط غير صالح' : 'Invalid URL format';
    }
  };

  const handleGenerate = () => {
    const validationError = validateUrl(url);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    const finalUrl = url.startsWith('http') ? url : `https://${url}`;
    onGenerate(finalUrl);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleGenerate();
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <label
        htmlFor="qr-url-input"
        className="block text-sm font-semibold text-slate-600 dark:text-gray-400 mb-2"
      >
        {isAr ? 'أدخل الرابط' : 'Enter URL'}
      </label>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            id="qr-url-input"
            type="url"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setError(''); }}
            onKeyDown={handleKeyDown}
            placeholder="https://yourwebsite.com"
            autoComplete="url"
            className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 outline-none transition-all duration-200 ${
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-slate-200 dark:border-white/10 focus:border-cyan focus:ring-2 focus:ring-cyan/20'
            }`}
          />
        </div>
        <button
          onClick={handleGenerate}
          id="qr-generate-btn"
          aria-label={isAr ? 'إنشاء رمز QR' : 'Generate QR Code'}
          className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan to-purple text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <QrCode size={20} />
          <span className="hidden sm:inline">{isAr ? 'إنشاء' : 'Generate'}</span>
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400 animate-pulse" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default QrInput;
