"use client";

import { useMemo, useState } from "react";
import inventoryA from "./inventory-a.json";
import inventoryB from "./inventory-b.json";

const LOGO = "data:image/webp;base64,UklGRuYEAABXRUJQVlA4INoEAAAwGgCdASq0AIcAPpFCnUwloyKiIxGpiLASCWlu3Qpo1n9+P6QUNOdOoH7Adqb/Lb3bt29BdJroAeJDne+pOA+MATNJDCAV/fTmER4I06blE3/luiKQ0Fm7hTR96dEyyMBZMO66NTebg/MQHV+2uQBNeJF7VBX/lAfCrH+kDXXNapXFtwom/bGkpczYDPA5ZitNVJUa1GSiq0P92qsqLnAu37jt2Pf8pR63h89D/vjEcgFFbYJXEAtCaPMa2jUuQAGntpNJd/sXY2h/+YCKOgH+768Syalt9X7lwAD++pBH8gfmdmGB6Nzz1P8UsQ65lFtaliof4omKmMf5fzwzCDBS8K8TtM1w2UV1s2TS/VdFuB2c9N+PuSqcLvG1HETyzfWd9hu2t6G7mOGhEhQJm3C8DjN2Cfw7nDTPETxg6WUx7qXOkPn7jekgociVnptMR9T033+lfzMpvi6xt7hTTwHcJ+3fPzZPcE6fCnOX97qPpL6V/VJvi8k5ZjWark3LK0FNGJETctfjFNfa79M6KVp1IkWN9ezUMgKUpRxyIAF72CHd+3J9FE+W6y4t3VqHYKgFypfhV7zwcxJiBjFW0btWiILUEeWTBNae79XBBY2JKoE/H5T38y0WceKJuab/l0Z94NbwmLqVZGiuPfnoD+3ztNZP9EcrNGLMdzW6wGP8GNDbS/ScMQ4tLlPlrfnG+iHwgI5kKrIvDGhiUayr/w4RWCp8JmlynWLVdpuNDKVsWaFVdZ2ULoqrfEJGb1TAXdsfyCqqVs5WnC47tLDD0psxgezhx/WYu4iGXGQ8KJN34LUO7Bx3N3tKcVjZs/F7lvq/mVElXe3Edg8rPYOn8i69hXJ80Qh5J0jflO3YWU2la61knp20+iKlPrzeM/3gPb+Kh2o5Ai5BCrco9wHaL9/o1QsibliR00JGs0utT0nzhRR5ErRJJsxNrGVGNs+fL/0w/MaCicR/ifzJMX7hcFUEgtmJOMo/lHyPi2o2Te2K4UMzCU3svfVfwr+NRO6f54Z/d8EuAwN//44DNgNYor562CeG/Tu/S+EXur5MIv0Hv2Qb5cbesMOgCuKwqawoepLxOofV6yv5Bc5okk8E5rmnPug6MAUFe/FfUE8hqizABWhFb3Cj90J6zhkXheijPsX1aB920FVtrrgpbCRV/nXXIcfbp+cJFaJ6/njS9hzFhfni4B1451yUpRfQ4P8zHj6hzm/Y3jxy5TweFuW/VxlQutBr6pjZFxQzn7DCoZj09VJ7IvqRG7Q3STPL2XvDHGze/lHHUkGhTMjPmKeUBv0wDAoNXoiYI9d+XowUyDQa3QDf/mY3cmDUFMgTo1FGK0L1TOsSD04ohWLujonnIccCy+kO5gWUAmBHqe/2f49HkjJtzIMZ/n6EppIH8/ztkS5Z5Te8oMR+6E9MukGxLQMZS9lYsSAoFrBPfWRTusaV8E++NCoDg9WteR4lvD0MiXGHQ5DxOuIobOfoOtT9CJXFImzWkycKxiXaQx5+QJ7P2Avx+Xv22nGdHqmFnPVm16Pe68i+bivRrjg0D/0i6ce1E8wcyQtYdNqioVTYJgGGD04PzTtMvAk0P7BywbO0eULoVGQqQN/LBHpuJNlEaU+a/5s6CInSGtEDHCLtvxqkAIch7FK2yn5HAAA=";

const inventory = [...inventoryA, ...inventoryB];
type Item = (typeof inventory)[number];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Все категории");
  const [zone, setZone] = useState("Все зоны");
  const [stockOnly, setStockOnly] = useState(false);
  const [visible, setVisible] = useState(24);
  const [selected, setSelected] = useState<Item | null>(null);

  const categories = useMemo(() => ["Все категории", ...Array.from(new Set(inventory.map(x => x.category).filter(Boolean))).sort()], []);
  const zones = useMemo(() => ["Все зоны", ...Array.from(new Set(inventory.map(x => x.storage_zone).filter(Boolean))).sort()], []);
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return inventory.filter(item =>
      (!q || `${item.item_name} ${item.sn} ${item.category} ${item.storage_zone}`.toLowerCase().includes(q)) &&
      (category === "Все категории" || item.category === category) &&
      (zone === "Все зоны" || item.storage_zone === zone) &&
      (!stockOnly || item.stock_status === "IN STOCK")
    );
  }, [query, category, zone, stockOnly]);
  const units = inventory.reduce((sum, x) => sum + (x.available_units || 0), 0);
  const categoryCount = new Set(inventory.map(x => x.category).filter(Boolean)).size;

  function resetFilters() {
    setQuery(""); setCategory("Все категории"); setZone("Все зоны"); setStockOnly(false); setVisible(24);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brandmark" href="#top" aria-label="EW Inventory — наверх">
          <img src={LOGO} alt="EW" />
          <span><b>EW</b><small>внутренний учёт</small></span>
        </a>
        <nav><a href="#registry">Реестр</a><a href="#summary">Сводка</a></nav>
        <span className="privateBadge">Закрытый доступ</span>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <span className="eyebrow">Внутренний документ · обновлено 06 августа 2026</span>
          <h1>Складской<br /><em>реестр EW.</em></h1>
          <p>Закрытая рабочая система учёта: наличие, внутренние артикулы, категории и зоны хранения.</p>
          <a className="primaryBtn" href="#registry">Открыть реестр <span>↓</span></a>
        </div>
        <div className="heroVisual" aria-hidden="true">
          <div className="dial"><span className="twelve">12</span><i className="hand one" /><i className="hand two" /><b>EW</b><small>INTERNAL</small></div>
          <div className="floatCard"><span>Учтено на складе</span><strong>{units.toLocaleString("ru-RU")}</strong><small>единиц</small></div>
        </div>
      </section>

      <section className="stats" id="summary">
        <div><strong>{inventory.length}</strong><span>складских позиций</span></div>
        <div><strong>{units}</strong><span>единиц учтено</span></div>
        <div><strong>{categoryCount}</strong><span>категорий</span></div>
        <div><strong>Внутр.</strong><span>режим доступа</span></div>
      </section>

      <section className="catalog" id="registry">
        <div className="sectionHead"><div><span className="eyebrow">Внутренний учёт</span><h2>Складские позиции</h2></div><p>Найдено <b>{filtered.length}</b> позиций</p></div>
        <div className="filters">
          <label className="search"><span>⌕</span><input value={query} onChange={e => {setQuery(e.target.value);setVisible(24)}} placeholder="Внутренний артикул или категория" /></label>
          <select value={category} onChange={e => {setCategory(e.target.value);setVisible(24)}} aria-label="Категория">{categories.map(x => <option key={x}>{x}</option>)}</select>
          <select value={zone} onChange={e => {setZone(e.target.value);setVisible(24)}} aria-label="Зона хранения">{zones.map(x => <option key={x}>{x}</option>)}</select>
          <label className="toggle"><input type="checkbox" checked={stockOnly} onChange={e => setStockOnly(e.target.checked)} /><span />Только в наличии</label>
        </div>

        {filtered.length ? <div className="grid">{filtered.slice(0, visible).map(item => (
          <article className="card" key={item.sn}>
            <button className="imageWrap" onClick={() => setSelected(item)} aria-label={`Открыть позицию: ${item.sn}`}>
              <span className="neutralPlaceholder" aria-hidden="true"><i /><b>EW</b><small>{item.category}<br />{item.sn}</small></span>
              <span className={item.stock_status === "IN STOCK" ? "badge in" : "badge out"}>{item.stock_status === "IN STOCK" ? `В наличии · ${item.available_units ?? "—"}` : "Нет в наличии"}</span>
            </button>
            <div className="cardBody"><div className="meta"><span>{item.category}</span><span>{item.storage_zone}</span></div><h3>{item.item_name}</h3><div className="cardLine"><p>Артикул: {item.sn}</p><strong>{item.available_units ?? 0} ед.</strong></div><button onClick={() => setSelected(item)}>Карточка учёта <span>→</span></button></div>
          </article>
        ))}</div> : <div className="empty"><b>Ничего не найдено</b><p>Попробуйте изменить запрос или сбросить фильтры.</p><button onClick={resetFilters}>Сбросить фильтры</button></div>}
        {visible < filtered.length && <button className="loadMore" onClick={() => setVisible(v => v + 24)}>Показать ещё <span>{filtered.length - visible}</span></button>}
      </section>

      <footer><div className="brandmark"><img src={LOGO} alt="EW" /><span><b>EW</b><small>внутренний учёт</small></span></div><p>Закрытый складской реестр · Данные обновлены 06.08.2026</p><a href="#top">Наверх ↑</a></footer>

      {selected && <div className="modalBackdrop" onMouseDown={() => setSelected(null)} role="presentation"><section className="modal" onMouseDown={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={selected.item_name}><button className="close" onClick={() => setSelected(null)} aria-label="Закрыть">×</button><div className="modalImage"><span className="neutralPlaceholder large" aria-hidden="true"><i /><b>EW</b><small>{selected.category}<br />{selected.sn}</small></span></div><div className="modalCopy"><span className="eyebrow">Внутренняя карточка учёта</span><h2>{selected.item_name}</h2><p className="fullName">Служебная информация для сверки складских остатков.</p><dl><div><dt>Артикул</dt><dd>{selected.sn}</dd></div><div><dt>Категория</dt><dd>{selected.category}</dd></div><div><dt>Зона</dt><dd>{selected.storage_zone}</dd></div><div><dt>Остаток</dt><dd>{selected.stock_status === "IN STOCK" ? `${selected.available_units ?? "—"} ед.` : "Нет"}</dd></div><div><dt>ID записи</dt><dd>{selected.inventory_id}</dd></div></dl><button className="primaryBtn staticBtn" onClick={() => setSelected(null)}>Закрыть карточку</button></div></section></div>}
    </main>
  );
}
