export type CatalogBrand = {
  name: string;
  slug: string;
  imageIndex: number;
  models: readonly string[];
};

export const CATALOG_BRANDS: readonly CatalogBrand[] = [
  { name: "0mega", slug: "0mega", imageIndex: 0, models: ["Aqua Terra", "Constellation", "Planet Ocean", "Seamaster 300", "Speedmaster"] },
  { name: "Audemars Piguet", slug: "audemars-piguet", imageIndex: 1, models: ["Royal Oak", "Royal Oak Offshore", "Royal Oak Chronograph", "Code 11.59"] },
  { name: "Bell Ross", slug: "bell-ross", imageIndex: 2, models: ["BR 03", "BR 05", "BR-X5"] },
  { name: "Blancpain", slug: "blancpain", imageIndex: 3, models: ["Fifty Fathoms", "Villeret", "Air Command"] },
  { name: "Breitling", slug: "breitling", imageIndex: 4, models: ["Navitimer", "Chronomat", "Superocean", "Avenger"] },
  { name: "BVLGARI", slug: "bvlgari", imageIndex: 5, models: ["Octo", "Serpenti", "Aluminium"] },
  { name: "Cartier", slug: "cartier", imageIndex: 6, models: ["Santos de Cartier", "Tank", "Ballon Bleu", "Panthère de Cartier"] },
  { name: "Chanel", slug: "chanel", imageIndex: 7, models: ["J12", "Première", "Boy·Friend", "Monsieur"] },
  { name: "DIOR", slug: "dior", imageIndex: 8, models: ["La D de Dior", "Gem Dior", "Chiffre Rouge"] },
  { name: "Franck Muller", slug: "franck-muller", imageIndex: 9, models: ["Vanguard", "Cintrée Curvex", "Long Island", "Crazy Hours"] },
  { name: "Glashütte", slug: "glashutte", imageIndex: 10, models: ["PanoMaticLunar", "SeaQ", "Senator", "Sixties"] },
  { name: "Grand Seiko", slug: "grand-seiko", imageIndex: 11, models: ["Heritage", "Sport", "Elegance", "Evolution 9"] },
  { name: "Hublot", slug: "hublot", imageIndex: 12, models: ["Big Bang Unico", "Classic Fusion", "Spirit of Big Bang", "Square Bang Unico"] },
  { name: "IWC", slug: "iwc", imageIndex: 13, models: ["Pilot’s Watches", "Portugieser", "Portofino", "Ingenieur", "Aquatimer"] },
  { name: "Jaeger LeCoultre", slug: "jaeger-lecoultre", imageIndex: 14, models: ["Reverso", "Master Control", "Polaris", "Rendez-Vous"] },
  { name: "Longines", slug: "longines", imageIndex: 15, models: ["HydroConquest", "Spirit", "Master Collection", "Conquest"] },
  { name: "MB&F", slug: "mb-and-f", imageIndex: 16, models: ["Legacy Machines", "Horological Machines", "Performance Art"] },
  { name: "Panerai", slug: "panerai", imageIndex: 17, models: ["Luminor", "Submersible", "Radiomir", "Luminor Due"] },
  { name: "Patek Philippe", slug: "patek-philippe", imageIndex: 18, models: ["Nautilus", "Aquanaut", "Calatrava", "Complications"] },
  { name: "R0lex", slug: "r0lex", imageIndex: 19, models: ["Submariner", "Datejust", "Daytona", "GMT-Master II", "Oyster Perpetual", "Day-Date"] },
  { name: "Richard Mille", slug: "richard-mille", imageIndex: 20, models: ["RM 011", "RM 035", "RM 055", "RM 07-01"] },
  { name: "Seiko", slug: "seiko", imageIndex: 21, models: ["Prospex", "Presage", "Astron", "King Seiko", "5 Sports"] },
  { name: "Tag Heuer", slug: "tag-heuer", imageIndex: 22, models: ["Carrera", "Monaco", "Aquaracer", "Formula 1"] },
  { name: "Tudor", slug: "tudor", imageIndex: 23, models: ["Black Bay", "Pelagos", "Ranger", "Royal"] },
  { name: "Vacheron Constantin", slug: "vacheron-constantin", imageIndex: 24, models: ["Overseas", "Patrimony", "Traditionnelle", "Historiques"] },
];

export function getCatalogBrand(slug: string) {
  return CATALOG_BRANDS.find(brand => brand.slug === slug);
}
