import React, { useState } from 'react';
import { Film, Search, Menu, X, Compass } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, onSearchClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <a href="#home" className="brand-logo" onClick={() => handleNavClick('home')}>
          <div className="logo-icon">
            <Film size={22} />
          </div>
          <div className="brand-text">
            Movie<span>Explorer</span>
          </div>
        </a>

        {/* Navigation items */}
        <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <button
              className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'explore' ? 'active' : ''}`}
              onClick={() => handleNavClick('explore')}
            >
              Explore Movies
            </button>
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setActiveView('explore');
              if (onSearchClick) onSearchClick();
            }}
          >
            <Compass size={18} />
            <span>Discover Movies</span>
          </button>

          <button 
            className="menu-toggle"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
