import { useState } from "react";
import { Show } from "../../../common/types/Show";
import { generateBlobAndURLFromImageData } from "util/ShowUtil";
import useApi from "./useApi";

export default function useGetShowById(id?: number, callback?: (show: Show) => any) {
  const [ show, setShow ] = useState<Show>();
  const [ isLoading, setIsLoading ] = useState(true);

  useApi(async(api) => {
    if (id && !isNaN(id)) {
      let showMetadata = await api.getTVShowMetadataByTVID(id);
      showMetadata = await generateBlobAndURLFromImageData(showMetadata);
      
      setShow(showMetadata);
      setIsLoading(false);

      if (callback) {
        callback(showMetadata);
      }
    }
  });

  if (!id) {
    return null;
  }

  return { show, isLoading };
}