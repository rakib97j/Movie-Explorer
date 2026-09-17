import React, { useEffect, useState } from 'react';
import { X, Star, Calendar, Clock, Globe, Tv, User, ExternalLink, Award } from 'lucide-react';
import { fetchShowDetails } from '../api/tvmaze';

export default function MovieDetailsModal({ show, onClose }) {
  const [details, setDetails] = useState(show);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (show && show.id) {
      setLoadingDetails(true);
      fetchShowDetails(show.id)
        .then(data => {
          if (isMounted) {
            setDetails(data);
            setLoadingDetails(false);
          }
        })
        .catch(err => {
          console.error("Failed to load embedded details:", err);
          if (isMounted) setLoadingDetails(false);
        });
    }

    // Body scroll lock
    document.body.classList.add('modal-open');

    // Keydown ESC handler
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) return null;

  const currentData = details || show;
  const posterUrl = currentData.poster || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80';
  const backdropUrl = currentData.backdrop || posterUrl;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close details">
          <X size={20} />
        </button>

        {/* Modal Backdrop Banner */}
        <div className="modal-hero">
          <img src={backdropUrl} alt={currentData.name} className="modal-backdrop-img" />
          <div className="modal-hero-overlay"></div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-header-grid">
            <img src={posterUrl} alt={currentData.name} className="modal-poster" />
            
            <div className="modal-info">
              <h2 className="modal-title">{currentData.name}</h2>
              
              <div className="modal-meta-row">
                <div className="modal-meta-item modal-rating-badge">
                  <Star size={16} fill="#fbbf24" color="#fbbf24" />
                  <span>Rating: {currentData.rating !== 'N/A' ? currentData.rating : 'N/A'}</span>
                </div>

                <div className="modal-meta-item">
                  <Calendar size={15} />
                  <span>Release: {currentData.premiered || currentData.year}</span>
                </div>

                {currentData.runtime && (
                  <div className="modal-meta-item">
                    <Clock size={15} />
                    <span>{currentData.runtime} mins</span>
                  </div>
                )}
              </div>

              {currentData.genres && currentData.genres.length > 0 && (
                <div className="modal-genres">
                  {currentData.genres.map((genre, idx) => (
                    <span key={idx} className="modal-genre-badge">{genre}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Overview / Summary */}
          <div className="modal-section">
            <h3 className="modal-section-title">Overview</h3>
            <p className="modal-summary">
              {currentData.cleanSummary}
            </p>
          </div>

          {/* Key Details Grid */}
          <div className="modal-details-grid">
            <div>
              <div className="detail-box-label">Language</div>
              <div className="detail-box-value">{currentData.language || 'N/A'}</div>
            </div>

            <div>
              <div className="detail-box-label">Status</div>
              <div className="detail-box-value">{currentData.status || 'N/A'}</div>
            </div>

            <div>
              <div className="detail-box-label">Network / Channel</div>
              <div className="detail-box-value">
                {currentData.network?.name || currentData.webChannel?.name || 'N/A'}
              </div>
            </div>

            <div>
              <div className="detail-box-label">Type</div>
              <div className="detail-box-value">{currentData.type || 'Scripted'}</div>
            </div>
          </div>

          {/* Cast Overview (if fetched) */}
          {currentData.cast && currentData.cast.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">Main Cast</h3>
              <div className="cast-list">
                {currentData.cast.slice(0, 8).map((actor, idx) => (
                  <div key={idx} className="cast-card">
                    <img 
                      src={actor.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
                      alt={actor.person} 
                      className="cast-img"
                    />
                    <div className="cast-name" title={actor.person}>{actor.person}</div>
                    <div className="cast-character" title={actor.character}>{actor.character}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Actions Footer */}
          <div className="modal-footer">
            {currentData.officialSite && (
              <a 
                href={currentData.officialSite} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                <Globe size={16} />
                <span>Official Site</span>
                <ExternalLink size={14} />
              </a>
            )}

            <button className="btn btn-primary" onClick={onClose}>
              <X size={16} />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
