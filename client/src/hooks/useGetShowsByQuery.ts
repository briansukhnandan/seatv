import { useState } from "react";
import { Show } from "../../../common/types/Show";
import { generateBlobAndURLFromImageData } from "util/ShowUtil";
import useApi from "./useApi";

export default function useGetShowsByQuery(query?: string, callback?: (shows: Show[]) => any) {
  const [ shows, setShows ] = useState<Show[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useApi(async(api) => {
    if (query) {
      const showQueryData = await api.getTVShowMetadataByQuery(query);

      const showsWithImageData = [];
      for (const show of showQueryData) {
        let showMetadata = {...show};
        showMetadata = await generateBlobAndURLFromImageData(showMetadata);
        showsWithImageData.push(showMetadata);
      }

      setShows(showsWithImageData);
      setIsLoading(false);

      if (callback) {
        callback(showsWithImageData);
      }
    }
  });

  if (!query) {
    return null;
  }

  return { shows, isLoading };
}