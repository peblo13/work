import React, { useEffect } from 'react';

interface AdProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const Ad: React.FC<AdProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  style = {},
  className = ''
}) => {
  useEffect(() => {
    // Initialize AdSense ads when component mounts
    if (window.adsbygoogle && window.adsbygoogle.length > 0) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // Silent fail
      }
    }
  }, []);

  // Always show a visible placeholder for AdSense
  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 100, background: 'transparent', border: '2px dashed #ccc', borderRadius: 8, position: 'relative', width: '100%' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      >
        <span style={{
          fontSize: 16,
          color: '#888',
          background: 'rgba(255,255,255,0.8)',
          padding: '8px 18px',
          borderRadius: 6,
          border: '1px solid #ccc',
          fontWeight: 500,
          margin: 'auto',
          pointerEvents: 'none',
          width: '100%',
          textAlign: 'center'
        }}>
          Google AdSense – miejsce na reklamę
        </span>
      </ins>
    </div>
  );
};

// Declare global AdSense types
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default Ad;