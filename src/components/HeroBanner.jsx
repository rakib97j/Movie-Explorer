import React from 'react';
import { Sparkles, ArrowRight, Play, Star, Film, Tv } from 'lucide-react';

export default function HeroBanner({ onExploreClick }) {
  return (
    <div className="hero-banner">
      <div className="hero-backdrop-glow"></div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Discover Top Rated TV Shows & Movies</span>
          </div>

          <h1 className="hero-title">
            DISCOVER <span className="text-gradient">MOVIES</span> & SHOWS WORLDWIDE
          </h1>

          <p className="hero-description">
            Explore and discover your favorite movies and TV shows from around the world. Access real-time ratings, release dates, storylines, and cast information.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={onExploreClick}>
              <span>Explore Now</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-stats glass-panel">
            <div className="stat-item">
              <div className="stat-value">50,000+</div>
              <div className="stat-label">Movies & TV Shows</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">⭐ 8.5+</div>
              <div className="stat-label">Top Rated Catalog</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">100% Free</div>
              <div className="stat-label">No Subscription Needed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
