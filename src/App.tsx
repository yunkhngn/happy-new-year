import { WishList } from '@/components/WishList';
import { WishForm } from '@/components/WishForm';
import '@/components/CreditLink.css';

function App() {
  return (
    <div className="app">
      <div className="lixi-banner">
        <span>🧧 Nếu bạn thích website này, có thể lì xì cho nghệ sĩ trẻ!</span>
        <a href="https://buymeacoffee.com/yunkhngn" target="_blank" rel="noopener noreferrer" className="lixi-button">
          Lì xì cho Khoa bằng cốc cà phê ☕
        </a>
      </div>

      {/* Hero Header */}
      <header className="hero-header">
        <div className="hero-bg">
          <h1 className="hero-title">
            <span className="hero-happy">Happy</span>
            <span className="hero-new">N</span>
            <span className="hero-new">E</span>
            <span className="hero-new">W</span>
            <span className="hero-space"> </span>
            <span className="hero-new">Y</span>
            <span className="hero-new">E</span>
            <span className="hero-new">A</span>
            <span className="hero-new">R</span>
          </h1>
        </div>
      </header>

      {/* Marquee Ticker */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="marquee-item">
              TẾT 2026 <span className="marquee-dot">✦</span> NĂM BÍNH NGỌ <span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Content - Two Panel Layout */}
      <main className="main-content">
        <WishList />
        <div className="panel-divider" />
        <WishForm />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-marquee">
          <div className="marquee-track reverse">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="marquee-item footer-item">
                CHÚC MỪNG NĂM MỚI <span className="marquee-dot">✦</span> AN KHANG THỊNH VƯỢNG <span className="marquee-dot">✦</span> VẠN SỰ NHƯ Ý <span className="marquee-dot">✦</span>
              </span>
            ))}
          </div>
        </div>
        <p className="footer-credit">
          Made with love by <a href="https://github.com/yunkhngn" target="_blank" rel="noopener noreferrer" className="credit-link">@yunkhngn</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
