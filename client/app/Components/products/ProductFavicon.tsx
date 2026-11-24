"use client";

import React, { useState } from "react";

interface ProductFaviconProps {
  name: string;
  href: string;
  icon?: string;
}

export const ProductFavicon: React.FC<ProductFaviconProps> = ({
  name,
  href,
  icon,
}) => {
  const [hasError, setHasError] = useState(false);

  let domain = "";
  try {
    domain = new URL(href).hostname;
  } catch {
    domain = href;
  }

  // Use real icon if present, otherwise fall back to Google favicon service
  const src =
    icon || `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div
      className="relative shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl  flex items-center justify-center overflow-hidden transition-transform duration-300 ease-out group-hover/item:scale-105 motion-reduce:transform-none select-none"
      aria-hidden="true"
    >
      {/* Fallback first letter under image */}
      <span className="text-lg font-semibold text-black/60 select-none">
        {initial}
      </span>

      {!hasError && (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 m-auto w-6 h-6 md:w-10 md:h-10 object-contain rounded-md"
          onError={() => setHasError(true)}
          onLoad={(e) => {
            const img = e.currentTarget;
            // If using external Google favicon service, it returns a 16x16 default globe if no favicon exists
            if (!icon && img.naturalWidth <= 16 && img.naturalHeight <= 16) {
              setHasError(true);
            }
          }}
        />
      )}
    </div>
  );
};

export default ProductFavicon;
