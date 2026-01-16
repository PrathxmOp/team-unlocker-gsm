
import React from 'react';
import { GSMService, ServiceStatus } from '../types';

interface Props {
  service: GSMService;
  telegramUsername: string;
}

const ServiceCard: React.FC<Props> = ({ service, telegramUsername }) => {
  const isOnline = service.status === ServiceStatus.ONLINE;

  const handleOrder = () => {
    if (!isOnline) return;
    const message = encodeURIComponent(`Hello, I would like to request the following service:
Service: ${service.name}
Model: [Type Model Here]
Issue: [Describe Issue Here]`);
    window.open(`https://t.me/${telegramUsername}?text=${message}`, '_blank');
  };

  return (
    <div className={`service-card glass p-6 rounded-2xl flex flex-col h-full transition-all duration-300 border ${!isOnline ? 'opacity-60 grayscale' : 'border-slate-800'}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${isOnline ? 'from-cyan-500/20 to-blue-500/20 text-cyan-400' : 'from-slate-800 to-slate-900 text-slate-500'}`}>
          <i className={`fa-solid ${service.icon} text-xl`}></i>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${isOnline ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
          {service.status}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-3">{service.name}</h3>
      <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
        {service.description}
      </p>

      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">Supported Brands</p>
        <div className="flex flex-wrap gap-2">
          {service.supportedBrands.map(brand => (
            <span key={brand} className="text-[11px] bg-slate-800/50 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              {brand}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleOrder}
        disabled={!isOnline}
        className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 
          ${isOnline 
            ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20' 
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
      >
        <i className="fa-brands fa-telegram text-lg"></i>
        {isOnline ? 'Order on Telegram' : 'Service Currently Offline'}
      </button>
    </div>
  );
};

export default ServiceCard;
