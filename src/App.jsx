import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetailsModal from './components/MovieDetailsModal';
import Footer from './components/Footer';
import { fetchShows, searchShows } from './api/tvmaze';
import { Film, Flame, Sparkles } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  
  const [selectedShow, setSelectedShow] = useState(null);

  const searchInputRef = useRef(null);

  // Load initial shows on mount
  const loadInitialShows = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchShows(0);
      setShows(data);
    } catch (err) {
      console.error(err);
      setError('Unable to connect to movie database. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialShows();
  }, []);

  // Handle Search Input Debounce
  useEffect(() => {
    let timer;
    if (searchTerm.trim() !== '') {
      setLoading(true);
      setError(null);
      timer = setTimeout(async () => {
        try {
          const results = await searchShows(searchTerm);
          setShows(results);
        } catch (err) {
          console.error(err);
          setError('Failed to fetch search results. Please check your query.');
        } finally {
          setLoading(false);
        }
      }, 350);
    } else if (!loading && shows.length === 0) {
      loadInitialShows();
    }

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filtered & Sorted Shows
  const filteredShows = useMemo(() => {
    let result = [...shows];

    // Filter by genre
    if (selectedGenre !== 'All') {
      result = result.filter(show => 
        show.genres && show.genres.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Sort shows
    if (sortBy === 'rating') {
      result.sort((a, b) => {
        const rA = a.rating !== 'N/A' ? parseFloat(a.rating) : 0;
        const rB = b.rating !== 'N/A' ? parseFloat(b.rating) : 0;
        return rB - rA;
      });
    } else if (sortBy === 'year') {
      result.sort((a, b) => {
        const yA = a.year !== 'N/A' ? parseInt(a.year) : 0;
        const yB = b.year !== 'N/A' ? parseInt(b.year) : 0;
        return yB - yA;
      });
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [shows, selectedGenre, sortBy]);

  // Featured top rated shows for Home Page
  const featuredShows = useMemo(() => {
    return [...shows]
      .filter(s => s.rating !== 'N/A' && s.poster)
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, 5);
  }, [shows]);

  const handleExploreClick = () => {
    setActiveView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Header / Navigation */}
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView}
        onSearchClick={() => {
          if (searchInputRef.current) searchInputRef.current.focus();
        }}
      />

      <main className="main-content">
        {activeView === 'home' ? (
          <>
            {/* Landing Hero Section */}
            <HeroBanner onExploreClick={handleExploreClick} />

            {/* Featured / Trending Movies Section */}
            <div className="container" style={{ paddingBottom: '4rem' }}>
              <div className="section-header">
                <h2 className="section-title">
                  <Flame size={24} color="var(--accent-secondary)" />
                  <span>Trending Movies & Shows</span>
                </h2>
                <button className="btn btn-secondary" onClick={handleExploreClick}>
                  View All ({shows.length})
                </button>
              </div>

              <MovieGrid 
                shows={featuredShows} 
                loading={loading} 
                error={error} 
                onSelectShow={setSelectedShow}
                onRetry={loadInitialShows}
              />
            </div>
          </>
        ) : (
          /* Movie Listing Page */
          <div className="container" style={{ paddingTop: '1rem' }}>
            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              sortBy={sortBy}
              setSortBy={setSortBy}
              resultsCount={filteredShows.length}
            />

            <MovieGrid 
              shows={filteredShows} 
              loading={loading} 
              error={error} 
              onSelectShow={setSelectedShow}
              onRetry={loadInitialShows}
            />
          </div>
        )}
      </main>

      {/* Details Modal */}
      {selectedShow && (
        <MovieDetailsModal 
          show={selectedShow} 
          onClose={() => setSelectedShow(null)} 
        />
      )}

      {/* Footer */}
      <Footer onNavigate={setActiveView} />
    </div>
  );
}
