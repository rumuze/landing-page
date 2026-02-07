/**
 * OptimizedImage Component
 * 
 * High-performance image component with:
 * - Responsive srcset for different screen sizes
 * - WebP format support with fallback
 * - Lazy loading (configurable)
 * - fetchpriority for LCP images
 * - Width/height to prevent CLS
 * - Optimized Unsplash URLs
 * 
 * @example
 * <OptimizedImage
 *   src="https://images.unsplash.com/photo-xxx"
 *   alt="Description"
 *   width={800}
 *   height={600}
 *   priority={false}
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 */

import { useState } from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = '100vw',
  className = '',
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate optimized Unsplash URLs with different widths
  const generateSrcSet = (baseUrl) => {
    // Check if it's an Unsplash URL
    if (!baseUrl.includes('unsplash.com')) {
      return null;
    }

    // Remove existing query params
    const cleanUrl = baseUrl.split('?')[0];
    
    // CRITICAL: Mobile-first breakpoints optimized for PageSpeed
    // Cap mobile at 600px to save 6KB+ per image
    const widths = [400, 600, 800, 1200, 1600];
    
    return widths
      .map(w => {
        // Aggressive compression for mobile (w <= 600): q=50
        // Standard compression for desktop: q=65
        const quality = w <= 600 ? 50 : 65;
        const url = `${cleanUrl}?auto=format&fit=crop&q=${quality}&w=${w}&fm=webp`;
        return `${url} ${w}w`;
      })
      .join(', ');
  };

  // Generate fallback URL (non-WebP)
  const generateFallbackUrl = (baseUrl, targetWidth) => {
    if (!baseUrl.includes('unsplash.com')) {
      return baseUrl;
    }

    const cleanUrl = baseUrl.split('?')[0];
    // Use 800px as default (good balance for mobile + desktop)
    const optimalWidth = targetWidth || 800;
    // Match srcset compression: q=65
    return `${cleanUrl}?auto=format&fit=crop&q=65&w=${optimalWidth}`;
  };

  const srcSet = generateSrcSet(src);
  const fallbackSrc = generateFallbackUrl(src, width || 800);

  return (
    <div 
      className={`rumuze-signature relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio: width && height ? `${width} / ${height}` : undefined 
      }}
    >
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-white/5 backdrop-blur-sm animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Actual image */}
      {!hasError && (
        <img
          src={fallbackSrc}
          srcSet={srcSet || undefined}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`
            w-full h-full transition-opacity duration-300
            ${objectFit === 'cover' ? 'object-cover' : 'object-contain'}
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}

      {/* Error fallback - Branded glassmorphism placeholder */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-md">
          <div className="text-center">
            {/* Branded "R" Logo Placeholder */}
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-cyan/20 to-purple/20 border border-white/10 flex items-center justify-center">
              <span className="text-2xl font-black bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">R</span>
            </div>
            <p className="text-sm text-white/40 font-medium">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  priority: PropTypes.bool,
  sizes: PropTypes.string,
  className: PropTypes.string,
  objectFit: PropTypes.oneOf(['cover', 'contain']),
};

export default OptimizedImage;
