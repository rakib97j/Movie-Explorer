import { Sparkles, ArrowRight } from 'lucide-react';

export default function HeroBanner({ onExploreClick }) {
  return (
    <div className="hero-banner">
      <div className="hero-backdrop-glow"></div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Discover Popular Shows & Movies</span>
          </div>

          <h1 className="hero-title">
            FIND YOUR NEXT <span className="text-gradient">FAVORITE</span> SHOW
          </h1>

          <p className="hero-description">
            Search thousands of movies and TV series. Check ratings, cast lists, plot details, and storyline overviews all in one place.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={onExploreClick}>
              <span>Start Exploring</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-stats glass-panel">
            <div className="stat-item">
              <div className="stat-value">50,000+</div>
              <div className="stat-label">Titles Indexed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">⭐ 8.5+</div>
              <div className="stat-label">Average Ratings</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">Free</div>
              <div className="stat-label">No Registration</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

