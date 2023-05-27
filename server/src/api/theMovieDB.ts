import Auth from '../auth/Auth';
import { appendToEndpoint } from '../util/RequestUtil';
import { SearchTypes } from '../types/Search';
import { formatRawDataIntoShowModel } from '../TMDBOperations';
import { Show } from '../../../common/types/Show';
import { saveTVPosterToServer } from '../util/ImageUtil';

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
    'api_key': new Auth().getTMDBCreds().apiKey
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
  let showToFormat = shows?.results || shows;
  //console.log(showToFormat);
  if (showToFormat?.id && showToFormat?.name) {
    showToFormat = formatRawDataIntoShowModel(showToFormat);
    return showToFormat;
  }

  return null;
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
}): Promise<Show> | null {
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

  let showToFormat = shows?.results || shows;
  if (showToFormat?.id && showToFormat?.name) {
    showToFormat = formatRawDataIntoShowModel(showToFormat);
    return showToFormat;
  }

  return null;
}

// Info taken from: https://developers.themoviedb.org/3/configuration/get-api-configuration
// imagePath - Obtained from each show object, field name `poster_path`.
// size - Can be any of the following: 'original', 'w92', 'w154', 'w185', 'w342', 'w500', 'w780'
export async function saveTVShowPosterByImagePath(imagePath: string, size: string) {
  const THEMOVIEDB_IMAGE_BASE_URL_INSECURE = 'http://image.tmdb.org/t/p/';
  const THEMOVIEDB_IMAGE_BASE_URL_SECURE = 'https://image.tmdb.org/t/p/';

  // imagePath will always contain the `/` character when pulling directly from the API.
  const endpoint = `${THEMOVIEDB_IMAGE_BASE_URL_SECURE}${size}${imagePath}`;
  console.log(endpoint);

  const image = await fetch(endpoint);
  const imageBlob = await image.blob();

  await saveTVPosterToServer(imageBlob, imagePath);  
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
    if (show?.posterPath) {
      await saveTVShowPosterByImagePath(show.posterPath, "w500");
    }

    metaDataObj[id] = show;
  }

  return metaDataObj;
}