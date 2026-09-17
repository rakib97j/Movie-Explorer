const BASE_URL = 'https://api.tvmaze.com';

/**
 * Normalizes show object format whether it comes from search or direct endpoint
 */
export function normalizeShow(item) {
  if (!item) return null;
  // If item comes from /search/shows, it's wrapped as { score, show }
  const show = item.show ? item.show : item;
  
  // Clean HTML tags from summary helper
  const cleanSummary = show.summary 
    ? show.summary.replace(/<[^>]*>?/gm, '') 
    : 'No description available for this title.';

  const year = show.premiered ? show.premiered.substring(0, 4) : 'N/A';
  const rating = show.rating?.average ? show.rating.average.toFixed(1) : 'N/A';
  const poster = show.image?.medium || show.image?.original || null;
  const backdrop = show.image?.original || show.image?.medium || null;

  return {
    ...show,
    cleanSummary,
    year,
    rating,
    poster,
    backdrop,
  };
}

/**
 * Fetch default popular shows for landing/listing page
 */
export async function fetchShows(page = 0) {
  try {
    const response = await fetch(`${BASE_URL}/shows?page=${page}`);
    if (!response.ok) {
      throw new Error(`Error fetching shows: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(show => normalizeShow(show));
  } catch (error) {
    console.error('fetchShows error:', error);
    throw error;
  }
}

/**
 * Search shows by title
 */
export async function searchShows(query) {
  if (!query || !query.trim()) {
    return fetchShows(0);
  }

  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`);
    if (!response.ok) {
      throw new Error(`Error searching shows: ${response.statusText}`);
    }
    const data = await response.json();
    return data.map(item => normalizeShow(item));
  } catch (error) {
    console.error('searchShows error:', error);
    throw error;
  }
}

/**
 * Fetch detailed show information including cast
 */
export async function fetchShowDetails(id) {
  try {
    const response = await fetch(`${BASE_URL}/shows/${id}?embed=cast`);
    if (!response.ok) {
      throw new Error(`Error fetching show details: ${response.statusText}`);
    }
    const data = await response.json();
    const normalized = normalizeShow(data);
    const cast = data._embedded?.cast?.map(c => ({
      person: c.person?.name,
      character: c.character?.name,
      image: c.person?.image?.medium || c.character?.image?.medium,
    })) || [];

    return {
      ...normalized,
      cast,
    };
  } catch (error) {
    console.error('fetchShowDetails error:', error);
    throw error;
  }
}
