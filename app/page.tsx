import Link from "next/link";
import { BrandWatchImage } from "./components/brand-watch-image";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import { CATALOG_BRANDS, CATALOG_MODEL_LINE_COUNT } from "./catalog-data";
import { inventory, inventoryUnits } from "./inventory-data";

export default function Home() {
  const counts = new Map<string, number>();
  inventory.forEach(item => counts.set(item.brand, (counts.get(item.brand) ?? 0) + 1));

  const heroBrands = [CATALOG_BRANDS[19], CATALOG_BRANDS[6], CATALOG_BRANDS[12]];

  return (
    <main id="top">
      <SiteHeader active="home" />

      <section className="catalog-hero">
        <div className="shell catalog-hero-grid">
          <div className="catalog-hero-copy">
            <span className="section-label">Elliot Watches · личный каталог</span>
            <h1>Коллекция часов.<br />Бренд за брендом.</h1>
            <p>Персональная подборка знаковых часов и справочник актуальных модельных линий ведущих мануфактур.</p>
            <div className="hero-buttons">
              <a className="button button--primary" href="#brands">Исследовать бренды <span aria-hidden="true">→</span></a>
              <Link className="button button--ghost" href="/in-stock/">Текущая коллекция</Link>
            </div>
            <div className="catalog-metrics" aria-label="Сводка коллекции">
              <span><strong>{CATALOG_BRANDS.length}</strong><small>брендов</small></span>
              <span><strong>{CATALOG_MODEL_LINE_COUNT}</strong><small>модельных линий</small></span>
              <span><strong>{inventory.length}</strong><small>карточек коллекции</small></span>
            </div>
          </div>
          <div className="catalog-hero-images" aria-label="Знаковые модели коллекции">
            <div className="catalog-hero-tile catalog-hero-tile--main">
              <BrandWatchImage src={heroBrands[0].image} label={`${heroBrands[0].officialName} ${heroBrands[0].iconicModel}`} />
            </div>
            <div className="catalog-hero-tile catalog-hero-tile--top">
              <BrandWatchImage src={heroBrands[1].image} label={`${heroBrands[1].officialName} ${heroBrands[1].iconicModel}`} />
            </div>
            <div className="catalog-hero-tile catalog-hero-tile--bottom">
              <BrandWatchImage src={heroBrands[2].image} label={`${heroBrands[2].officialName} ${heroBrands[2].iconicModel}`} />
            </div>
          </div>
        </div>
      </section>

      <section className="brand-directory shell" id="brands">
        <div className="directory-heading">
          <div><span className="section-label">Путеводитель по коллекции</span><h2>Бренды и их иконы</h2></div>
          <p>Каждая карточка показывает узнаваемую модель бренда и открывает страницу со всеми актуальными модельными линиями.</p>
        </div>

        <div className="brand-grid">
          {CATALOG_BRANDS.map(brand => {
            const count = counts.get(brand.name) ?? 0;
            return (
              <Link className="brand-card" href={`/brands/${brand.slug}/`} key={brand.slug}>
                <span className="brand-card-visual">
                  <BrandWatchImage src={brand.image} label={`${brand.officialName} ${brand.iconicModel}`} />
                  <i>Знаковая модель</i>
                </span>
                <span className="brand-card-copy">
                  <strong>{brand.name}</strong>
                  <span>{brand.iconicModel}</span>
                  <small>{brand.models.length} модельных линий{count ? ` · ${count} в коллекции` : ""}</small>
                </span>
                <span className="brand-card-arrow" aria-hidden="true">↗</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="catalog-callout shell">
        <div><span className="section-label">Личный архив</span><h2>Посмотреть собранные экземпляры</h2><p>В «Текущей коллекции» собраны артикулы, бренды, фабрики и количество — в спокойном формате персонального каталога.</p></div>
        <Link className="button button--dark" href="/in-stock/">Открыть коллекцию <span aria-hidden="true">→</span></Link>
      </section>

      <SiteFooter positions={inventory.length} units={inventoryUnits} />
    </main>
  );
}
