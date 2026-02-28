export default function Hero() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <h1 style={{
          fontSize: "3rem",
          color: "var(--color-primary-blue)",
          marginBottom: "1.5rem"
        }}>
          Driving Innovation Through Strategic Trading
        </h1>

        <p style={{
          maxWidth: "700px",
          margin: "0 auto 2rem",
          fontSize: "1.2rem",
          lineHeight: "1.6"
        }}>
          Yegara Trading Share Company empowers industries
          with smart investments, innovation hubs, and
          scalable trading solutions.
        </p>

        <a href="#" className="btn-primary">
          Explore Services
        </a>
      </div>
    </section>
  )
}