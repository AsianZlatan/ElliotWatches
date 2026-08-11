"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { inventory, publicAsset, type InventoryItem as Item } from "../inventory-data";
import { BRAND_OPTIONS, FACTORY_OPTIONS } from "../inventory-metadata";
type IconName =
  | "search"
  | "arrow"
  | "box"
  | "check"
  | "alert"
  | "bookmark"
  | "sparkle"
  | "filter"
  | "grid"
  | "list"
  | "clock"
  | "shield"
  | "tag"
  | "globe"
  | "close";

const ALL_BRANDS = "Все бренды";
const ALL_FACTORIES = "Все фабрики";
const PAGE_SIZE = 10;
const tones = ["#263d4a", "#7a6754", "#2f4639", "#675a4e", "#33444f"];

function Icon({ name }: { name: IconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
      {name === "search" && <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>}
      {name === "arrow" && <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>}
      {name === "box" && <><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></>}
      {name === "check" && <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16.5 8" /></>}
      {name === "alert" && <><path d="M12 3 2.8 20h18.4L12 3Z" /><path d="M12 9v4.5M12 17h.01" /></>}
      {name === "bookmark" && <path d="M7 3h10v18l-5-3.5L7 21V3Z" />}
      {name === "sparkle" && <><path d="M12 2c.7 5.2 2.8 7.3 8 8-5.2.7-7.3 2.8-8 8-.7-5.2-2.8-7.3-8-8 5.2-.7 7.3-2.8 8-8Z" /><path d="M19 16v5M16.5 18.5h5" /></>}
      {name === "filter" && <><path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z" /></>}
      {name === "grid" && <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>}
      {name === "list" && <><path d="M9 6h12M9 12h12M9 18h12" /><path d="M4 6h.01M4 12h.01M4 18h.01" /></>}
      {name === "clock" && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>}
      {name === "shield" && <><path d="M12 2.5 20 6v5.5c0 5-3.2 8.2-8 10-4.8-1.8-8-5-8-10V6l8-3.5Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>}
      {name === "tag" && <><path d="m3 12 9 9 9-9-9-9H3v9Z" /><circle cx="8" cy="8" r="1" /></>}
      {name === "globe" && <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>}
      {name === "close" && <><path d="m5 5 14 14M19 5 5 19" /></>}
    </svg>
  );
}

function WatchPlaceholder({ item, large = false }: { item?: Item; large?: boolean }) {
  const tone = item ? tones[Number(item.inventory_id) % tones.length] : tones[0];
  return (
    <div className={`watch-placeholder${large ? " watch-placeholder--large" : ""}`} style={{ "--watch-tone": tone } as CSSProperties} aria-hidden="true">
      <span className="watch-strap watch-strap--top" />
      <span className="watch-case">
        <span className="watch-dial"><i className="watch-hand watch-hand--hour" /><i className="watch-hand watch-hand--minute" /><b>EW</b><small>PRIVATE</small></span>
      </span>
      <span className="watch-strap watch-strap--bottom" />
      {item && <span className="watch-reference">{item.sn}</span>}
    </div>
  );
}

function statusClass(item: Item) {
  return (item.available_units ?? 0) > 0 ? "in" : "low";
}

function statusText(item: Item) {
  return (item.available_units ?? 0) > 0 ? "В коллекции" : "Вне коллекции";
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState(ALL_BRANDS);
  const [factory, setFactory] = useState(ALL_FACTORIES);
  const [stockOnly, setStockOnly] = useState(false);
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Item | null>(null);

  const units = useMemo(() => inventory.reduce((sum, item) => sum + (item.available_units || 0), 0), []);

  const brandBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    inventory.forEach(item => counts.set(item.brand, (counts.get(item.brand) ?? 0) + 1));
    return Array.from(counts, ([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 5);
  }, []);

  const factoryBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    inventory.forEach(item => {
      const label = item.factory || "Другие";
      counts.set(label, (counts.get(label) ?? 0) + 1);
    });
    return Array.from(counts, ([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 5);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    const result = inventory.filter(item =>
      (!normalized || `${item.item_name} ${item.sn} ${item.brand} ${item.factory}`.toLowerCase().includes(normalized)) &&
      (brand === ALL_BRANDS || item.brand === brand) &&
      (factory === ALL_FACTORIES || item.factory === factory) &&
      (!stockOnly || item.stock_status === "IN STOCK")
    );
    return [...result].sort((a, b) => {
      if (sort === "sku") return a.sn.localeCompare(b.sn);
      if (sort === "brand") return a.brand.localeCompare(b.brand) || a.sn.localeCompare(b.sn);
      if (sort === "stock") return (b.available_units ?? 0) - (a.available_units ?? 0);
      return Number(b.inventory_id) - Number(a.inventory_id);
    });
  }, [query, brand, factory, stockOnly, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageNumbers = Array.from({ length: Math.min(5, pageCount) }, (_, index) => {
    const start = Math.min(Math.max(currentPage - 2, 1), Math.max(pageCount - 4, 1));
    return start + index;
  });

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  function updateFilters(update: () => void) {
    update();
    setPage(1);
  }

  function resetFilters() {
    setQuery("");
    setBrand(ALL_BRANDS);
    setFactory(ALL_FACTORIES);
    setStockOnly(false);
    setSort("newest");
    setPage(1);
  }

  return (
    <main id="top">
      <SiteHeader active="in-stock" />

      <section className="hero-section">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="section-label">Elliot Watches · личный архив</span>
            <h1>Текущая<br />коллекция.</h1>
            <p>{inventory.length} карточек собранных часов: артикулы, бренды, фабрики и количество в спокойном интерфейсе личного каталога.</p>
            <div className="hero-buttons">
              <a className="button button--primary" href="#inventory">Смотреть коллекцию <Icon name="arrow" /></a>
              <Link className="button button--ghost" href="/#brands">Каталог брендов</Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-glow" />
            <div className="hero-watch-card"><WatchPlaceholder large /></div>
            <div className="hero-stamp"><Image src={publicAsset("/favicon.svg")} alt="" width={62} height={62} unoptimized /></div>
            <div className="hero-sync"><span>Личный архив</span><strong>{units}</strong><small>экземпляров в коллекции</small></div>
          </div>
        </div>
      </section>

      <section className="inventory-section shell" id="inventory">
        <div className="workspace-grid">
          <div className="inventory-main">
            <div className="filter-panel">
              <label className="search-field"><Icon name="search" /><input value={query} onChange={event => updateFilters(() => setQuery(event.target.value))} placeholder="Поиск по артикулу, бренду или фабрике…" aria-label="Поиск по коллекции" /></label>
              <label className="select-field"><span>Бренд</span><select value={brand} onChange={event => updateFilters(() => setBrand(event.target.value))}><option>{ALL_BRANDS}</option>{BRAND_OPTIONS.map(option => <option key={option}>{option}</option>)}</select></label>
              <label className="select-field"><span>Фабрика</span><select value={factory} onChange={event => updateFilters(() => setFactory(event.target.value))}><option>{ALL_FACTORIES}</option>{FACTORY_OPTIONS.map(option => <option key={option}>{option}</option>)}</select></label>
              <label className="select-field"><span>Сортировка</span><select value={sort} onChange={event => updateFilters(() => setSort(event.target.value))}><option value="newest">Сначала новые</option><option value="stock">По количеству</option><option value="sku">По артикулу</option><option value="brand">По бренду</option></select></label>
              <button className={`filter-toggle${stockOnly ? " active" : ""}`} onClick={() => updateFilters(() => setStockOnly(value => !value))} aria-pressed={stockOnly}><Icon name="filter" /> С количеством</button>
            </div>

            <div className="inventory-toolbar">
              <div><span className="watch-count-icon"><Icon name="clock" /></span><strong>{filtered.length}</strong><small>позиций найдено</small></div>
              <div className="view-switch" aria-label="Вид каталога"><button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="Сетка"><Icon name="grid" /><span>Сетка</span></button><button className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="Список"><Icon name="list" /><span>Список</span></button></div>
            </div>

            {visibleItems.length ? (
              <div className={`product-grid${view === "list" ? " product-grid--list" : ""}`}>
                {visibleItems.map(item => (
                  <article className="inventory-card" key={item.sn}>
                    <button className="product-visual" onClick={() => setSelected(item)} aria-label={`Открыть карточку ${item.sn}`}><WatchPlaceholder item={item} /></button>
                    <div className="product-info">
                      <div className="product-title"><h3>{item.sn}</h3><span aria-hidden="true">♡</span></div>
                      <dl><div><dt>Бренд</dt><dd>{item.brand}</dd></div><div><dt>Фабрика</dt><dd>{item.factory || "—"}</dd></div><div><dt>ID карточки</dt><dd>{item.inventory_id}</dd></div></dl>
                      <div className="product-status"><span className={statusClass(item)}><i /> {statusText(item)}</span><small>Количество: {item.available_units ?? 0}</small></div>
                      <button className="open-card" onClick={() => setSelected(item)}><span>{item.available_units ?? 0} ед.</span><Icon name="arrow" /></button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state"><Icon name="search" /><h3>Позиции не найдены</h3><p>Измените запрос или сбросьте выбранные фильтры.</p><button className="button button--primary" onClick={resetFilters}>Сбросить фильтры</button></div>
            )}

            {filtered.length > PAGE_SIZE && <nav className="pagination" aria-label="Страницы каталога"><button disabled={currentPage === 1} onClick={() => setPage(value => Math.max(1, value - 1))} aria-label="Предыдущая страница">‹</button>{pageNumbers.map(number => <button key={number} className={number === currentPage ? "active" : ""} onClick={() => setPage(number)}>{number}</button>)}{pageCount > 5 && pageNumbers.at(-1)! < pageCount && <span>…</span>}<button disabled={currentPage === pageCount} onClick={() => setPage(value => Math.min(pageCount, value + 1))} aria-label="Следующая страница">›</button></nav>}
          </div>

          <aside className="inventory-sidebar">
            <section className="insights-panel" id="insights">
              <header><h2>Структура коллекции</h2><span>{inventory.length} карточек</span></header>
              <div className="insight-columns">
                <div><h3>По брендам</h3>{brandBreakdown.map(row => <div className="bar-row" key={row.label}><span>{row.label}</span><i><b style={{ width: `${(row.value / brandBreakdown[0].value) * 100}%` }} /></i><em>{row.value}</em></div>)}</div>
                <div><h3>По фабрикам</h3>{factoryBreakdown.map(row => <div className="bar-row" key={row.label}><span>{row.label}</span><i><b style={{ width: `${(row.value / factoryBreakdown[0].value) * 100}%` }} /></i><em>{row.value}</em></div>)}</div>
              </div>
            </section>

            <section className="secure-note"><Icon name="shield" /><div><strong>Личный каталог</strong><span>Нейтральные карточки без коммерческого статуса и автоматических обновлений.</span></div></section>
          </aside>
        </div>
      </section>

      <section className="trust-strip shell" id="about">
        <article><span><Icon name="shield" /></span><div><strong>Личная подборка</strong><small>Только карточки текущей коллекции</small></div></article>
        <article><span><Icon name="tag" /></span><div><strong>Понятные данные</strong><small>Артикулы, бренды и фабрики</small></div></article>
        <article><span><Icon name="globe" /></span><div><strong>Единый каталог</strong><small>Бренды и модели в одном месте</small></div></article>
      </section>

      <SiteFooter positions={inventory.length} units={units} />

      {selected && (
        <div className="detail-backdrop" onMouseDown={() => setSelected(null)} role="presentation">
          <section className="detail-modal" onMouseDown={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <button className="detail-close" onClick={() => setSelected(null)} aria-label="Закрыть карточку"><Icon name="close" /></button>
            <div className="detail-breadcrumbs">Коллекция <span>›</span> {selected.brand} <span>›</span> {selected.sn}</div>
            <div className="detail-layout">
              <div className="detail-gallery"><div className="detail-thumb active"><WatchPlaceholder item={selected} /></div><div className="detail-thumb"><span>EW</span></div><div className="detail-image"><WatchPlaceholder item={selected} large /><button aria-label="Увеличение недоступно"><Icon name="search" /></button></div></div>
              <div className="detail-copy">
                <span className="kicker">Карточка личной коллекции</span>
                <h2 id="detail-title">{selected.sn}</h2>
                <p className="detail-subtitle">{selected.brand} · {selected.factory || "Фабрика не указана"}</p>
                <div className="detail-summary"><div><small>Количество в коллекции</small><strong>{selected.available_units ?? 0} ед.</strong><span className={statusClass(selected)}><i /> {statusText(selected)}</span></div><span className="record-id">ID {selected.inventory_id}</span></div>
                <dl className="detail-facts"><div><dt>Артикул</dt><dd>{selected.sn}</dd></div><div><dt>Бренд</dt><dd>{selected.brand}</dd></div><div><dt>Фабрика</dt><dd>{selected.factory || "—"}</dd></div><div><dt>Статус</dt><dd>{selected.stock_status === "IN STOCK" ? "В коллекции" : "Вне коллекции"}</dd></div><div><dt>Количество</dt><dd>{selected.available_units ?? 0} единиц</dd></div></dl>
                <button className="button button--dark" onClick={() => setSelected(null)}>Вернуться к коллекции</button>
                <div className="detail-assurances"><span><Icon name="shield" /> Личная запись</span><span><Icon name="tag" /> Нейтральное отображение</span><span><Icon name="box" /> Каталог коллекции</span></div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
