export default function Footer() {
  return (
    <footer style={{
      background: "var(--color-primary-blue)",
      color: "white",
      padding: "3rem 0",
      textAlign: "center"
    }}>
      <div className="container">
        <p>© {new Date().getFullYear()} Yegara Trading Share Company</p>
      </div>
    </footer>
  )
}