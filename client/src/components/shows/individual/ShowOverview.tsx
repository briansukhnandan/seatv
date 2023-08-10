import React, { useState } from "react";
import { Box, Center } from "@chakra-ui/react";
import { Show } from "../../../../../common/types/Show";
import useApi from "../../../hooks/useApi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../misc/LoadingSpinner";
import GeneralPageTemplate from "../../misc/GeneralPageTemplate";
import { generateBlobAndURLFromImageData } from "../../../util/ShowUtil";
import { SimpleGrid, VStack } from '@chakra-ui/react'

const ShowOverview = () => {
  const { id } = useParams();
  const [show, setShow] = useState<Partial<Show>>();
  const [isLoading, setIsLoading] = useState(true);

  useApi(async(api) => {
    if (id && !isNaN(parseInt(id))) {
      const idNumber = parseInt(id);

      let showMetadata = await api.getTVShowMetadataByTVID(idNumber);
      showMetadata = await generateBlobAndURLFromImageData(showMetadata);
      
      setShow(showMetadata);
      setIsLoading(false);
    }
  });

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <GeneralPageTemplate>
      <Box margin={6}>
        <SimpleGrid columns={3} spacing={4}>
          <Center>        
            <img 
              alt={show?.name} 
              src={show?.imageURL}
              style={{ maxHeight: "500px" }}
            />
          </Center>
          <Box>
            <VStack>
              <Box>{show?.name}</Box>
              <Box>Rating: {show?.rating}</Box>
            </VStack>
          </Box>
          <Box>
            <VStack>
              <Box>Synopsis:</Box>
              <Box>{show?.synopsis || "No synopsis available!"}</Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </GeneralPageTemplate>
  );
}

export default ShowOverview;