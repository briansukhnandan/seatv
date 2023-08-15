import { Show } from "../../../common/types/Show";
import { getImageBlobFromTVShowPosterPath } from "../api/theMovieDB";
import { formatRawDataIntoShowModel } from "../TMDBOperations";

export async function handleShowFormattingFromApiResult(rawShow: any): Promise<Show> {
  let showToFormat = {...rawShow};

  if (showToFormat?.id && showToFormat?.name) {
    showToFormat = formatRawDataIntoShowModel(showToFormat);

    // Not always guaranteed
    if (showToFormat?.posterPath) {
      const imageBlob = await getImageBlobFromTVShowPosterPath(showToFormat.posterPath, "w500")
      const imageData = [...new Uint8Array(await imageBlob.arrayBuffer())];
      
      /**
       * Opting to only send over JSON data when fetching
       * metadata to not be entangled in a bunch of different
       * data types.
       */
      showToFormat = {
        ...showToFormat,
        imageData
      };
    }
    
    return showToFormat;
  }

  return null;
}