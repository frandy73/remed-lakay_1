import { useParams, useNavigate } from "react-router-dom";
import { plants } from "../data/plants";
import { ArrowLeft, Clock, AlertTriangle, CheckCircle2, Share2, Bookmark } from "lucide-react";
import { motion } from "motion/react";

export const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const plant = plants.find(p => p.id === id);

  if (!plant) return <div className="p-8">Plant sa a pa egziste.</div>;

  const ingredients = plant.preparation.split(".")[0].split(",");

  return (
    <div className="pb-32 bg-cream min-h-screen">
      {/* Header Image */}
      <div className="relative h-[45vh] overflow-hidden rounded-b-[60px] shadow-2xl">
        <img 
          src={plant.imageUrl} 
          alt={plant.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-8 left-6 right-6 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-olive shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            <h1 className="text-white font-serif text-xl">Detay Remèd</h1>
            <Bookmark className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="absolute bottom-10 left-8 bg-olive/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-white">
          <Clock className="w-4 h-4 text-green-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest">10 MIN</span>
        </div>
      </div>

      <div className="px-6 max-w-2xl mx-auto -mt-10 relative z-10">
        <h2 className="text-4xl font-serif text-olive mb-10">{plant.name} pou Grip</h2>

        {/* Warning Box */}
        {plant.contraindications && (
          <div className="bg-honey/30 rounded-[32px] p-6 flex gap-4 mb-10 border border-honey/50">
            <div className="w-10 h-10 bg-honey rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-olive" />
            </div>
            <p className="font-bold text-olive leading-tight pt-1">
              Atansyon: {plant.contraindications[0]}.
            </p>
          </div>
        )}

        <p className="text-lg text-olive/60 leading-relaxed italic mb-12">
          {plant.description} {plant.name} la gen pwopriyete antiseptik ki ede kò a goumen kont mikwòb.
        </p>

        {/* Ingredients */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-serif">Sa w bezwen</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-olive/40">{plant.virtues.length} ENGREDYAN</span>
          </div>
          <div className="space-y-3">
            {plant.virtues.map((v, i) => (
              <div key={i} className="bg-sage/20 rounded-[24px] p-5 flex items-center gap-4">
                <div className={i === 0 ? "text-olive" : "text-olive/20"}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mb-12">
          <h3 className="text-2xl font-serif mb-8">Etap pou Prepare l</h3>
          <div className="relative pl-8 space-y-12">
            <div className="absolute left-4 top-4 bottom-4 w-[1px] bg-olive/10" />
            
            {[
              { t: "Prepare dlo a", d: "Bouyi dlo a nan yon ti chodyè jiskaske li fè gwo boul." },
              { t: "Mete plant lan", d: `Lave fèy ${plant.name.toLowerCase()} yo byen pwòp epi mete yo nan dlo bouyi a.` },
              { t: "Tann li poze", d: "Kouvri l epi tann 5 minit anvan ou koule l pou ou bwè li." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className={i === 0 ? "absolute -left-8 top-0 w-8 h-8 bg-olive rounded-full flex items-center justify-center text-white text-xs font-bold" : "absolute -left-8 top-0 w-8 h-8 bg-sage rounded-full flex items-center justify-center text-olive text-xs font-bold"}>
                  {i + 1}
                </div>
                <div className="pl-6">
                  <h4 className="text-xl font-serif mb-2">{step.t}</h4>
                  <p className="text-olive/60 leading-relaxed italic">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Share Button */}
      <button className="fixed bottom-32 right-6 w-16 h-16 bg-[#8C5E58] rounded-full flex items-center justify-center text-white shadow-2xl z-40">
        <Share2 className="w-6 h-6" />
      </button>
    </div>
  );
};
