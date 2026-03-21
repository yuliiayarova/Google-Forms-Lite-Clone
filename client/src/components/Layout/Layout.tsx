import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <header style={{ marginBottom: "24px" }}>
        <h1>Google Forms Lite</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
