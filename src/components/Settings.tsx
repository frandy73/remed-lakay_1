import { FC } from "react";
import { X, Download, Info, ShieldCheck, Github, Trash2 } from "lucide-react";
import { motion } from "motion/react";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  installPrompt: any;
  onInstallClick: () => void;
  onClearChat: () => void;
}

export const Settings: FC<SettingsProps> = ({ isOpen, onClose, installPrompt, onInstallClick, onClearChat }) => {
  if (!isOpen) return null;

  const handleInstall = async () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      onInstallClick(); // Clear the prompt in parent
    }
    onClose();
  };

  const handleClearChat = () => {
    if (window.confirm("Èske w sèten ou vle efase tout konvèsasyon an?")) {
      onClearChat();
      onClose();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-olive/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="w-full max-w-md bg-cream rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif text-olive">Anviwònman</h2>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-olive shadow-sm hover:bg-olive hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Install Section */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-olive/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-sage/20 rounded-xl flex items-center justify-center text-olive">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-olive">Enstale sou Telefòn</h3>
                  <p className="text-xs text-olive/60">Ajoute "Remèd Lakay" sou ekran lakay ou san w pa pase nan navigatè.</p>
                </div>
              </div>
              <button
                onClick={handleInstall}
                disabled={!installPrompt}
                className="w-full py-4 bg-olive text-white rounded-2xl font-bold shadow-lg shadow-olive/20 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {installPrompt ? "Enstale Kounye a" : "Aplikasyon an deja anstale"}
              </button>
            </div>

            {/* Clear Chat Section */}
            <button
              onClick={handleClearChat}
              className="w-full p-6 bg-white rounded-[32px] shadow-sm border border-red-50 flex items-center justify-between hover:bg-red-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-500">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-olive group-hover:text-red-600 transition-colors">Efase Konvèsasyon</h3>
                  <p className="text-xs text-olive/40">Tout mesaj yo pral efase.</p>
                </div>
              </div>
            </button>

            {/* App Info */}
            <div className="space-y-4 px-2">
              <div className="flex items-center gap-4 text-olive/80">
                <Info className="w-5 h-5" />
                <span className="text-sm font-medium">Vèsyon 1.0.0 (PWA)</span>
              </div>
              <div className="flex items-center gap-4 text-olive/80">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Done w yo sekirize</span>
              </div>
              <div className="flex items-center gap-4 text-olive/80">
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">Devlope pa @georges_loic</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[10px] font-bold text-olive/20 uppercase tracking-widest">
              © 2026 REMÈD LAKAY - TOUT DWA REZÈVE
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
