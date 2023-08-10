import React from 'react';
import { Show } from '../../../../../common/types/Show';
import { Link } from 'react-router-dom';

export const ShowPortrait = ({data}: {data: Partial<Show>}) => {
  const IMG_HEIGHT = 200;
  const IMG_WIDTH = 150;

  const DEFAULT_IMAGE_PATH = "/image/missing_image.jpg";
  const DEFAULT_IMAGE_SOURCE = data?.imageURL || DEFAULT_IMAGE_PATH;
  const DEFAULT_NAME = !!data?.name && data?.name?.length > 20
    ? `${data.name?.slice(0, 20)}...`
    : data.name;

  const BORDER_STYLING = {
    border: "solid", 
    borderColor: "black",
    padding: "1rem",
    borderRadius: "15px"
  };

  return (
    <div style={{paddingRight: "15px"}}>
      <div style={BORDER_STYLING}>
        <div style={{textAlign: "center"}}>
          <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{paddingBottom: "8px"}}>
              {DEFAULT_NAME}
            </div>
            <Link to={`/shows/${data.id}`}>
              <img 
                alt={data.name} 
                src={DEFAULT_IMAGE_SOURCE}
                style={{
                  height: IMG_HEIGHT,
                  width: IMG_WIDTH
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowPortrait;