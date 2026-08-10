import inventoryA from "./inventory-a.json";
import inventoryB from "./inventory-b.json";
import { getBrand, getFactory } from "./inventory-metadata";

const sourceInventory = [...inventoryA, ...inventoryB];

export const inventory = sourceInventory.map(item => ({
  ...item,
  brand: getBrand(item),
  factory: getFactory(item),
}));

export type InventoryItem = (typeof inventory)[number];

export const inventoryUnits = inventory.reduce(
  (sum, item) => sum + (item.available_units || 0),
  0,
);

export function publicAsset(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
