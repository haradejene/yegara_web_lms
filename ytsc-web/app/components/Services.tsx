export default function Services() {
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ color: "var(--color-primary-blue)", marginBottom: "3rem" }}>
          Our Services
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem"
        }}>
          <div>
            <h3 style={{ color: "var(--color-primary-orange)" }}>Strategic Trading</h3>
            <p>Efficient global trade and supply chain management.</p>
          </div>

          <div>
            <h3 style={{ color: "var(--color-primary-orange)" }}>Innovation Hubs</h3>
            <p>Incubating scalable, tech-driven business solutions.</p>
          </div>

          <div>
            <h3 style={{ color: "var(--color-primary-orange)" }}>Investment Growth</h3>
            <p>Long-term value creation through smart capital allocation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}