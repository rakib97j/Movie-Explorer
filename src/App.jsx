import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetailsModal from './components/MovieDetailsModal';
import Footer from './components/Footer';
import { fetchShows, searchShows } from './api/tvmaze';
import { Flame } from 'lucide-react';

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

  const loadInitialShows = useCallback(async () => {
    setLoading(true);
    setError(null);
    const data = await fetchShows(0);
    setShows(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchShows(0).then(data => {
      setShows(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const query = searchTerm.trim();
    if (!query) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      const results = await searchShows(query);
      setShows(results);
      setLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredShows = useMemo(() => {
    let result = [...shows];

    if (selectedGenre !== 'All') {
      result = result.filter(show => 
        show.genres?.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => {
        const rA = a.rating !== 'N/A' ? parseFloat(a.rating) : 0;
        const rB = b.rating !== 'N/A' ? parseFloat(b.rating) : 0;
        return rB - rA;
      });
    } else if (sortBy === 'year') {
      result.sort((a, b) => {
        const yA = a.year !== 'N/A' ? parseInt(a.year, 10) : 0;
        const yB = b.year !== 'N/A' ? parseInt(b.year, 10) : 0;
        return yB - yA;
      });
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [shows, selectedGenre, sortBy]);

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
            <HeroBanner onExploreClick={handleExploreClick} />

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

      {selectedShow && (
        <MovieDetailsModal 
          show={selectedShow} 
          onClose={() => setSelectedShow(null)} 
        />
      )}

      <Footer onNavigate={setActiveView} />
    </div>
  );
}

