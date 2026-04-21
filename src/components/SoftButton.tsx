import React from 'react';

interface SoftButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const SoftButton: React.FC<SoftButtonProps> = ({ onClick, children, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`relative group transition-all duration-700 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-full ${
      disabled ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 cursor-pointer'
    }`}
    aria-disabled={disabled}
  >
    <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="relative flex items-center justify-center gap-6 px-10 py-5 bg-white/5 border border-white/20 hover:border-white/40 rounded-full backdrop-blur-xl transition-all active:scale-95">
      <span className="text-xs tracking-[0.3em] uppercase font-medium text-white select-none">{children}</span>
    </div>
  </button>
);

export default SoftButton;
