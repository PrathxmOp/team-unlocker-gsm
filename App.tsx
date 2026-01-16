import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SecurityPopup from './components/SecurityPopup';
import ServiceCard from './components/ServiceCard';
import FileBrowser from './components/FileBrowser';
import LegalModal from './components/LegalModal';
import { fetchDatabase, fetchLegalData, fetchPaymentMethods } from './data';
import { Database, LegalData, LegalContent, PaymentSection, PaymentsData } from './types';

const PaymentGroup: React.FC<{ section: PaymentSection; isGlobal?: boolean }> = ({ section, isGlobal }) => {
  return (
    <div className="glass p-8 rounded-3xl border border-slate-800 space-y-6">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isGlobal ? 'bg-cyan-500/10 text-cyan-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
          <i className={`fa-solid ${isGlobal ? 'fa-earth-americas' : 'fa-location-dot'}`}></i>
        </div>
        <h3 className="text-xl font-bold text-white">{section.title}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {section.methods.map((method, idx) => (
          <div key={idx} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-slate-700 transition-colors group">
            <i className={`fa-solid ${method.icon} text-slate-500 group-hover:text-cyan-400 transition-colors text-lg`}></i>
            <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">{method.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home: React.FC<{ db: Database; payments: PaymentsData }> = ({ db, payments }) => {
  const { settings, services, features } = db;
  
  // Filter out hidden services
  const visibleServices = services.filter(service => !service.hidden);

  return (
    <div className="space-y-16 py-10">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          {settings.heroTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 neon-glow">{settings.heroTitleHighlight}</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed px-4">
          {settings.heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={`https://t.me/${settings.telegramUsername}`}
            target="_blank"
            className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-cyan-600/20"
          >
            <i className="fa-brands fa-telegram text-2xl"></i>
            Contact Support
          </a>
          <Link 
            to="/files"
            className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border border-slate-700"
          >
            <i className="fa-solid fa-folder-open text-xl"></i>
            Browse Files
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services">
        <div className="flex items-center justify-between mb-8 px-4">
          <div>
            <h2 className="text-3xl font-bold text-white">{settings.servicesSectionTitle}</h2>
            <p className="text-slate-500 text-sm">{settings.servicesSectionSubtitle}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">{settings.systemsOnlineText}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {visibleServices.map(service => (
            <ServiceCard key={service.id} service={service} telegramUsername={settings.telegramUsername} />
          ))}
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">{settings.paymentSectionTitle}</h2>
          <p className="text-slate-500 text-sm mt-2">{settings.paymentSectionSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PaymentGroup section={payments.global} isGlobal />
          <PaymentGroup section={payments.india} />
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {features.map((feat, idx) => (
          <div key={idx} className="glass p-8 rounded-3xl border border-slate-800 text-center space-y-4">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto text-cyan-400 mb-4 border border-slate-800">
              <i className={`fa-solid ${feat.icon} text-2xl`}></i>
            </div>
            <h3 className="text-xl font-bold text-white">{feat.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

const App: React.FC = () => {
  const [db, setDb] = useState<Database | null>(null);
  const [legal, setLegal] = useState<LegalData | null>(null);
  const [payments, setPayments] = useState<PaymentsData | null>(null);
  const [activeLegal, setActiveLegal] = useState<LegalContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchDatabase(), fetchLegalData(), fetchPaymentMethods()])
      .then(([dbData, legalData, paymentsData]) => {
        setDb(dbData);
        setLegal(legalData);
        setPayments(paymentsData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Data loading failed:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !db || !payments) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const { settings, navigation } = db;

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950">
        <SecurityPopup settings={settings} />
        <LegalModal data={activeLegal} onClose={() => setActiveLegal(null)} />

        {/* Navigation */}
        <nav className="sticky top-0 z-50 glass border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                <i className="fa-solid fa-bolt-lightning text-white text-xl"></i>
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-white hidden sm:block">
                {settings.siteTagline} <span className="text-cyan-400">{settings.siteTaglineHighlight}</span>
              </span>
            </Link>

            <div className="flex items-center gap-2 md:gap-6">
              {navigation.map((nav, idx) => (
                <Link key={idx} to={nav.path} className="text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors px-3 py-2">
                  {nav.label}
                </Link>
              ))}
              <a 
                href={`https://t.me/${settings.telegramUsername}`}
                target="_blank"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white hover:bg-slate-800 transition-colors"
              >
                <i className="fa-brands fa-telegram text-lg text-cyan-400"></i>
                Telegram
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home db={db} payments={payments} />} />
            <Route path="/files" element={
              <div className="py-12 px-4 space-y-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h1 className="text-4xl font-extrabold text-white mb-4">{settings.filesSectionTitle}</h1>
                  <p className="text-slate-400">{settings.filesSectionSubtitle}</p>
                </div>
                <FileBrowser files={db.files} brands={db.brands} />
              </div>
            } />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 mt-20">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
              <div className="space-y-6 flex flex-col items-center text-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-600 rounded flex items-center justify-center">
                    <i className="fa-solid fa-bolt-lightning text-white text-sm"></i>
                  </div>
                  <span className="text-xl font-black uppercase text-white">{settings.siteName}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {settings.footerDescription}
                </p>
                <div className="flex gap-4">
                  <a href={`https://t.me/${settings.telegramChannel}`} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all">
                    <i className="fa-brands fa-telegram"></i>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2 glass p-8 rounded-3xl border border-red-500/10">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <i className="fa-solid fa-scale-balanced text-red-500 text-2xl mt-1 mx-auto md:mx-0"></i>
                  <div className="space-y-4 text-center md:text-left">
                    <h4 className="text-lg font-bold text-white uppercase tracking-widest">{settings.disclaimerTitle}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {settings.disclaimerText}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-900 flex flex-col items-center gap-6 text-xs font-medium text-slate-600">
              <div className="text-center">
                <p>&copy; 2025 {settings.siteName}. All rights reserved.</p>
                <p className="mt-1">Made with ❤️ in India</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => legal && setActiveLegal(legal.privacyPolicy)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => legal && setActiveLegal(legal.termsAndConditions)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Terms of Service
                </button>
                <button 
                  onClick={() => legal && setActiveLegal(legal.refundPolicy)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Refund Policy
                </button>
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile Floating Telegram Button */}
        <a 
          href={`https://t.me/${settings.telegramUsername}`}
          target="_blank"
          className="fixed bottom-6 right-6 z-[60] sm:hidden w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-cyan-600/40 border-2 border-cyan-400 animate-bounce"
        >
          <i className="fa-brands fa-telegram text-3xl"></i>
        </a>
      </div>
    </Router>
  );
};

export default App;