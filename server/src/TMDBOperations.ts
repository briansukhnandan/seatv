import { Show } from '../../common/types/Show';

export function formatRawDataIntoShowModel(rawShow: any): Show {
  return {
    name: rawShow.name,
    posterPath: rawShow.poster_path
  };
}