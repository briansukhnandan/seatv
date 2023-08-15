import { Box, Center } from "@chakra-ui/react";
import React from "react";
import { Show } from "../../../../../common/types/Show";

const GenreDisplay = ({show}: {show: Partial<Show>}) => (
  <>
    <Box fontSize={"2xl"}>Genres:</Box>
    <Box>
      { show?.genres?.length
        ? (
          show.genres.map(genre => <Center key={genre.name}>{genre.name}</Center>)
        )
        : <>{"No Genres to display!"}</>
      }
    </Box>
  </>
);

export default GenreDisplay;