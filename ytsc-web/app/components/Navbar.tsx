export default function Navbar() {
  return (
    <nav style={{
      background: "white",
      padding: "1.2rem 0",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "var(--color-primary-orange)" }}>YEGARA</h2>

        <div style={{ display: "flex", gap: "2rem" }}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </nav>
  )
}