import React, { useState } from "react";
import { Box, Container, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "components/misc/LoadingSpinner";
import GeneralPageTemplate from "components/templates/GeneralPageTemplate";
import { VStack } from '@chakra-ui/react';

import { Show } from "../../../../common/types/Show";
import GenreDisplay from "../shows/individual/GenreDisplay";
import SynopsisDisplay from "../shows/individual/SynopsisDisplay";
import useGetShowById from "hooks/useGetShowById";
import { validateIdInUrl } from "util/ResponseUtil";

const ShowOverview = () => {
  const { id } = useParams();
  const [show, setShow] = useState<Partial<Show>>({});
  const [isLoading, setIsLoading] = useState(true);

  const validatedId = validateIdInUrl(id as string);

  useGetShowById(validatedId, (show) => {
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
                    <Box fontSize={"3xl"}>
                      Rating: {show?.rating?.toFixed(1)}
                    </Box>
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