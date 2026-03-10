import { useState, useRef, useCallback } from 'react';
import QRCodeStyling from 'qr-code-styling';
import QrInput from './QrInput';
import QrPreview from './QrPreview';

const LOGO_URL = '/rumuze-logo-master.png';

const QR_DEFAULTS = {
  width: 300,
  height: 300,
  type: 'canvas',
  margin: 12,
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 8,
    imageSize: 0.35,
  },
  dotsOptions: {
    type: 'rounded',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
  cornersDotOptions: {
    type: 'dot',
  },
};

const QrGenerator = ({ isAr }) => {
  const [qrCode, setQrCode] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [dotColor, setDotColor] = useState('#000B18');
  const [bgColor, setBgColor] = useState('#ffffff');
  const qrInstanceRef = useRef(null);

  const generateQr = useCallback(
    (url) => {
      // Dispose previous instance
      if (qrInstanceRef.current) {
        qrInstanceRef.current = null;
      }

      const qr = new QRCodeStyling({
        ...QR_DEFAULTS,
        data: url,
        image: LOGO_URL,
        dotsOptions: {
          ...QR_DEFAULTS.dotsOptions,
          color: dotColor,
        },
        backgroundOptions: {
          color: bgColor,
        },
        cornersSquareOptions: {
          ...QR_DEFAULTS.cornersSquareOptions,
          color: dotColor,
        },
        cornersDotOptions: {
          ...QR_DEFAULTS.cornersDotOptions,
          color: dotColor,
        },
      });

      qrInstanceRef.current = qr;
      setQrCode(qr);
      setCurrentUrl(url);
    },
    [dotColor, bgColor]
  );

  return (
    <section
      id="qr-generator-section"
      className="relative py-16"
      aria-label={isAr ? 'مولد رمز QR' : 'QR Code Generator'}
    >
      <div className="max-w-2xl mx-auto px-4">
        {/* Color pickers */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <label
              htmlFor="qr-dot-color"
              className="text-sm font-medium text-slate-600 dark:text-gray-400"
            >
              {isAr ? 'لون النقاط' : 'QR Color'}
            </label>
            <input
              type="color"
              id="qr-dot-color"
              value={dotColor}
              onChange={(e) => setDotColor(e.target.value)}
              className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-white/10 cursor-pointer appearance-none bg-transparent"
            />
          </div>
          <div className="flex items-center gap-3">
            <label
              htmlFor="qr-bg-color"
              className="text-sm font-medium text-slate-600 dark:text-gray-400"
            >
              {isAr ? 'لون الخلفية' : 'Background'}
            </label>
            <input
              type="color"
              id="qr-bg-color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-white/10 cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>

        <QrInput onGenerate={generateQr} isAr={isAr} />
        <QrPreview qrCode={qrCode} url={currentUrl} isAr={isAr} />
      </div>
    </section>
  );
};

export default QrGenerator;
