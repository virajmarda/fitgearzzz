import React, { useState } from 'react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '+918668623252'; // Replace with actual WhatsApp number
  const message = 'Hi! I need help with a product on FitGearzzz';

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 9999,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            right: '70px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'white',
            color: '#333',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          Chat with us!
        </div>
      )}
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
          animation: 'pulse 2s infinite',
        }}
      >
        {/* Official WhatsApp icon SVG */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 2C8.268 2 2 8.268 2 16c0 2.786.756 5.396 2.073 7.643L2 30l4.573-1.997A13.927 13.927 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 4.364c6.424 0 11.636 5.212 11.636 11.636S22.424 27.636 16 27.636a11.6 11.6 0 0 1-5.878-1.592l-.422-.252-4.374 1.146 1.166-4.262-.276-.438A11.6 11.6 0 0 1 4.364 16C4.364 9.576 9.576 4.364 16 4.364z"
            fill="#25D366"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.172 10.065c-.23-.512-.473-.522-.691-.531-.179-.008-.384-.007-.589-.007-.205 0-.538.077-.819.384-.281.308-1.075 1.05-1.075 2.56s1.1 2.97 1.253 3.175c.154.205 2.14 3.4 5.26 4.632.734.317 1.307.506 1.754.648.737.235 1.408.202 1.938.122.591-.088 1.82-.744 2.077-1.463.256-.718.256-1.334.179-1.463-.077-.128-.282-.205-.589-.359-.307-.154-1.818-.897-2.099-1-.282-.102-.487-.154-.692.154-.205.307-.794 1-.973 1.205-.18.205-.359.23-.666.077-.307-.154-1.297-.478-2.47-1.524-.912-.814-1.528-1.819-1.707-2.126-.179-.307-.019-.473.135-.626.138-.138.307-.358.461-.538.154-.179.205-.307.307-.512.103-.205.052-.384-.026-.538-.077-.154-.674-1.673-.948-2.289z"
            fill="white"
          />
        </svg>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.6); }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;
