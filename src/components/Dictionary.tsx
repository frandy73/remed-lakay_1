import { useState, useEffect } from "react";
import { plants, Plant } from "../data/plants";
import { Search, ChevronRight, Menu } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export const Dictionary = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
  }, [searchParams]);

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="pt-8 pb-32 px-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 text-olive font-serif text-2x font-bold">
          <div className="w-6 h-6 bg-olive rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span>Remèd Natirèl</span>
        </div>
        <button className="w-12 h-12 bg-sage/30 rounded-2xl flex items-center justify-center text-olive hover:bg-sage/50 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <header className="mb-10">
        <h1 className="text-5xl font-serif mb-4">Tout Plant yo</h1>
        <p className="text-olive/60 leading-relaxed italic">
          Dekouvri fòs ak sajès lanati nan men ou. Lis sa a genyen plant ki pi itil nan tradisyon lakay nou.
        </p>
      </header>
      
      <div className="relative mb-12">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-olive/20 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Chèche yon plant..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-14 pr-6 py-6 bg-sage/20 border-none rounded-3xl outline-none text-olive placeholder:text-olive/20 text-lg"
        />
      </div>

      <div className="space-y-12">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant, index) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/plant/${plant.id}`}
                className="block bg-sage/30 rounded-[48px] p-8 text-center group"
              >
                <div className="relative w-48 h-48 mx-auto -mt-20 mb-8 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img 
                    src={plant.imageUrl} 
                    alt={plant.name} 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-olive/40 mb-3">
                  Prensipal
                </div>
                
                <h3 className="text-4xl font-serif mb-4">{plant.name}</h3>
                
                <p className="text-olive/60 italic leading-relaxed mb-8 line-clamp-3">
                  {plant.description}
                </p>
                
                <div className="flex items-center justify-center gap-2 text-olive font-bold text-xs uppercase tracking-widest">
                  Li plis <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-24">
            <p className="text-olive/40 italic text-lg">Nou pa jwenn okenn plant pou "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
};
