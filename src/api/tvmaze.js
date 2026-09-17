const BASE_URL = 'https://api.tvmaze.com';

export function normalizeShow(item) {
  if (!item) return null;
  const show = item.show || item;

  const cleanSummary = show.summary 
    ? show.summary.replace(/<[^>]+>/g, '').trim() 
    : 'No summary available for this title.';

  const year = show.premiered ? show.premiered.slice(0, 4) : 'N/A';
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

export async function fetchShows(page = 0) {
  const res = await fetch(`${BASE_URL}/shows?page=${page}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(normalizeShow);
}

export async function searchShows(query) {
  const trimmed = query?.trim();
  if (!trimmed) return fetchShows(0);

  const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(trimmed)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(normalizeShow);
}

export async function fetchShowDetails(id) {
  const res = await fetch(`${BASE_URL}/shows/${id}?embed=cast`);
  if (!res.ok) return null;
  const data = await res.json();
  
  const cast = data._embedded?.cast?.map(entry => ({
    person: entry.person?.name,
    character: entry.character?.name,
    image: entry.person?.image?.medium || entry.character?.image?.medium,
  })) || [];

  return {
    ...normalizeShow(data),
    cast,
  };
}


