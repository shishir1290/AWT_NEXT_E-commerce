import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <div className="logo-container">
      <Image
        src="/uploads/Logo.png"  // Update the image path relative to the 'public' directory
        alt="Logo"
        width={50}
        height={50}
      />
    </div>
  );
};

export default Logo;
