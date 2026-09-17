import React from 'react';
import { Star, Calendar, Info, Film } from 'lucide-react';

export default function MovieCard({ show, onSelectShow }) {
  const posterUrl = show.poster || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80';

  return (
    <div className="movie-card">
      <div className="card-poster-wrapper">
        <img 
          src={posterUrl} 
          alt={show.name} 
          className="card-poster"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80';
          }}
        />
        <div className="card-rating-badge">
          <Star size={14} fill="#fbbf24" color="#fbbf24" />
          <span>{show.rating !== 'N/A' ? show.rating : 'NR'}</span>
        </div>
      </div>

      <div className="card-body">
        <div>
          <h3 className="card-title" title={show.name}>{show.name}</h3>
          
          <div className="card-meta">
            <div className="card-meta-item">
              <Calendar size={13} />
              <span>{show.year}</span>
            </div>
            {show.language && (
              <div className="card-meta-item">
                <span>• {show.language}</span>
              </div>
            )}
          </div>

          {show.genres && show.genres.length > 0 && (
            <div className="card-genres">
              {show.genres.slice(0, 2).map((genre, idx) => (
                <span key={idx} className="genre-tag">{genre}</span>
              ))}
            </div>
          )}
        </div>

        <button 
          className="btn-details"
          onClick={() => onSelectShow(show)}
        >
          <Info size={15} />
          <span>See Details</span>
        </button>
      </div>
    </div>
  );
}
