import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Show } from "../../../../../common/types/Show";
import useApi from "../../../hooks/useApi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../misc/LoadingSpinner";

const ShowOverview = () => {
  const { id } = useParams();
  const [show, setShow] = useState<Partial<Show>>();
  const [isLoading, setIsLoading] = useState(true);

  useApi(async(api) => {
    if (id && !isNaN(parseInt(id))) {
      const idNumber = parseInt(id);
      const showMetadata = await api.getTVShowMetadataByTVID(idNumber);
      setShow(showMetadata);
      setIsLoading(false);
    }
  });

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Box>{show?.name}</Box>
  );
}

export default ShowOverview;