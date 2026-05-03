import React, { useState } from 'react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '+919876543210'; // Replace with actual WhatsApp number
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
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2C8.268 2 2 8.268 2 16c0 2.44.626 4.734 1.726 6.734L2.004 28.5l6.034-1.582C10.006 28.012 12.92 28 16 28c7.732 0 14-6.268 14-14S23.732 2 16 2z"
            fill="white"
          />
          <path
            d="M12.5 10.5c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.3c.2.2 2.5 3.8 6.1 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.1-.8 2.4-1.7.3-.9.3-1.6.2-1.7-.1-.2-.3-.3-.6-.4-.3-.1-2.1-1-2.4-1.1-.3-.1-.5-.2-.7.2-.2.4-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.4.1-.1.2-.2.2-.4.1-.2 0-.3 0-.4-.1-.1-.7-1.7-1-2.3z"
            fill="#25D366"
          />
        </svg>
      </div>
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            right: '70px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'white',
            padding: '10px 15px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333',
          }}
        >
          Chat with us!
        </div>
      )}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            }
            50% {
              box-shadow: 0 4px 20px rgba(37, 211, 102, 0.6);
            }
          }
        `}
      </style>
    </div>
  );
};

export default WhatsAppButton;
