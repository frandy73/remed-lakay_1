export interface Plant {
  name: string;
  scientificName: string;
  image: string;
  description: string;
}

export const plants: Plant[] = [
  {
    name: "Jenjanm",
    scientificName: "Zingiber officinale",
    image: "/images/plants/jenjanm.png",
    description: "Konbat grip, tous, ak enflamasyon. Bouyi l ak sitwon."
  },
  {
    name: "Sitwonèl",
    scientificName: "Cymbopogon citratus",
    image: "/images/plants/sitwonel.png",
    description: "Trete lafyèv ak grip. Fè te ak fèy yo."
  },
  {
    name: "Moringa",
    scientificName: "Moringa oleifera",
    image: "/images/plants/moringa.png",
    description: "Ranfòse iminite, trete grip. Infuzyon flè ak fèy."
  },
  {
    name: "Lay",
    scientificName: "Allium sativum",
    image: "/images/plants/lay.png",
    description: "Antibyotik natirèl, trete grip ak tansyon. Manje l kri oswa nan te."
  },
  {
    name: "Sitwon",
    scientificName: "Citrus aurantiifolia",
    image: "/images/plants/sitwon.png",
    description: "Trete grip, tous, ak dyare. Bwè ji a cho ak myèl."
  }
];
