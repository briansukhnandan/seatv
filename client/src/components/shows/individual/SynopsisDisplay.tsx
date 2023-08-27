import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { Show } from "../../../../../common/types/Show";

const SynopsisDisplay = ({show}: {show: Partial<Show>}) => {
  return (
    <>
      <VStack>
      <Box fontSize={"3xl"}>Synopsis:</Box>
      <Box>{show?.synopsis || "No synopsis available!"}</Box>
      </VStack>
    </>
  );
}

export default SynopsisDisplay;