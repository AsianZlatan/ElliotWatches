export const BRAND_OPTIONS = [
  "0mega",
  "Accessories",
  "Audemars Piguet",
  "Bell Ross",
  "Blancpain",
  "Breitling",
  "BVLGARI",
  "Cartier",
  "Chanel",
  "DIOR",
  "Franck Muller",
  "Glashütte",
  "Grand Seiko",
  "Hublot",
  "IWC",
  "Jaeger LeCoultre",
  "Longines",
  "MB&F",
  "Panerai",
  "Patek Philippe",
  "R0lex",
  "Richard Mille",
  "Seiko",
  "Tag Heuer",
  "Tudor",
  "Vacheron Constantin",
] as const;

export const FACTORY_OPTIONS = [
  "3K",
  "ADG",
  "ARF",
  "BBR",
  "BLS",
  "BP",
  "BTF",
  "C+F",
  "Clean",
  "CVS",
  "DIW",
  "EW",
  "GM",
  "JVS",
  "QF",
  "RA",
  "Tungsten",
  "TW",
  "V7",
  "VS",
  "VS+",
  "Z+",
  "ZF",
  "ZQF",
] as const;

type SourceInventoryItem = {
  sn: string;
  category: string;
};

const brandByCategory: Record<string, string> = {
  "Категория 01": "0mega",
  "Категория 02": "Audemars Piguet",
  "Категория 03": "Cartier",
  "Категория 04": "Breitling",
  "Категория 05": "Cartier",
  "Категория 06": "Panerai",
  "Категория 07": "Patek Philippe",
  "Категория 08": "R0lex",
  "Категория 09": "Tudor",
  "Категория 10": "Vacheron Constantin",
};

const factoryPrefixes: ReadonlyArray<readonly [string, string]> = [
  ["VSPLUS", "VS+"],
  ["ZPLUS", "Z+"],
  ["TUNGSTEN", "Tungsten"],
  ["CPLUS", "C+F"],
  ["CLEAN", "Clean"],
  ["EWEF", "EW"],
  ["JVSF", "JVS"],
  ["3KF", "3K"],
  ["ADG", "ADG"],
  ["ARF", "ARF"],
  ["BBR", "BBR"],
  ["BLS", "BLS"],
  ["BTF", "BTF"],
  ["BPF", "BP"],
  ["CVS", "CVS"],
  ["DIW", "DIW"],
  ["GMF", "GM"],
  ["JVS", "JVS"],
  ["QF", "QF"],
  ["RAF", "RA"],
  ["TWF", "TW"],
  ["V7F", "V7"],
  ["VSF", "VS"],
  ["ZQF", "ZQF"],
  ["ZF", "ZF"],
  ["GOLD", "Tungsten"],
];

export function getBrand(item: SourceInventoryItem) {
  return brandByCategory[item.category] ?? "Accessories";
}

export function getFactory(item: SourceInventoryItem) {
  const sku = item.sn.toUpperCase();

  return factoryPrefixes.find(([prefix]) => sku.startsWith(prefix))?.[1] ?? "";
}
