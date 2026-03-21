import { Link, Outlet } from "react-router-dom";
import css from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={css.page}>
      <header className={css.header}>
        <div className={css.headerInner}>
          <div className={css.brand}>
            <Link to="/" className={css.brandLink}>
              <div className={css.logo}>
                <svg viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="6" fill="#673ab7" />
                  <rect x="6" y="7" width="12" height="2" fill="white" />
                  <rect x="6" y="11" width="12" height="2" fill="white" />
                  <rect x="6" y="15" width="8" height="2" fill="white" />
                </svg>
              </div>

              <span className={css.title}>Google Forms Lite</span>
            </Link>
          </div>

          <nav className={css.nav}>
            <Link to="/" className={css.link}>
              Home
            </Link>
            <Link to="/forms/new" className={css.link}>
              Create Form
            </Link>
          </nav>
        </div>
      </header>

      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
}
