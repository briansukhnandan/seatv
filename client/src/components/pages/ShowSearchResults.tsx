import GeneralPageTemplate from "components/templates/GeneralPageTemplate";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Show } from "../../../../common/types/Show";
import useGetShowsByQuery from "hooks/useGetShowsByQuery";
import { Box, HStack, VStack } from "@chakra-ui/react";
import ShowPortrait from "components/shows/individual/ShowPortrait";
import LoadingSpinner from "components/misc/LoadingSpinner";
import SynopsisDisplay from "components/shows/individual/SynopsisDisplay";

const ShowSearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useGetShowsByQuery(query, (shows) => {
    setSearchResults(shows);
    setIsLoading(false);
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <GeneralPageTemplate>
      <VStack spacing={"12"} alignItems={"start"}>
        {
          searchResults.map(show => {
            return (
              <Box key={show.id}>
                <HStack>
                  <div>
                    <ShowPortrait data={show} />
                  </div>
                  <div style={{maxWidth: "800px", maxHeight: "150px"}}>
                    <SynopsisDisplay show={show} />
                  </div>
                </HStack>
              </Box>
            );
          })
        }
      </VStack>
    </GeneralPageTemplate>
  );
}

export default ShowSearchResults;