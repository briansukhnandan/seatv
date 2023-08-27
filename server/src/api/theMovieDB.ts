import Auth from '../auth/Auth';
import { appendToEndpoint } from '../util/RequestUtil';
import { SearchTypes } from '../types/Search';
import { formatRawDataIntoShowModel } from '../TMDBOperations';
import { Show } from '../../../common/types/Show';
import { saveTVPosterToServer } from '../util/ImageUtil';
import { handleShowFormattingFromApiResult } from '../util/ShowUtil';

const constructEndpointForGeneralRequest = ({
  // TMDB supports 2 modes:
  //    - By ID (no official mapping of ID -> TV show on their API docs unfortunately).
  //    - By Query (Useful for SearchBar implementation)
  id,
  query,

  // Optional - Mostly for query searching/filtering.
  language = 'en_US',
  page = 1,
  includeAdult = true,
  firstAirDateYear,

  // searchType ∈ ['id', 'query']
  // mediaType - Defaulted to 'tv'.
  searchType,
  mediaType = 'tv',
} : {
  searchType: SearchTypes,
  id?: number,
  query?: string,
  language?: string,
  page?: number,
  includeAdult?: boolean,
  firstAirDateYear?: number,
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
  let paramsObj = {
    api_key: new Auth().getTMDBCreds().apiKey
  };

  switch (searchType) {
    case SearchTypes.ID:
      const idParams = new URLSearchParams(paramsObj);
      return `${THEMOVIEDB_BASE_URL}/3/${mediaType}/${id}?${idParams}`;
    
    case SearchTypes.Query:
      if (page) { paramsObj['page'] = page }
      if (language) { paramsObj['language'] = language }
      if (!includeAdult) { paramsObj['include_adult'] = 'false' }
      if (firstAirDateYear) { paramsObj['first_air_date_year'] = firstAirDateYear }

      if (query) {
        // TMDB requires query to be URI encoded.
        paramsObj['query'] = query;

        const queryParams = new URLSearchParams(paramsObj);
        return `${THEMOVIEDB_BASE_URL}/3/search/${mediaType}?${queryParams}`;
      }
  }
}

// id - Taken from TMDB
// requestType ∈ ['reviews', 'recommendations', 'similar']
export async function getTVShowDetailsByIdGeneral(id: number, requestType: string): Promise<Show> | null {
  let endpoint = constructEndpointForGeneralRequest({
    id, 
    searchType: SearchTypes.ID
  });
  endpoint = appendToEndpoint(endpoint, requestType);

  const res = await fetch(endpoint);
  const shows = await res.json();

  // Default back to the shows object if there's no
  // results field name.
  const rawShow = shows?.results || shows;
  const show = await handleShowFormattingFromApiResult(rawShow);

  return show;
}

export async function getTVShowDetailsByQueryGeneral({
  query,
  language,
  page,
  includeAdult,
  firstAirDateYear,
} : {
  query: string,
  language?: string,
  page?: number,
  includeAdult?: boolean,
  firstAirDateYear?: number,
}): Promise<Show[]> {
  const args = {};

  args['query'] = query;
  if (page) { args['page'] = page }
  if (language) { args['language'] = language }
  if (!includeAdult) { args['include_adult'] = false }
  if (firstAirDateYear) { args['first_air_date_year'] = firstAirDateYear }

  const endpoint = constructEndpointForGeneralRequest({
    ...args,
    searchType: SearchTypes.Query
  });

  const res = await fetch(endpoint);
  const shows = await res.json();

  const rawShows = shows?.results || shows;
  const formattedShows = [];

  for (const show of rawShows) {
    const formattedShow = await handleShowFormattingFromApiResult(show);
    formattedShows.push(formattedShow);
  }

  return formattedShows;
}

// Info taken from: https://developers.themoviedb.org/3/configuration/get-api-configuration
// imagePath - Obtained from each show object, field name `poster_path`.
// size - Can be any of the following: 'original', 'w92', 'w154', 'w185', 'w342', 'w500', 'w780'
export async function getImageBlobFromTVShowPosterPath(imagePath: string, size: string, isSecure = true): Promise<Blob> {
  const THEMOVIEDB_IMAGE_BASE_URL = `http${isSecure ? "s" : ""}://image.tmdb.org/t/p/`;

  // imagePath will always contain the `/` character when pulling directly from the API.
  const endpoint = `${THEMOVIEDB_IMAGE_BASE_URL}${size}${imagePath}`;

  const image = await fetch(endpoint);
  const imageBlob = await image.blob();

  return imageBlob; 
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

// RPC wrappers
export async function getMultipleTVShowsMetadataByTVIDs(ids: number[]) {
  const metaDataObj = {};
  
  for (const id of ids) {
    const show = await getTVShowMetadataByTVID(id);
    metaDataObj[id] = show;
  }

  return metaDataObj;
}
