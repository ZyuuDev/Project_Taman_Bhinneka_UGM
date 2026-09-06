import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackIconSize?: number;
}

/**
 * Image component that safely handles broken or missing source files.
 * Uses a local CSS/lucide-react fallback instead of relying on remote placeholders.
 * Resets error state if `src` prop changes.
 */
export function SafeImage({ src, alt, className, fallbackIconSize = 48, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  if (src !== currentSrc) {
    setCurrentSrc(src);
    setHasError(false);
  }

  const handleError = () => {
    // Only warn once per image in development
    if (import.meta.env.DEV) {
      console.warn(`[SafeImage] Failed to load image: ${src}`);
    }
    setHasError(true);
  };

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--color-surface)] text-[var(--color-text-muted)] ${className || ''}`}
        aria-label={alt}
        role="img"
      >
        <ImageOff size={fallbackIconSize} strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      {...props}
      onError={(e) => {
        handleError();
        props.onError?.(e);
      }}
    />
  );
}
