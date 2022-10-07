import Auth from '../auth/Auth';
import { appendToEndpoint } from '../util/requests';

const constructEndpointForGeneralRequest = (mediaType: string, id: number) => {
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
  return `${THEMOVIEDB_BASE_URL}/3/${mediaType}/${id}?${params}`;
}

export async function getTVShowDetailsGeneral(id: number, requestType: string) {
  let endpoint = constructEndpointForGeneralRequest('tv', id);
  endpoint = appendToEndpoint(endpoint, requestType);

  const res = await fetch(endpoint);
  const shows = await res.json();

  // Default back to the shows object if there's no
  // results field name.
  return shows?.results || shows;
}

// Wrappers for the general function
export async function getTVShowMetadataByTVID(id: number) {
  return await getTVShowDetailsGeneral(id, '');
}

export async function getSimilarTVShowsByTVID(id: number) {
  return await getTVShowDetailsGeneral(id, '/similar');
}

export async function getTVRecommendationsByTVID(id: number) {
  return await getTVShowDetailsGeneral(id, '/recommendations');
}

export async function getTVShowReviewsByTVID(id: number) {
  return await getTVShowDetailsGeneral(id, '/reviews');
}