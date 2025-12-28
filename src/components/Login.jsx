import React, { useState } from 'react';

const Login = ({ onClose, onContinue }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onContinue(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[2000] p-6">
      <div className="bg-[#0a0a0c] rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl border border-white/5 animate-in zoom-in-95 duration-300 relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700" />
        
        <div className="text-center relative">
          <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20">
            <svg width="40" height="40" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#6366F1" strokeWidth="12"/>
              <text x="50" y="65" textAnchor="middle" fill="#6366F1" className="text-4xl font-black italic">$</text>
            </svg>
          </div>
          
          <h2 className="text-white text-3xl font-black mb-2 tracking-tighter">Join FINAGO</h2>
          <p className="text-white/40 text-sm font-light mb-10 italic">Start your AI-powered wealth journey today.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-4">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Yash Sharma"
                className="w-full p-5 bg-white/[0.03] border border-white/5 rounded-2xl text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/10 font-bold"
                required
              />
            </div>
            
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-4">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="yash@finago.ai"
                className="w-full p-5 bg-white/[0.03] border border-white/5 rounded-2xl text-white outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/10 font-bold"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl text-base font-black uppercase tracking-widest transition-all hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-indigo-600/20 mt-4"
            >
              Secure Access
            </button>
          </form>
          
          <p className="mt-8 text-[11px] text-white/20 font-medium">
            By continuing, you agree to our <span className="underline cursor-pointer hover:text-white/40">Terms of Service</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
 