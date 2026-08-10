import Link from "next/link";
import { BrandWatchImage } from "./components/brand-watch-image";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import { CATALOG_BRANDS } from "./catalog-data";
import { inventory, inventoryUnits } from "./inventory-data";

export default function Home() {
  const counts = new Map<string, number>();
  inventory.forEach(item => counts.set(item.brand, (counts.get(item.brand) ?? 0) + 1));

  return (
    <main id="top">
      <SiteHeader active="home" />

      <section className="catalog-hero">
        <div className="shell catalog-hero-grid">
          <div className="catalog-hero-copy">
            <span className="section-label">Elliot Watches · каталог</span>
            <h1>Найдите часы<br />по бренду.</h1>
            <p>Выберите марку, чтобы открыть её страницу со списком моделей и актуальными складскими позициями.</p>
            <div className="hero-buttons">
              <a className="button button--primary" href="#brands">Смотреть бренды <span aria-hidden="true">→</span></a>
              <Link className="button button--ghost" href="/in-stock/">В наличии</Link>
            </div>
            <div className="catalog-metrics" aria-label="Сводка каталога">
              <span><strong>{CATALOG_BRANDS.length}</strong><small>брендов</small></span>
              <span><strong>{inventory.length}</strong><small>складских позиций</small></span>
              <span><strong>{inventoryUnits}</strong><small>единиц на учёте</small></span>
            </div>
          </div>
          <div className="catalog-hero-images" aria-hidden="true">
            <div className="catalog-hero-tile catalog-hero-tile--main"><BrandWatchImage index={19} label="каталога" /></div>
            <div className="catalog-hero-tile catalog-hero-tile--top"><BrandWatchImage index={6} label="каталога" /></div>
            <div className="catalog-hero-tile catalog-hero-tile--bottom"><BrandWatchImage index={12} label="каталога" /></div>
          </div>
        </div>
      </section>

      <section className="brand-directory shell" id="brands">
        <div className="directory-heading">
          <div><span className="section-label">Каталог</span><h2>Бренды часов</h2></div>
          <p>Нажмите на карточку, чтобы перейти к моделям выбранного бренда.</p>
        </div>

        <div className="brand-grid">
          {CATALOG_BRANDS.map(brand => {
            const count = counts.get(brand.name) ?? 0;
            return (
              <Link className="brand-card" href={`/brands/${brand.slug}/`} key={brand.slug}>
                <span className="brand-card-visual"><BrandWatchImage index={brand.imageIndex} label={brand.name} /><i>Открыть каталог</i></span>
                <span className="brand-card-copy"><strong>{brand.name}</strong><small>{brand.models.length} модельных линий{count ? ` · ${count} в наличии` : ""}</small></span>
                <span className="brand-card-arrow" aria-hidden="true">↗</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="catalog-callout shell">
        <div><span className="section-label">Складской реестр</span><h2>Нужны только доступные позиции?</h2><p>Откройте вкладку «В наличии» — там доступны поиск, фильтры по бренду и фабрике, остатки и карточки учёта.</p></div>
        <Link className="button button--dark" href="/in-stock/">Перейти в реестр <span aria-hidden="true">→</span></Link>
      </section>

      <SiteFooter positions={inventory.length} units={inventoryUnits} />
    </main>
  );
}
