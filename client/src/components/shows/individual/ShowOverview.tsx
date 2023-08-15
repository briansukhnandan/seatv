import React, { useState } from "react";
import { Box, Center, Container, HStack } from "@chakra-ui/react";
import useApi from "hooks/useApi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "components/misc/LoadingSpinner";
import GeneralPageTemplate from "components/templates/GeneralPageTemplate";
import { generateBlobAndURLFromImageData } from "util/ShowUtil";
import { VStack } from '@chakra-ui/react';

import { Show } from "../../../../../common/types/Show";
import GenreDisplay from "./GenreDisplay";
import SynopsisDisplay from "./SynopsisDisplay";
import useGetShow from "hooks/useGetShow";

const ShowOverview = () => {
  const { id } = useParams();
  const [show, setShow] = useState<Partial<Show>>({});
  const [isLoading, setIsLoading] = useState(true);

  useGetShow(id, (show) => {
    setShow(show);
    setIsLoading(false);
  });

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <GeneralPageTemplate>
      <Box margin={6}>
        <HStack spacing={"24"}>
          <Container>
            <Box>
              <VStack>
                <Box>      
                  <img 
                    alt={show?.name} 
                    src={show?.imageURL}
                  />
                </Box>
                <Box>
                  <VStack>
                    <Box 
                      fontSize={"4xl"} 
                      fontWeight={"bold"}
                    >
                      {show?.name}
                    </Box>
                    <Box fontSize={"3xl"}>Rating: {show?.rating?.toFixed(1)}</Box>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </Container>
          <Container>
            <Box>
              <VStack>
                <SynopsisDisplay show={show}/>
                <GenreDisplay show={show}/>
              </VStack>
            </Box>
          </Container>
        </HStack>
      </Box>
    </GeneralPageTemplate>
  );
}

export default ShowOverview;