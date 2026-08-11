import Image from "next/image";
import Link from "next/link";
import { publicAsset } from "../inventory-data";

type ActiveSection = "home" | "brands" | "in-stock";

export function SiteHeader({ active }: { active: ActiveSection }) {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brandmark" href="/" aria-label="Elliot Watches — на главную">
          <Image src={publicAsset("/favicon.svg")} alt="Логотип Elliot Watches" width={54} height={54} unoptimized />
          <span><b>ELLIOT WATCHES</b><small>CURATED TIMEPIECES</small></span>
        </Link>
        <nav aria-label="Основная навигация">
          <Link className={active === "home" ? "active" : ""} href="/">Главная</Link>
          <Link className={active === "brands" ? "active" : ""} href="/#brands">Бренды</Link>
          <Link className={active === "in-stock" ? "active" : ""} href="/in-stock/">Текущая коллекция</Link>
        </nav>
        <div className="header-actions">
          <Link className="icon-link" href="/in-stock/#inventory" aria-label="Перейти к поиску">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ positions, units }: { positions: number; units: number }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <div className="brandmark">
            <Image src={publicAsset("/favicon.svg")} alt="Elliot Watches" width={54} height={54} unoptimized />
            <span><b>ELLIOT WATCHES</b><small>CURATED TIMEPIECES</small></span>
          </div>
          <p>Персональная витрина часов: знаковые модели, актуальные линейки брендов и карточки моей текущей коллекции.</p>
        </div>
        <div><h2>Каталог</h2><Link href="/">Главная</Link><Link href="/#brands">Все бренды</Link><Link href="/in-stock/">Текущая коллекция</Link></div>
        <div><h2>Навигация</h2><Link href="/#brands">Путеводитель по брендам</Link><Link href="/in-stock/#inventory">Поиск по коллекции</Link></div>
        <div className="footer-status"><h2>Личный архив</h2><p>Коллекция Elliot Watches</p><small>{positions} карточек · {units} экземпляров</small></div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Elliot Watches.</span><Link href="/">На главную ↑</Link></div>
    </footer>
  );
}
