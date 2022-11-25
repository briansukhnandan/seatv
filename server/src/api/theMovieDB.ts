import Auth from '../auth/Auth';
import { appendToEndpoint } from '../util/requests';

const SearchTypes = {
  ID: 'id',
  Query: 'query'
}
const constructEndpointForGeneralRequest = ({
  id,
  searchType,
  mediaType = 'tv',
}: {
  id: number,
  searchType: string,
  mediaType?: string
}) => {
  // Keep these two objects around for when TheMovieDB
  // deprecates v3 auth, i.e. deprecating API Keys in favor
  // of the v4 access-token based OAuth system.
  /*
    const reqHeaders: HeadersInit = new Headers();
    reqHeaders.set('Authorization', `Bearer: ${theMovieDBCreds.token}`);
    reqHeaders.set('Content-Type', `application/json;charset=utf-8`);

    const options = {
      method: 'GET',
      headers: reqHeaders
    }
  */

  const THEMOVIEDB_BASE_URL='https://api.themoviedb.org';

  const theMovieDBCreds = new Auth().getTheMovieDBCredentials();
  const params = new URLSearchParams({
    'api_key': theMovieDBCreds.apiKey
  });

  switch (searchType) {
    case SearchTypes.ID:
      return `${THEMOVIEDB_BASE_URL}/3/${mediaType}/${id}?${params}`;
    case SearchTypes.Query:
      return `${THEMOVIEDB_BASE_URL}/3/search/${mediaType}?${params}`;
    default:
      return '';
  }
}

export async function getTVShowDetailsByIdGeneral(id: number, requestType: string) {
  let endpoint = constructEndpointForGeneralRequest({
    id, 
    searchType: SearchTypes.ID
  });
  endpoint = appendToEndpoint(endpoint, requestType);

  const res = await fetch(endpoint);
  const shows = await res.json();

  // Default back to the shows object if there's no
  // results field name.
  return shows?.results || shows;
}

// Wrappers for the general function
export async function getTVShowMetadataByTVID(id: number) {
  return await getTVShowDetailsByIdGeneral(id, '');
}

export async function getSimilarTVShowsByTVID(id: number) {
  return await getTVShowDetailsByIdGeneral(id, '/similar');
}

export async function getTVRecommendationsByTVID(id: number) {
  return await getTVShowDetailsByIdGeneral(id, '/recommendations');
}

export async function getTVShowReviewsByTVID(id: number) {
  return await getTVShowDetailsByIdGeneral(id, '/reviews');
}