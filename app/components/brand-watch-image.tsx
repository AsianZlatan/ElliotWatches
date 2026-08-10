import type { CSSProperties } from "react";
import { publicAsset } from "../inventory-data";

export function BrandWatchImage({ index, label }: { index: number; label: string }) {
  const column = index % 5;
  const row = Math.floor(index / 5);
  const style = {
    backgroundImage: `url("${publicAsset("/brand-watch-sprite.webp")}")`,
    backgroundPosition: `${column * 25}% ${row * 25}%`,
  } as CSSProperties;

  return <span className="brand-watch-image" style={style} role="img" aria-label={`Наручные часы ${label}`} />;
}
