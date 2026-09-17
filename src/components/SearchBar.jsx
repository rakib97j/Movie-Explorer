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
            placeholder="Search by title (e.g. Breaking Bad, Batman, Office)..."
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

          <div className="filters-right">
            <span className="results-meta">
              <strong>{resultsCount}</strong> titles found
            </span>

            <div className="sort-wrapper">
              <SlidersHorizontal size={15} color="var(--text-muted)" />
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default Sort</option>
                <option value="rating">Top Rated</option>
                <option value="year">Newest First</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

