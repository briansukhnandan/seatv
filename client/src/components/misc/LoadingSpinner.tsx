import React from "react";
import { Box, Spinner } from '@chakra-ui/react'

const LoadingSpinner = () => {
  return (
    <Box textAlign={"center"}>
      <Spinner size='xl'/>
    </Box>
  );
}

export default LoadingSpinner;