import React from 'react';
import { Film, Globe, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <a href="#home" className="brand-logo" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <div className="logo-icon">
            <Film size={20} />
          </div>
          <div className="brand-text">
            Movie<span>Explorer</span>
          </div>
        </a>

        <ul className="footer-links">
          <li>
            <a href="#home" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
          </li>
          <li>
            <a href="#explore" className="footer-link" onClick={(e) => { e.preventDefault(); onNavigate('explore'); }}>Browse Movies</a>
          </li>
          <li>
            <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer" className="footer-link">TVMaze API</a>
          </li>
        </ul>

        <p className="footer-copy">
          © 2026 MovieExplorer. Built with React & TVMaze API. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
