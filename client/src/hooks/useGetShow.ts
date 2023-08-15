import { useEffect, useMemo, useState } from "react";
import Api from "api/Api";
import { Show } from "../../../common/types/Show";
import { generateBlobAndURLFromImageData } from "util/ShowUtil";
import useApi from "./useApi";

export default function useGetShow(id?: string, callback?: (show: Show) => any) {
  const [ show, setShow ] = useState<Show>();
  const [ isLoading, setIsLoading ] = useState(true);

  useApi(async(api) => {
    if (id && !isNaN(parseInt(id))) {
      const idNumber = parseInt(id);

      let showMetadata = await api.getTVShowMetadataByTVID(idNumber);
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