import { AbsoluteCenter, Box, Center, Flex } from "@chakra-ui/react";
import ShowSearchBar from "components/misc/ShowSearchBar";
import React from "react";
import { Link } from "react-router-dom";

const Logo = ({style}: { style?: React.CSSProperties }) => {
  const IMG_HEIGHT = 160;
  const IMG_WIDTH = 240;

  const DEFAULT_IMAGE_SOURCE = "/image/tvboxlogogh.png";
  const DEFAULT_STYLE = style || {
    paddingBottom: "10px",
    paddingTop: "10px",
    textAlign: "center",
  };

  return (
    <Box style={DEFAULT_STYLE}>
      <Box float={"left"}>
        <Link to={`/`}>
          <img 
            alt="logo"
            src={DEFAULT_IMAGE_SOURCE}
            height={IMG_HEIGHT}
            width={IMG_WIDTH}
          />
        </Link>
      </Box>
      <Box float={"right"} transform="translateY(-50%, -50%)">
        <Center>
          <ShowSearchBar />
        </Center>
      </Box>
    </Box>
  );
}

export default Logo;

export const CenteredLogo = ({style}: { style?: React.CSSProperties }) => {
  return (
    <Center>
      <Logo style={style} />
    </Center>
  );
}