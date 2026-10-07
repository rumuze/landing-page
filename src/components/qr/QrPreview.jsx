import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import QrScanReveal from './QrScanReveal';
import { prefersReducedMotion } from '../motion/useCanvasLoop';

// Puts the generated code into `targetRef`. It is its own component so that its layout effect
// runs before the scan overlay's (siblings run in order): the code is in place when the overlay
// measures it and covers it, before anything is painted.
const QrMount = ({ qrCode, targetRef }) => {
  useLayoutEffect(() => {
    const target = targetRef.current;
    if (!qrCode || !target) return;
    target.innerHTML = '';
    qrCode.append(target);
  }, [qrCode, targetRef]);
  return null;
};

// Each generated code gets an id, so the scan plays once per code and again for the next one.
let nextRunId = 0;
const runIds = new WeakMap();
const runIdFor = (qrCode) => {
  if (!runIds.has(qrCode)) {
    nextRunId += 1;
    runIds.set(qrCode, nextRunId);
  }
  return runIds.get(qrCode);
};

const QrPreview = ({ qrCode, url, isAr, scanColors }) => {
  const qrRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [finishedRun, setFinishedRun] = useState(0);
  const runId = qrCode ? runIdFor(qrCode) : 0;
  const scanning = Boolean(qrCode) && finishedRun !== runId && !prefersReducedMotion();
  const handleScanDone = useCallback(() => setFinishedRun(runId), [runId]);

  const handleDownload = () => {
    if (qrCode) {
      qrCode.download({ name: 'qr-code-rumuze', extension: 'png' });
    }
  };

  const handleCopyLink = async () => {
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  if (!qrCode) return null;

  return (
    <div className="flex flex-col items-center gap-6 mt-8 animate-fade-in">
      <div className="relative group">
        <div
          ref={qrRef}
          id="qr-preview-container"
          className="relative bg-white rounded-2xl p-4 shadow-2xl"
        />
        <QrMount qrCode={qrCode} targetRef={qrRef} />
        {scanning && (
          <QrScanReveal
            key={runId}
            colors={scanColors}
            onDone={handleScanDone}
            targetRef={qrRef}
          />
        )}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={handleDownload}
          id="qr-download-btn"
          aria-label={isAr ? 'تحميل PNG' : 'Download PNG'}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white/10 text-white font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download size={18} />
          {isAr ? 'تحميل PNG' : 'Download PNG'}
        </button>
        <button
          onClick={handleCopyLink}
          id="qr-copy-link-btn"
          aria-label={isAr ? 'نسخ الرابط' : 'Copy Link'}
          className="flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 font-semibold rounded-xl hover:border-cyan dark:hover:border-cyan/50 hover:text-cyan transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          {copied
            ? (isAr ? 'تم النسخ!' : 'Copied!')
            : (isAr ? 'نسخ الرابط' : 'Copy Link')}
        </button>
      </div>
    </div>
  );
};

export default QrPreview;
