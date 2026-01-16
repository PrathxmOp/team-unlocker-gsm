
import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../types';

interface Props {
  settings: SiteSettings;
}

const SecurityPopup: React.FC<Props> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('gsm_security_warning_seen');
    if (!hasSeenPopup) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('gsm_security_warning_seen', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative glass max-w-md w-full rounded-2xl p-8 border border-red-500/30 shadow-2xl shadow-red-500/10">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <i className="fa-solid fa-triangle-exclamation text-3xl text-red-500"></i>
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-white">{settings.securityWarningTitle}</h2>
          
          <p className="text-slate-300 mb-6 leading-relaxed">
            {settings.securityWarningText}
          </p>

          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 mb-8 w-full">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-semibold">Official Contact</p>
            <p className="text-cyan-400 font-mono text-lg">@{settings.telegramChannel}</p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <a 
              href={`https://t.me/${settings.telegramChannel}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2"
            >
              <i className="fa-brands fa-telegram text-xl"></i>
              Join Official Channel
            </a>
            <button 
              onClick={handleClose}
              className="text-slate-400 hover:text-white text-sm font-medium py-2"
            >
              I understand, let me enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPopup;
