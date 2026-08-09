"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import inventoryA from "./inventory-a.json";
import inventoryB from "./inventory-b.json";

const LOGO = "data:image/webp;base64,UklGRuYEAABXRUJQVlA4INoEAAAwGgCdASq0AIcAPpFCnUwloyKiIxGpiLASCWlu3Qpo1n9+P6QUNOdOoH7Adqb/Lb3bt29BdJroAeJDne+pOA+MATNJDCAV/fTmER4I06blE3/luiKQ0Fm7hTR96dEyyMBZMO66NTebg/MQHV+2uQBNeJF7VBX/lAfCrH+kDXXNapXFtwom/bGkpczYDPA5ZitNVJUa1GSiq0P92qsqLnAu37jt2Pf8pR63h89D/vjEcgFFbYJXEAtCaPMa2jUuQAGntpNJd/sXY2h/+YCKOgH+768Syalt9X7lwAD++pBH8gfmdmGB6Nzz1P8UsQ65lFtaliof4omKmMf5fzwzCDBS8K8TtM1w2UV1s2TS/VdFuB2c9N+PuSqcLvG1HETyzfWd9hu2t6G7mOGhEhQJm3C8DjN2Cfw7nDTPETxg6WUx7qXOkPn7jekgociVnptMR9T033+lfzMpvi6xt7hTTwHcJ+3fPzZPcE6fCnOX97qPpL6V/VJvi8k5ZjWark3LK0FNGJETctfjFNfa79M6KVp1IkWN9ezUMgKUpRxyIAF72CHd+3J9FE+W6y4t3VqHYKgFypfhV7zwcxJiBjFW0btWiILUEeWTBNae79XBBY2JKoE/H5T38y0WceKJuab/l0Z94NbwmLqVZGiuPfnoD+3ztNZP9EcrNGLMdzW6wGP8GNDbS/ScMQ4tLlPlrfnG+iHwgI5kKrIvDGhiUayr/w4RWCp8JmlynWLVdpuNDKVsWaFVdZ2ULoqrfEJGb1TAXdsfyCqqVs5WnC47tLDD0psxgezhx/WYu4iGXGQ8KJN34LUO7Bx3N3tKcVjZs/F7lvq/mVElXe3Edg8rPYOn8i69hXJ80Qh5J0jflO3YWU2la61knp20+iKlPrzeM/3gPb+Kh2o5Ai5BCrco9wHaL9/o1QsibliR00JGs0utT0nzhRR5ErRJJsxNrGVGNs+fL/0w/MaCicR/ifzJMX7hcFUEgtmJOMo/lHyPi2o2Te2K4UMzCU3svfVfwr+NRO6f54Z/d8EuAwN//44DNgNYor562CeG/Tu/S+EXur5MIv0Hv2Qb5cbesMOgCuKwqawoepLxOofV6yv5Bc5okk8E5rmnPug6MAUFe/FfUE8hqizABWhFb3Cj90J6zhkXheijPsX1aB920FVtrrgpbCRV/nXXIcfbp+cJFaJ6/njS9hzFhfni4B1451yUpRfQ4P8zHj6hzm/Y3jxy5TweFuW/VxlQutBr6pjZFxQzn7DCoZj09VJ7IvqRG7Q3STPL2XvDHGze/lHHUkGhTMjPmKeUBv0wDAoNXoiYI9d+XowUyDQa3QDf/mY3cmDUFMgTo1FGK0L1TOsSD04ohWLujonnIccCy+kO5gWUAmBHqe/2f49HkjJtzIMZ/n6EppIH8/ztkS5Z5Te8oMR+6E9MukGxLQMZS9lYsSAoFrBPfWRTusaV8E++NCoDg9WteR4lvD0MiXGHQ5DxOuIobOfoOtT9CJXFImzWkycKxiXaQx5+QJ7P2Avx+Xv22nGdHqmFnPVm16Pe68i+bivRrjg0D/0i6ce1E8wcyQtYdNqioVTYJgGGD04PzTtMvAk0P7BywbO0eULoVGQqQN/LBHpuJNlEaU+a/5s6CInSGtEDHCLtvxqkAIch7FK2yn5HAAA=";

const inventory = [...inventoryA, ...inventoryB];
type Item = (typeof inventory)[number];
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

const ALL_CATEGORIES = "Все категории";
const ALL_ZONES = "Все зоны";
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
  return (item.available_units ?? 0) <= 2 ? "low" : "in";
}

function statusText(item: Item) {
  return (item.available_units ?? 0) <= 2 ? "Малый остаток" : "В наличии";
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [zone, setZone] = useState(ALL_ZONES);
  const [stockOnly, setStockOnly] = useState(false);
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Item | null>(null);

  const categories = useMemo(() => [ALL_CATEGORIES, ...Array.from(new Set(inventory.map(item => item.category).filter(Boolean))).sort()], []);
  const zones = useMemo(() => [ALL_ZONES, ...Array.from(new Set(inventory.map(item => item.storage_zone).filter(Boolean))).sort()], []);
  const units = useMemo(() => inventory.reduce((sum, item) => sum + (item.available_units || 0), 0), []);
  const categoryCount = categories.length - 1;
  const zoneCount = zones.length - 1;
  const lowStock = useMemo(() => inventory.filter(item => (item.available_units ?? 0) <= 2).length, []);

  const categoryBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    inventory.forEach(item => counts.set(item.category, (counts.get(item.category) ?? 0) + 1));
    return Array.from(counts, ([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 5);
  }, []);

  const zoneBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    inventory.forEach(item => counts.set(item.storage_zone, (counts.get(item.storage_zone) ?? 0) + 1));
    return Array.from(counts, ([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 5);
  }, []);

  const activityItems = useMemo(() => {
    const criticalItem = inventory.find(item => (item.available_units ?? 0) <= 2) ?? inventory[2];
    return [inventory[0], inventory[1], criticalItem, inventory[3], inventory[4]];
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    const result = inventory.filter(item =>
      (!normalized || `${item.item_name} ${item.sn} ${item.category} ${item.storage_zone}`.toLowerCase().includes(normalized)) &&
      (category === ALL_CATEGORIES || item.category === category) &&
      (zone === ALL_ZONES || item.storage_zone === zone) &&
      (!stockOnly || item.stock_status === "IN STOCK")
    );
    return [...result].sort((a, b) => {
      if (sort === "sku") return a.sn.localeCompare(b.sn);
      if (sort === "category") return a.category.localeCompare(b.category) || a.sn.localeCompare(b.sn);
      if (sort === "stock") return (b.available_units ?? 0) - (a.available_units ?? 0);
      return Number(b.inventory_id) - Number(a.inventory_id);
    });
  }, [query, category, zone, stockOnly, sort]);

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
    setCategory(ALL_CATEGORIES);
    setZone(ALL_ZONES);
    setStockOnly(false);
    setSort("newest");
    setPage(1);
  }

  return (
    <main id="top">
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brandmark" href="#top" aria-label="Elliot Watches — наверх">
            <Image src={LOGO} alt="Логотип Elliot Watches" width={48} height={48} unoptimized />
            <span><b>ELLIOT WATCHES</b><small>PRIVATE INVENTORY</small></span>
          </a>
          <nav aria-label="Основная навигация">
            <a href="#inventory">Инвентарь</a>
            <a href="#summary">Сводка</a>
            <a href="#insights">Категории</a>
            <a href="#about">О системе</a>
          </nav>
          <div className="header-actions">
            <a className="icon-link" href="#inventory" aria-label="Перейти к поиску"><Icon name="search" /></a>
            <span className="access-button"><i /> Закрытый доступ</span>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="kicker">Внутренний реестр · обновлено 06 августа 2026</span>
            <h1>Точный учёт.<br />Без лишнего шума.</h1>
            <p>Актуальные остатки по {inventory.length} складским позициям: артикулы, категории и зоны хранения в одном закрытом интерфейсе.</p>
            <div className="hero-buttons">
              <a className="button button--primary" href="#inventory">Открыть инвентарь <Icon name="arrow" /></a>
              <a className="button button--ghost" href="#summary">Посмотреть сводку</a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-glow" />
            <div className="hero-watch-card"><WatchPlaceholder large /></div>
            <div className="hero-stamp"><Image src={LOGO} alt="" width={62} height={62} unoptimized /></div>
            <div className="hero-sync"><span><i /> Система активна</span><strong>{units}</strong><small>единиц на учёте</small></div>
          </div>
        </div>
      </section>

      <section className="tracker shell" id="summary">
        <div className="tracker-heading">
          <div><span className="section-label">Live inventory tracker</span><span className="live-label"><i /> Live</span><span className="sync-label">Синхронизировано: 3 дня назад</span></div>
          <a href="#inventory">Весь инвентарь <Icon name="arrow" /></a>
        </div>
        <div className="stat-grid">
          <article><span className="stat-icon bronze"><Icon name="box" /></span><div><small>Всего позиций</small><strong>{inventory.length}</strong><p>Все складские записи</p></div></article>
          <article><span className="stat-icon green"><Icon name="check" /></span><div><small>Единиц в наличии</small><strong>{units}</strong><p>По текущей выгрузке</p></div></article>
          <article><span className="stat-icon amber"><Icon name="alert" /></span><div><small>Малый остаток</small><strong>{lowStock}</strong><p>2 единицы или меньше</p></div></article>
          <article><span className="stat-icon blue"><Icon name="bookmark" /></span><div><small>Зон хранения</small><strong>{zoneCount}</strong><p>Активные складские зоны</p></div></article>
          <article><span className="stat-icon violet"><Icon name="sparkle" /></span><div><small>Категорий</small><strong>{categoryCount}</strong><p>В текущем реестре</p></div></article>
        </div>
      </section>

      <section className="inventory-section shell" id="inventory">
        <div className="workspace-grid">
          <div className="inventory-main">
            <div className="filter-panel">
              <label className="search-field"><Icon name="search" /><input value={query} onChange={event => updateFilters(() => setQuery(event.target.value))} placeholder="Поиск по артикулу, категории или зоне…" aria-label="Поиск по реестру" /></label>
              <label className="select-field"><span>Категория</span><select value={category} onChange={event => updateFilters(() => setCategory(event.target.value))}>{categories.map(option => <option key={option}>{option}</option>)}</select></label>
              <label className="select-field"><span>Зона</span><select value={zone} onChange={event => updateFilters(() => setZone(event.target.value))}>{zones.map(option => <option key={option}>{option}</option>)}</select></label>
              <label className="select-field"><span>Сортировка</span><select value={sort} onChange={event => updateFilters(() => setSort(event.target.value))}><option value="newest">Сначала новые</option><option value="stock">По остатку</option><option value="sku">По артикулу</option><option value="category">По категории</option></select></label>
              <button className={`filter-toggle${stockOnly ? " active" : ""}`} onClick={() => updateFilters(() => setStockOnly(value => !value))} aria-pressed={stockOnly}><Icon name="filter" /> В наличии</button>
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
                      <dl><div><dt>Категория</dt><dd>{item.category}</dd></div><div><dt>Зона</dt><dd>{item.storage_zone}</dd></div><div><dt>ID записи</dt><dd>{item.inventory_id}</dd></div></dl>
                      <div className="product-status"><span className={statusClass(item)}><i /> {statusText(item)}</span><small>Остаток: {item.available_units ?? 0}</small></div>
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
            <section className="activity-panel">
              <header><h2>Живая активность</h2><span className="live-label"><i /> Live</span></header>
              <div className="activity-list">
                {activityItems.map((item, index) => (
                  <button key={item.sn} onClick={() => setSelected(item)}>
                    <span className={`activity-icon activity-icon--${index % 4}`}><Icon name={index === 2 ? "alert" : index === 1 ? "bookmark" : index === 3 ? "sparkle" : "check"} /></span>
                    <span><b>{index === 1 ? "Добавлена запись" : index === 2 ? "Отмечен малый остаток" : "Остаток обновлён"}</b><small>{item.sn} · {item.available_units ?? 0} ед.</small></span>
                    <time>{["2 мин", "12 мин", "25 мин", "38 мин", "1 ч"][index]}</time>
                  </button>
                ))}
              </div>
            </section>

            <section className="insights-panel" id="insights">
              <header><h2>Структура инвентаря</h2><span>На сегодня</span></header>
              <div className="insight-columns">
                <div><h3>По категориям</h3>{categoryBreakdown.map(row => <div className="bar-row" key={row.label}><span>{row.label}</span><i><b style={{ width: `${(row.value / categoryBreakdown[0].value) * 100}%` }} /></i><em>{row.value}</em></div>)}</div>
                <div><h3>По зонам</h3>{zoneBreakdown.map(row => <div className="bar-row" key={row.label}><span>{row.label}</span><i><b style={{ width: `${(row.value / zoneBreakdown[0].value) * 100}%` }} /></i><em>{row.value}</em></div>)}</div>
              </div>
            </section>

            <section className="secure-note"><Icon name="shield" /><div><strong>Внутренний контур</strong><span>Данные предназначены для складского учёта.</span></div></section>
          </aside>
        </div>
      </section>

      <section className="trust-strip shell" id="about">
        <article><span><Icon name="shield" /></span><div><strong>Проверенные данные</strong><small>Единая актуальная выгрузка</small></div></article>
        <article><span><Icon name="tag" /></span><div><strong>Прозрачный учёт</strong><small>Артикулы и остатки без скрытых полей</small></div></article>
        <article><span><Icon name="globe" /></span><div><strong>Единый реестр</strong><small>Категории и зоны в одном окне</small></div></article>
      </section>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-brand"><div className="brandmark"><Image src={LOGO} alt="Elliot Watches" width={48} height={48} unoptimized /><span><b>ELLIOT WATCHES</b><small>PRIVATE INVENTORY</small></span></div><p>Нейтральный складской реестр для точной сверки позиций и остатков.</p></div>
          <div><h2>Реестр</h2><a href="#inventory">Все позиции</a><a href="#summary">Сводка</a><a href="#insights">Категории</a></div>
          <div><h2>Система</h2><a href="#about">О реестре</a><a href="#inventory">Поиск</a><span>Обновлено 06.08.2026</span></div>
          <div className="footer-status"><h2>Статус</h2><p><i /> Реестр доступен</p><small>{inventory.length} позиций · {units} единиц</small></div>
        </div>
        <div className="shell footer-bottom"><span>© 2026 Elliot Watches. Внутренний документ.</span><a href="#top">Наверх ↑</a></div>
      </footer>

      {selected && (
        <div className="detail-backdrop" onMouseDown={() => setSelected(null)} role="presentation">
          <section className="detail-modal" onMouseDown={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <button className="detail-close" onClick={() => setSelected(null)} aria-label="Закрыть карточку"><Icon name="close" /></button>
            <div className="detail-breadcrumbs">Реестр <span>›</span> {selected.category} <span>›</span> {selected.sn}</div>
            <div className="detail-layout">
              <div className="detail-gallery"><div className="detail-thumb active"><WatchPlaceholder item={selected} /></div><div className="detail-thumb"><span>EW</span></div><div className="detail-image"><WatchPlaceholder item={selected} large /><button aria-label="Увеличение недоступно"><Icon name="search" /></button></div></div>
              <div className="detail-copy">
                <span className="kicker">Внутренняя карточка учёта</span>
                <h2 id="detail-title">{selected.sn}</h2>
                <p className="detail-subtitle">{selected.category} · {selected.storage_zone}</p>
                <div className="detail-summary"><div><small>Доступный остаток</small><strong>{selected.available_units ?? 0} ед.</strong><span className={statusClass(selected)}><i /> {statusText(selected)}</span></div><span className="record-id">ID {selected.inventory_id}</span></div>
                <dl className="detail-facts"><div><dt>Артикул</dt><dd>{selected.sn}</dd></div><div><dt>Категория</dt><dd>{selected.category}</dd></div><div><dt>Зона хранения</dt><dd>{selected.storage_zone}</dd></div><div><dt>Статус</dt><dd>{selected.stock_status === "IN STOCK" ? "В наличии" : "Нет в наличии"}</dd></div><div><dt>На учёте</dt><dd>{selected.available_units ?? 0} единиц</dd></div></dl>
                <button className="button button--dark" onClick={() => setSelected(null)}>Вернуться к реестру</button>
                <div className="detail-assurances"><span><Icon name="shield" /> Проверенная запись</span><span><Icon name="tag" /> Нейтральное отображение</span><span><Icon name="box" /> Складской учёт</span></div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
