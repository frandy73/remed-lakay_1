import React, { useState, FC } from "react";
import { Lock, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

interface ActivationProps {
  onActivate: () => void;
}

export const Activation: FC<ActivationProps> = ({ onActivate }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleActivate = () => {
    // You can change this master code to whatever you want
    const MASTER_CODE = "LAKAY509";
    
    if (code.toUpperCase() === MASTER_CODE) {
      localStorage.setItem("remed_lakay_activated", "true");
      onActivate();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const contactOwner = () => {
    const phoneNumber = "+50936620118"; // Added your phone number here
    const message = "Bonjou, mwen ta renmen achte yon kòd aktivasyon pou Remèd Lakay.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6 bg-gradient-to-b from-cream to-sage/20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden border border-olive/5"
      >
        <div className="p-8 pt-12 flex flex-col items-center">
          <div className="w-20 h-20 bg-olive rounded-3xl flex items-center justify-center text-white shadow-xl shadow-olive/20 mb-8">
            <Lock className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-serif text-olive mb-3 text-center">Aktivasyon App</h2>
          <p className="text-sm text-olive/60 text-center mb-8 bg-sage/10 p-4 rounded-2xl">
            Aplikasyon sa a se yon pwodwi ki peye. Antre kòd ou a pou w ka kòmanse.
          </p>

          <div className="w-full space-y-4">
            <div className={`relative flex items-center bg-cream rounded-2xl border-2 transition-all ${error ? 'border-red-400 shake' : 'border-transparent focus-within:border-olive/20'}`}>
              <input 
                type="text" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="EKRI KÒD LA ISIT"
                className="w-full py-5 px-6 bg-transparent outline-none text-olive font-bold tracking-widest placeholder:text-olive/20 placeholder:tracking-normal placeholder:font-normal"
              />
            </div>
            
            <button 
              onClick={handleActivate}
              className="w-full py-5 bg-olive text-white rounded-2xl font-bold shadow-xl shadow-olive/30 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              AKTIWE KOUNYE A
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-olive/5 w-full">
            <p className="text-[10px] font-bold text-olive/20 uppercase tracking-widest text-center mb-4">OU POKO GEN KÒD?</p>
            <button 
              onClick={contactOwner}
              className="w-full py-4 bg-green-50 text-green-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Kontakte m sou WhatsApp
            </button>
          </div>
        </div>

        <div className="p-6 bg-olive/5 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-olive/40" />
          <span className="text-[10px] font-bold text-olive/30 uppercase tracking-widest">Sistèm Sekirize 100%</span>
        </div>
      </motion.div>
    </div>
  );
};
