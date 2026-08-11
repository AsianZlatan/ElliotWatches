import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATALOG_BRANDS, CATALOG_REVIEWED_AT, getCatalogBrand } from "../../catalog-data";
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
    ? { title: brand.name, description: `Знаковая модель и актуальные модельные линии ${brand.officialName} в личном каталоге Elliot Watches.` }
    : {};
}

export default async function BrandPage({ params }: BrandRouteProps) {
  const brand = getCatalogBrand((await params).slug);
  if (!brand) notFound();

  const collectionItems = inventory
    .filter(item => item.brand === brand.name)
    .sort((a, b) => a.sn.localeCompare(b.sn));
  const units = collectionItems.reduce((sum, item) => sum + (item.available_units || 0), 0);

  return (
    <main id="top">
      <SiteHeader active="brands" />

      <section className="brand-page-hero">
        <div className="shell brand-page-hero-grid">
          <div className="brand-page-copy">
            <nav className="catalog-breadcrumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>›</span><Link href="/#brands">Бренды</Link><span>›</span><b>{brand.name}</b></nav>
            <span className="section-label">Персональная коллекция · бренд</span>
            <h1>{brand.name}</h1>
            <p>{brand.models.length} актуальных модельных линий · знаковая модель — {brand.iconicModel}</p>
            <div className="hero-buttons">
              <Link className="button button--primary" href="/in-stock/">Текущая коллекция</Link>
              <a className="button button--ghost" href={brand.officialUrl} target="_blank" rel="noreferrer">Официальный каталог ↗</a>
            </div>
          </div>
          <figure className="brand-page-watch">
            <BrandWatchImage src={brand.image} label={`${brand.officialName} ${brand.iconicModel}`} />
            <figcaption><span>Знаковая модель</span><strong>{brand.iconicModel}</strong></figcaption>
          </figure>
        </div>
      </section>

      <section className="brand-models shell">
        <div className="model-toolbar">
          <div><span className="section-label">Официальный модельный ряд</span><h2>Актуальные линии {brand.officialName}</h2></div>
          <span className="catalog-reviewed">Сверено: {CATALOG_REVIEWED_AT}</span>
        </div>

        <div className="model-line-grid">
          {brand.models.map((model, index) => (
            <article className="model-line-card" key={model}>
              <span className="model-line-number">{String(index + 1).padStart(2, "0")}</span>
              <div><small>{brand.officialName}</small><h3>{model}</h3></div>
              <a href={brand.officialUrl} target="_blank" rel="noreferrer" aria-label={`${model} на официальном сайте ${brand.officialName}`}>↗</a>
            </article>
          ))}
        </div>

        <p className="catalog-source-note">Список отражает текущие модельные линии официального каталога, а не полный исторический архив снятых с производства референсов. Названия и состав коллекций могут меняться у производителя.</p>

        <div className="stock-section-heading">
          <div><span className="section-label">Личный архив</span><h2>Экземпляры в текущей коллекции</h2></div>
          <span>{collectionItems.length ? `${collectionItems.length} карточек · ${units} экземпляров` : "Карточек пока нет"}</span>
        </div>

        {collectionItems.length ? (
          <div className="collection-record-grid">
            {collectionItems.map(item => (
              <article className="collection-record-card" key={item.sn}>
                <div className="collection-record-visual" aria-hidden="true"><span>EW</span><small>{item.sn}</small></div>
                <div className="brand-model-copy">
                  <span className="model-brand">{brand.name}</span>
                  <h3>{item.sn}</h3>
                  <dl><div><dt>Фабрика</dt><dd>{item.factory || "—"}</dd></div><div><dt>ID карточки</dt><dd>{item.inventory_id}</dd></div><div><dt>Количество</dt><dd className="in">{item.available_units ?? 0}</dd></div></dl>
                  <Link href="/in-stock/#inventory">Открыть в коллекции <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="brand-stock-empty"><span>В текущей коллекции пока нет карточек {brand.name}.</span><Link href="/in-stock/">Открыть всю коллекцию <span aria-hidden="true">→</span></Link></div>
        )}
      </section>

      <SiteFooter positions={inventory.length} units={inventoryUnits} />
    </main>
  );
}
