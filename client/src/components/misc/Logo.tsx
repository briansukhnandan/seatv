import React from "react";

const Logo = ({style}: {style?: React.CSSProperties}) => {
  const IMG_HEIGHT = 200;
  const IMG_WIDTH = 300;

  const DEFAULT_IMAGE_SOURCE = "/image/tvboxlogogh.png";
  const DEFAULT_STYLE = style || {
    paddingBottom: "10px",
    textAlign: "center"
  };

  return (
    <div style={DEFAULT_STYLE}>
      <img 
        alt="logo"
        src={DEFAULT_IMAGE_SOURCE}
        height={IMG_HEIGHT}
        width={IMG_WIDTH}
      />
    </div>
  )
}

export default Logo;