import React from "react";
import Logo from "./Logo";
import { Box, StackDivider, VStack } from "@chakra-ui/react";

const GeneralPageTemplate = ({children}: {children: React.ReactNode}) => {
  return (
    <Box margin={"10"}>
      <VStack
        divider={<StackDivider borderColor='teal.400' />}
        spacing={6}
      >
        <Logo />
        <Box>{ children }</Box>
      </VStack>
    </Box>
  );
}

export default GeneralPageTemplate;