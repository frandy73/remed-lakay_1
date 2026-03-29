import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const shops = [
  {
    id: 1,
    name: "Boutik Natirèl Sen Michèl",
    address: "Ri Kapwa, Pòtoprens",
    phone: "+509 37XX-XXXX",
    hours: "8:00 AM - 5:00 PM",
    specialty: "Plant sèch ak lwil maskriti"
  },
  {
    id: 2,
    name: "Famasi Tradisyonèl Lakay",
    address: "Delma 31, Petyonvil",
    phone: "+509 34XX-XXXX",
    hours: "9:00 AM - 6:00 PM",
    specialty: "Siwo myel ak remèd grip"
  },
  {
    id: 3,
    name: "Espace Botanique Ayiti",
    address: "Kenskòf, Ayiti",
    phone: "+509 36XX-XXXX",
    hours: "7:00 AM - 4:00 PM",
    specialty: "Plant fre ak pepinyè"
  }
];

export const Boutik = () => {
  return (
    <div className="pb-24 bg-paper min-h-screen">
      <div className="px-6 py-12 max-w-5xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-serif italic text-olive mb-4">Boutik Natirèl</h1>
          <p className="text-lg text-olive/60 font-serif italic max-w-2xl mx-auto">
            Jwenn kote pou w achte fèy fre ak remèd natirèl nan zòn ou.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shops.map((shop, i) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[40px] shadow-xl shadow-olive/5 border border-olive/5 hover:shadow-2xl hover:shadow-olive/10 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-olive/5 rounded-2xl flex items-center justify-center text-olive group-hover:bg-olive group-hover:text-white transition-all">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-paper rounded-full text-olive hover:bg-olive hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-paper rounded-full text-olive hover:bg-olive hover:text-white transition-all">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-serif italic text-olive mb-2">{shop.name}</h3>
              <p className="text-olive/50 text-sm mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {shop.address}
              </p>

              <div className="space-y-3 pt-6 border-t border-olive/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-olive/40 font-serif italic">Telefòn</span>
                  <span className="text-olive font-medium">{shop.phone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-olive/40 font-serif italic">Lè Ouvèti</span>
                  <span className="text-olive font-medium">{shop.hours}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="mt-20 p-12 bg-olive rounded-[48px] text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif italic mb-4 relative z-10">Èske w gen yon boutik?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto font-serif italic relative z-10">
            Enskri boutik ou a sou Remèd Lakay pou plis moun ka jwenn ou.
          </p>
          <button className="bg-white text-olive px-10 py-4 rounded-full font-bold hover:bg-paper transition-all relative z-10">
            Kontakte nou
          </button>
        </section>
      </div>
    </div>
  );
};
