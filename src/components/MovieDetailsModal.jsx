import { useEffect, useState } from 'react';
import { X, Star, Calendar, Clock, Globe, ExternalLink } from 'lucide-react';
import { fetchShowDetails } from '../api/tvmaze';

const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80';
const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

export default function MovieDetailsModal({ show, onClose }) {
  const [details, setDetails] = useState(show);

  useEffect(() => {
    let active = true;
    if (show?.id) {
      fetchShowDetails(show.id).then(data => {
        if (active && data) setDetails(data);
      });
    }

    document.body.classList.add('modal-open');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      active = false;
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) return null;

  const currentData = details || show;
  const posterUrl = currentData.poster || FALLBACK_POSTER;
  const backdropUrl = currentData.backdrop || posterUrl;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-hero">
          <img src={backdropUrl} alt={currentData.name} className="modal-backdrop-img" />
          <div className="modal-hero-overlay" />
        </div>

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

              {currentData.genres?.length > 0 && (
                <div className="modal-genres">
                  {currentData.genres.map((genre, idx) => (
                    <span key={idx} className="modal-genre-badge">{genre}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Overview</h3>
            <p className="modal-summary">
              {currentData.cleanSummary}
            </p>
          </div>

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

          {currentData.cast?.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">Cast</h3>
              <div className="cast-list">
                {currentData.cast.slice(0, 8).map((actor, idx) => (
                  <div key={idx} className="cast-card">
                    <img 
                      src={actor.image || FALLBACK_AVATAR} 
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

