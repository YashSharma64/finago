import React from 'react';
import Logo from './Logo';

const LandingPage = ({ onGetStarted, onLoginClick }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full overflow-x-hidden font-poppins selection:bg-indigo-100 selection:text-indigo-900">
      {/* added Glassmorphism */}
      <nav className="glass-light flex justify-between items-center px-6 py-4 md:px-5 fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[85%] rounded-3xl border border-white/40 cursor-pointer">
        <div className="flex items-center scale-75 md:scale-100">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#2d4778" strokeWidth="8"/>
            <text x="50" y="65" textAnchor="middle" fill="#2d4778" className="text-4xl font-bold font-outfit">$</text>
          </svg>
        </div>
        <div className="text-slate-500 text-sm md:text-base font-medium text-center hidden lg:block tracking-tight md:tracking-wider">
          India's Most Trusted AI Financial Advisor
        </div>
        <button 
          className="bg-indigo-800 text-white px-6 py-2.5 md:px-8 md:py-4 rounded-2xl text-sm md:text-base transition-all duration-300 hover:bg-black cursor-pointer font-poppins"
          onClick={onLoginClick}
        >
          Login / Register
        </button>
      </nav>
      
    
      <main className="relative flex-1 flex flex-col items-center justify-center px-6 py-40 md:py-46 text-center max-w-[1400px] mx-auto gap-8 w-full mt-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 blur-[120px] pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-400 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full"></div>
        </div>
        
        <div className="scale-75 md:scale-110 mb-[-2rem] md:mb-0">
          <Logo />
        </div>
        
        <h1 className="text-slate-800 text-3xl md:text-5xl lg:text-5xl font-poppins my-3 max-w-[1000px] w-full px-4 tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-5 duration-700 mt-[4rem]">
          Elevating Indian Wealth <br className="hidden md:block" /> 
          <span className="font-bold text-indigo-800 italic">One AI Suggestion</span> At A Time.
        </h1>
        
        <p className="text-slate-500 text-base md:text-xl max-w-2xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Join thousands of Indians turning their daily savings into rewarding investments with our state-of-the-art AI Advisory.
        </p>

        <button 
          className="bg-black text-white px-10 py-5 rounded-3xl text-lg md:text-x font-poppins font-semibold shadow-2xl transition-all duration-300 hover:bg-indigo-800 hover:scale-100 active:scale-95 whitespace-nowrap animate-in zoom-in-50 duration-500 mt-4 cursor-pointer"
          onClick={onGetStarted}
        >
          Get Started Now - Free 
        </button>

        <div className="flex items-center gap-3 text-slate-400 mt-8 text-sm md:text-lg animate-fade-in duration-1000">
          <span className="text-3xl">🤖</span>
          <p className="font-medium">Powered by Gemini 2.0 Flash AI</p>
        </div>
      </main>

      
      <section className="bg-slate-50 py-24 md:py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-[#2d4778] text-4xl md:text-5xl font-bold mb-4 tracking-tight">Meet FINAGO</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6">📊</div>
              <h3 className="text-[#2d4778] text-xl font-bold mb-4">Smart Budgeting</h3>
              <p className="text-slate-500 font-light leading-relaxed">
                Automatic tracking and analysis of your spending habits tailored for the Indian lifestyle.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🎯</div>
              <h3 className="text-[#2d4778] text-xl font-bold mb-4">Goal Oriented</h3>
              <p className="text-slate-500 font-light leading-relaxed">
                Whether it's a new car, a house, or a dream vacation, Finago designs the path for you.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center text-3xl mb-6">💰</div>
              <h3 className="text-[#2d4778] text-xl font-bold mb-4">Grow Wealth</h3>
              <p className="text-slate-500 font-light leading-relaxed">
                Receive data-driven investment tips that help turn your small savings into rewarded returns.
              </p>
            </div>
          </div>

          <div className="mt-20 md:mt-32 p-8 md:p-12 glass shadow-2xl rounded-[3rem] flex flex-col md:flex-row items-center gap-10 bg-white/40 border-white/60">
            <div className="w-[180px] h-[180px] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl flex-shrink-0 group relative">
              <img src="/Yash.png" alt="Yash Sharma" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-[#2d4778] text-3xl font-black mb-2 tracking-tighter">Yash Sharma</h3>
              <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-4">Founder & AI Lead</p>
              <p className="text-slate-600 text-lg font-light italic leading-relaxed mb-6 max-w-xl">
                "At Finago, we believe managing money shouldn't be stressful. We've built a companion that understands the Indian mindset to ensure your money is in safe hands."
              </p>
              <div className="flex gap-4 items-center justify-center md:justify-start">
                <a href="https://www.linkedin.com/in/yash-sharma-6960ab326/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white shadow-md rounded-2xl hover:bg-[#0A66C2] hover:text-white transition-all hover:-translate-y-1">
                  <img src="/Linkedin.png" alt="LinkedIn" className="w-6 h-6" />
                </a>
                <a href="https://wa.me/919711132445" target="_blank" rel="noopener noreferrer" className="p-3 bg-white shadow-md rounded-2xl hover:bg-[#25D366] hover:text-white transition-all hover:-translate-y-1">
                  <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 px-6 py-20 text-white rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-6">
              <svg width="40" height="40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f9ea94" strokeWidth="8"/>
                <text x="50" y="65" textAnchor="middle" fill="#f9ea94" className="text-4xl font-black">$</text>
              </svg>
              <h3 className="text-[#f9ea94] text-2xl font-bold font-outfit">finago.ai</h3>
            </div>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              India's first AI financial advisor. Empowering everyone with smart, data-driven decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h4 className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-8">Quick Contact</h4>
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-slate-300 font-light hover:text-white transition-colors cursor-pointer">
                  <span>📧</span> yashsharma.aiml@gmail.com
                </p>
                <p className="flex items-center gap-3 text-slate-300 font-light">
                  <span>📞</span> +91 9711132445
                </p>
                <p className="flex items-center gap-3 text-slate-300 font-light leading-snug">
                  <span>📍</span> YourSpace Hostel, Porwal Rd, Pune
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:items-end">
              <h4 className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-8 md:text-right">Social presence</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all">
                  <img src="/Linkedin.png" alt="LinkedIn" className="w-5 h-5 invert opacity-70" />
                </a>
                <a href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all">
                  <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 invert opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm font-medium">
          <p>© 2025 Finago.ai — All Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
 
