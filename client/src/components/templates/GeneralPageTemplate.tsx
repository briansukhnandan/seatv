import React from "react";
import Logo from "./Logo";
import { Box, HStack, Stack, StackDivider, VStack } from "@chakra-ui/react";
import ShowSearchBar from "components/misc/ShowSearchBar";

const GeneralPageTemplate = ({children}: {children: React.ReactNode}) => {
  return (
    <Box margin={"10"}>
      <Stack
        divider={<StackDivider borderColor='teal.400' />}
        spacing={6}
      >
        <HStack spacing="12">
          <Box justifyContent={"start"}>
            <Logo />
          </Box>
          <Box justifyContent={"center"}>
            <ShowSearchBar />
          </Box>
        </HStack>
        <>{ children }</>
      </Stack>
    </Box>
  );
}

export default GeneralPageTemplate;