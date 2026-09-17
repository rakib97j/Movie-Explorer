import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

const GENRES = [
  'All',
  'Drama',
  'Action',
  'Comedy',
  'Sci-Fi',
  'Thriller',
  'Crime',
  'Adventure',
  'Anime',
  'Romance',
  'Horror'
];

export default function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  selectedGenre, 
  setSelectedGenre,
  sortBy,
  setSortBy,
  resultsCount 
}) {
  return (
    <div className="search-section">
      <div className="search-box-wrapper">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Search for a movie or TV show title (e.g. Girls, Batman, Office)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="search-clear-btn" 
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="filters-bar">
          {/* Genre Filters */}
          <div className="genre-pills">
            {GENRES.map((genre) => (
              <button
                key={genre}
                className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Results count & Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="results-meta">
              Showing <strong>{resultsCount}</strong> titles
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <SlidersHorizontal size={15} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  padding: '0.4rem 0.6rem',
                  fontSize: '0.85rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="default">Default Sort</option>
                <option value="rating">⭐ Top Rated</option>
                <option value="year">📅 Newest First</option>
                <option value="title">🔤 Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
