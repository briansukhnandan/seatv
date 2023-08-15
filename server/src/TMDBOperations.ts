import { Season, Show } from '../../common/types/Show';

export function formatRawDataIntoShowModel(rawShow: any): Show {
  const seasons = formatShowSeasons(rawShow.seasons || []);

  return {
    id: rawShow.id,
    name: rawShow.name,
    posterPath: rawShow.poster_path,
    synopsis: rawShow.overview,
    currentlyInProduction: rawShow.in_production,
    firstAirDate: rawShow.first_air_date,
    lastAirDate: rawShow.last_air_date,
    rating: rawShow.vote_average,
    episodeRunTime: rawShow.episode_run_time,
    languages: rawShow.languages,
    genres: rawShow.genres,
    originCountry: rawShow.origin_country,
    seasons
  };
}

export function formatShowSeasons(rawShowSeasons: any[]): Season[] {
  return rawShowSeasons.map(season => ({
    id: season.id,
    name: season.name,
    posterPath: season.poster_path,
    airDate: season.air_date,
    episodeCount: season.episode_count,
    seasonNumber: season.season_number
  }));
}