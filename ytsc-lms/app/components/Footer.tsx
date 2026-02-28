import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-title">About Us</h4>
            <p className="footer-text">
              We provide high-quality online courses to help you advance your career and achieve your goals.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              <li><Link href="/courses?category=development">Development</Link></li>
              <li><Link href="/courses?category=design">Design</Link></li>
              <li><Link href="/courses?category=marketing">Marketing</Link></li>
              <li><Link href="/courses?category=business">Business</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/cookies">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} LMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}