import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { Chat } from "./components/Chat";
import { Activation } from "./components/Activation";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isActivated, setIsActivated] = useState<boolean>(() => {
    return localStorage.getItem("remed_lakay_activated") === "true";
  });
  const [messageCount, setMessageCount] = useState<number>(() => {
    return parseInt(localStorage.getItem("remed_lakay_msg_count") || "0");
  });

  const TRIAL_LIMIT = 0; // Immediate activation

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    setInstallPrompt(null);
  };

  const handleActivate = () => {
    setIsActivated(true);
  };

  const handleMessageSent = () => {
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    localStorage.setItem("remed_lakay_msg_count", newCount.toString());
  };

  const shouldShowActivation = !isActivated && messageCount >= TRIAL_LIMIT;

  return (
    <div className="min-h-screen bg-cream font-serif text-olive selection:bg-olive selection:text-white">
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <>
          {shouldShowActivation ? (
            <Activation onActivate={handleActivate} />
          ) : (
            <Chat 
              installPrompt={installPrompt} 
              onInstallClick={handleInstallClick} 
              onMessageSent={handleMessageSent}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
