import React from 'react';
import MovieCard from './MovieCard';
import { Film, RefreshCw, AlertCircle } from 'lucide-react';

export default function MovieGrid({ shows, loading, error, onSelectShow, onRetry }) {
  if (loading) {
    return (
      <div className="movie-grid">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="skeleton-card" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <AlertCircle className="empty-icon" />
        <h3 className="empty-title">Failed to load movies</h3>
        <p className="empty-subtitle">{error}</p>
        <button className="btn btn-primary" onClick={onRetry}>
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  if (!shows || shows.length === 0) {
    return (
      <div className="empty-state">
        <AlertCircle className="empty-icon" />
        <h3 className="empty-title">No movies found</h3>
        <p className="empty-subtitle">We couldn't find any title matching your query. Try searching for something else!</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {shows.map(show => (
        <MovieCard 
          key={show.id} 
          show={show} 
          onSelectShow={onSelectShow} 
        />
      ))}
    </div>
  );
}
