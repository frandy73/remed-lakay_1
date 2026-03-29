import { useState, useRef, useEffect, FC } from "react";
import { Send, Camera, Leaf, Settings as SettingsIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { sendMessageToChatPDF, ChatPDFMessage } from "../lib/chatpdf";
import { cn } from "../lib/utils";
import { Settings } from "./Settings";
import { plants, Plant } from "../data/plants";

interface Message {
  role: "user" | "model";
  text: string;
  time?: string;
  detectedPlant?: Plant;
}

interface ChatProps {
  installPrompt: any;
  onInstallClick: () => void;
  onMessageSent: () => void;
}

export const Chat: FC<ChatProps> = ({ installPrompt, onInstallClick, onMessageSent }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("remed_lakay_chat");
    return saved ? JSON.parse(saved) : [
      { role: "model", text: "Onè! Mwen se Konpè Fèy, ekspè ou nan medsin fèy lakay. Ki pwoblèm sante oswa ki maladi ki ap kale w la a?", time: "Kounye a" }
    ];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("remed_lakay_chat", JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const findPlantInMessage = (text: string): Plant | undefined => {
    return plants.find(p => text.toLowerCase().includes(p.name.toLowerCase()));
  };

  const clearChat = () => {
    const initialMessage = [{ role: "model" as const, text: "Onè! Mwen se Konpè Fèy, ekspè ou nan medsin fèy lakay. Ki pwoblèm sante oswa ki maladi ki ap kale w la a?", time: "Kounye a" }];
    setMessages(initialMessage);
    localStorage.setItem("remed_lakay_chat", JSON.stringify(initialMessage));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // If trial is over, don't allow sending and just notify parent
    // However, the parent App.tsx handles the visibility, so we just
    // ensure we don't send if we somehow got here.
    
    const userMessage = input.trim();
    setInput("");
    
    const newMessages = [...messages, { role: "user" as const, text: userMessage, time: "Kounye a" }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const chatHistory: ChatPDFMessage[] = newMessages.map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text
      }));

      const response = await sendMessageToChatPDF(chatHistory);

      if (response) {
        const detectedPlant = findPlantInMessage(response);
        setMessages(prev => [...prev, { 
          role: "model", 
          text: response, 
          time: "Kounye a",
          detectedPlant: detectedPlant
        }]);
        
        // Track the message for trial period AFTER the response is shown
        // We add a small delay so the user can see the message appear
        setTimeout(() => {
          onMessageSent();
        }, 1000);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "model", text: "Eskize m, mwen gen yon ti pwoblèm teknik. Tanpri tcheke kle API ou yo.", time: "Kounye a" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = ["Grip", "Maltèt", "Vant fè mal", "Pwatrin"];

  return (
    <div className="flex flex-col h-screen bg-cream">
      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <Settings 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
            installPrompt={installPrompt}
            onInstallClick={onInstallClick}
            onClearChat={clearChat}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-6 pt-12 flex items-center justify-between border-none">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-olive rounded-2xl flex items-center justify-center text-white shadow-lg shadow-olive/20">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-serif text-olive">Konpè Fèy</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-olive/40 uppercase tracking-widest">ASISTAN AI</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-olive shadow-sm hover:bg-olive hover:text-white transition-all"
        >
          <SettingsIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-32">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex flex-col w-full",
              m.role === "user" ? "items-end" : "items-start"
            )}
          >
            <div className={cn(
              "max-w-[85%] p-6 rounded-[32px] text-lg leading-relaxed shadow-sm",
              m.role === "user" 
                ? "bg-white text-olive rounded-tr-none border border-olive/5" 
                : "bg-olive text-white rounded-tl-none"
            )}>
              {m.text}
            </div>

            {/* Plant Card */}
            {m.detectedPlant && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 w-[85%] bg-white rounded-[32px] overflow-hidden shadow-md border border-olive/5"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img src={m.detectedPlant.image} alt={m.detectedPlant.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif text-olive">{m.detectedPlant.name}</h3>
                    <span className="text-[10px] font-bold text-olive/30 italic uppercase">{m.detectedPlant.scientificName}</span>
                  </div>
                  <p className="text-sm text-olive/70 leading-relaxed">
                    {m.detectedPlant.description}
                  </p>
                </div>
              </motion.div>
            )}

            {m.time && (
              <span className="text-[10px] font-bold text-olive/20 uppercase tracking-widest mt-2 px-2">
                {m.time}
              </span>
            )}
            
            {i === messages.length - 1 && m.role === "model" && !isLoading && (
              <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar w-full">
                {quickActions.map(action => (
                  <button 
                    key={action}
                    onClick={() => { setInput(action); }}
                    className="px-6 py-3 bg-sage/30 rounded-full text-sm font-bold text-olive whitespace-nowrap hover:bg-sage/50 transition-all font-sans"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-olive p-6 rounded-[32px] rounded-tl-none flex gap-2">
              <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pb-10 bg-gradient-to-t from-cream via-cream to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto flex gap-3 items-center pointer-events-auto">
          <div className="flex-1 relative flex items-center bg-white rounded-full shadow-xl shadow-olive/10 px-6 py-2 overflow-hidden border border-olive/5">
            <button className="p-2 text-olive/20 hover:text-olive transition-colors">
              <Camera className="w-6 h-6" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ekri yon maladi oswa yon p..."
              className="flex-1 py-4 bg-transparent outline-none text-olive placeholder:text-olive/20 ml-2 font-sans"
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-16 h-16 bg-olive rounded-full flex items-center justify-center text-white shadow-xl shadow-olive/40 disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-6 h-6 rotate-[-15deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};
