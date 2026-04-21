import React from 'react';

const AtmosphericBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#1a2c38] blur-[120px] opacity-40"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#2c1a1a] blur-[100px] opacity-30"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/5 rounded-full pointer-events-none"></div>
    <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none"></div>
  </div>
);

export default AtmosphericBackground;
