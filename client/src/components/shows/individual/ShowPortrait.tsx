import React from 'react';
import { Show } from '../../../../../common/types/Show';
import { Link } from 'react-router-dom';

export const ShowPortrait = ({data}: {data: Partial<Show>}) => {
  const IMG_HEIGHT = 200;
  const IMG_WIDTH = 150;

  const DEFAULT_NAME_LENGTH = 15;
  const DEFAULT_NAME = !!data?.name && data?.name?.length > DEFAULT_NAME_LENGTH
    ? `${data.name?.slice(0, DEFAULT_NAME_LENGTH)}...`
    : data.name;

  const BORDER_STYLING: React.CSSProperties = {
    border: "solid", 
    borderColor: "black",
    padding: "0.1rem",
    borderWidth: "1px",
    boxShadow: "5px 5px 10px black"
  };

  return (
    <div style={{paddingRight: "15px"}}>
      <div style={{textAlign: "center"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{paddingBottom: "8px"}}>
            {DEFAULT_NAME}
          </div>
          <div style={BORDER_STYLING}>
            <Link to={`/shows/${data.id}`}>
              <img 
                alt={data.name} 
                src={data.imageURL}
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