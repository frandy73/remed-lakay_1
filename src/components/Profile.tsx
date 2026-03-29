import React from "react";
import { User, Settings, Globe, Moon, Shield, Mail, LogOut, ChevronRight, Bookmark, Flower2 } from "lucide-react";
import { motion } from "motion/react";

export const Profile = () => {
  const settings = [
    { title: "Chanje Lang", sub: "Kreyòl / Fransè", icon: Globe },
    { title: "Mòd Sombre", sub: "Ekonomize batri", icon: Moon, toggle: true },
    { title: "Konsèy Legal", sub: "Règleman ak Kondisyon", icon: Shield },
    { title: "Kontakte nou", sub: "Voye yon mesaj", icon: Mail },
  ];

  return (
    <div className="pt-8 pb-32 px-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-serif text-olive">Remèd Natirèl</h1>
        <Settings className="w-6 h-6 text-olive" />
      </div>

      <div className="flex flex-col items-center mb-12">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img 
              src="https://picsum.photos/seed/profile/200" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-olive rounded-full flex items-center justify-center text-white border-4 border-cream">
            <Settings className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-3xl font-serif mt-6">Grandèt Kreyòl</h2>
        <p className="text-olive/40 text-sm font-medium">Manm depi 2023</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="bg-sage/30 p-8 rounded-[40px] text-center">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Flower2 className="w-5 h-5 text-olive" />
          </div>
          <div className="text-3xl font-serif mb-1">12</div>
          <div className="text-xs text-olive/40 uppercase tracking-widest">Remèd Savon</div>
        </div>
        <div className="bg-sage/30 p-8 rounded-[40px] text-center">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-5 h-5 text-olive" />
          </div>
          <div className="text-3xl font-serif mb-1">45</div>
          <div className="text-xs text-olive/40 uppercase tracking-widest">Plante Préféré</div>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <h3 className="text-xl font-serif mb-6">Anviwònman</h3>
        <div className="bg-white rounded-[40px] p-4 space-y-2">
          {settings.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-cream/50 rounded-[30px] transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sage/30 rounded-2xl flex items-center justify-center group-hover:bg-sage/50 transition-colors">
                  <item.icon className="w-6 h-6 text-olive" />
                </div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-olive/40">{item.sub}</div>
                </div>
              </div>
              {item.toggle ? (
                <div className="w-12 h-6 bg-olive rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              ) : (
                <ChevronRight className="w-5 h-5 text-olive/20" />
              )}
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-5 bg-sage/30 text-olive font-medium rounded-[40px] flex items-center justify-center gap-3 hover:bg-sage/50 transition-all">
        <LogOut className="w-5 h-5" />
        Dekonekte
      </button>

      <p className="text-[10px] text-center text-olive/30 mt-8 font-medium">
        Vèsyon 1.4.2 • Remèd Natirèl ayisyen
      </p>
    </div>
  );
};
