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

export async function getTVShowDataByID(id: number) {
  const res = await fetch(constructEndpointForGeneralRequest('tv', id));
  return await res.json();
}

// TODO: deduplicate the logic in the below functions? the only
// thing that differs is the 2nd arg in appendToEndpoint().
export async function getSimilarTVShowsByTVID(id: number) {
  const numResultsToReturn = 10;
  let endpoint = constructEndpointForGeneralRequest('tv', id);
  endpoint = appendToEndpoint(endpoint, '/similar');

  const res = await fetch(endpoint);
  const shows = await res.json();
  return (shows?.results).slice(0, numResultsToReturn);
}

export async function getTVRecommendationsByTVID(id: number) {
  const numResultsToReturn = 10;
  let endpoint = constructEndpointForGeneralRequest('tv', id);
  endpoint = appendToEndpoint(endpoint, '/recommendations');

  const res = await fetch(endpoint);
  const shows = await res.json();
  return (shows?.results).slice(0, numResultsToReturn);
}

