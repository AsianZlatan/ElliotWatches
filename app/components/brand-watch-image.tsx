import Image from "next/image";
import { publicAsset } from "../inventory-data";

export function BrandWatchImage({ src, label }: { src: string; label: string }) {
  return (
    <span className="brand-watch-image">
      <Image
        src={publicAsset(src)}
        alt={`Знаковая модель ${label}`}
        fill
        sizes="(max-width: 620px) 92vw, (max-width: 1020px) 45vw, 24vw"
        unoptimized
      />
    </span>
  );
}
