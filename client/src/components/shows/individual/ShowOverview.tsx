import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Show } from "../../../../../common/types/Show";
import useApi from "../../../hooks/useApi";

const ShowOverview = ({id}: {id: number}) => {
  const [show, setShow] = useState<Partial<Show>>();
  useApi(async(api) => {
    const showMetadata = await api.getTVShowMetadataByTVID(id);
    setShow(showMetadata);
  });

  return (
    <Box>Show Overview</Box>
  )
}

export default ShowOverview;