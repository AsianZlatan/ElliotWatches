import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATALOG_BRANDS, getCatalogBrand } from "../../catalog-data";
import { BrandWatchImage } from "../../components/brand-watch-image";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { inventory, inventoryUnits } from "../../inventory-data";

type BrandRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG_BRANDS.map(brand => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: BrandRouteProps): Promise<Metadata> {
  const brand = getCatalogBrand((await params).slug);
  return brand
    ? { title: brand.name, description: `Модели ${brand.name} и актуальные складские позиции Elliot Watches.` }
    : {};
}

export default async function BrandPage({ params }: BrandRouteProps) {
  const brand = getCatalogBrand((await params).slug);
  if (!brand) notFound();

  const stockItems = inventory
    .filter(item => item.brand === brand.name)
    .sort((a, b) => a.sn.localeCompare(b.sn));
  const units = stockItems.reduce((sum, item) => sum + (item.available_units || 0), 0);

  return (
    <main id="top">
      <SiteHeader active="brands" />

      <section className="brand-page-hero">
        <div className="shell brand-page-hero-grid">
          <div className="brand-page-copy">
            <nav className="catalog-breadcrumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>›</span><Link href="/#brands">Бренды</Link><span>›</span><b>{brand.name}</b></nav>
            <span className="section-label">Каталог бренда</span>
            <h1>{brand.name}</h1>
            <p>{brand.models.length} модельных линий{stockItems.length ? ` · ${stockItems.length} позиций и ${units} единиц в наличии` : " · складские позиции временно отсутствуют"}</p>
            <div className="hero-buttons"><Link className="button button--primary" href="/in-stock/">Смотреть «В наличии»</Link><Link className="button button--ghost" href="/#brands">Все бренды</Link></div>
          </div>
          <div className="brand-page-watch"><BrandWatchImage index={brand.imageIndex} label={brand.name} /></div>
        </div>
      </section>

      <section className="brand-models shell">
        <div className="model-toolbar"><div><span className="section-label">Каталог</span><h2>Модельные линии</h2></div><Link href="/in-stock/">Весь складской реестр <span aria-hidden="true">→</span></Link></div>

        <div className="brand-model-grid brand-collection-grid">
          {brand.models.map((model, index) => (
            <article className="brand-model-card brand-collection-card" key={model}>
              <div className="brand-model-image"><BrandWatchImage index={(brand.imageIndex + index * 6) % 25} label={`${brand.name} ${model}`} /><span>Коллекция</span></div>
              <div className="brand-model-copy"><span className="model-brand">{brand.name}</span><h3>{model}</h3><p>Модели коллекции {model}</p><Link href="/in-stock/">Проверить наличие <span aria-hidden="true">→</span></Link></div>
            </article>
          ))}
        </div>

        <div className="stock-section-heading"><div><span className="section-label">Склад</span><h2>В наличии</h2></div><span>{stockItems.length ? `${stockItems.length} позиций · ${units} единиц` : "Нет доступных позиций"}</span></div>

        {stockItems.length ? (
          <div className="brand-model-grid stock-model-grid">
            {stockItems.map((item, index) => (
              <article className="brand-model-card" key={item.sn}>
                <div className="brand-model-image"><BrandWatchImage index={(brand.imageIndex + index * 7) % 25} label={`${brand.name} ${item.sn}`} /><span>{item.available_units ?? 0} ед.</span></div>
                <div className="brand-model-copy">
                  <span className="model-brand">{brand.name}</span>
                  <h3>{item.sn}</h3>
                  <dl><div><dt>Фабрика</dt><dd>{item.factory || "—"}</dd></div><div><dt>ID записи</dt><dd>{item.inventory_id}</dd></div><div><dt>Статус</dt><dd className={(item.available_units ?? 0) <= 2 ? "low" : "in"}>{(item.available_units ?? 0) <= 2 ? "Малый остаток" : "В наличии"}</dd></div></dl>
                  <Link href="/in-stock/#inventory">Открыть в реестре <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="brand-stock-empty"><span>В текущей складской выгрузке нет доступных позиций {brand.name}.</span><Link href="/in-stock/">Открыть весь реестр <span aria-hidden="true">→</span></Link></div>
        )}
      </section>

      <SiteFooter positions={inventory.length} units={inventoryUnits} />
    </main>
  );
}
