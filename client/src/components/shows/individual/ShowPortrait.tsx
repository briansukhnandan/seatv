import React from 'react';
import { Show } from '../../../../../common/types/Show';
import Api from '../../../api/Api';

export const ShowPortrait = ({
  data, 
  api
}: {
  data: Partial<Show>, 
  api: Api
}) => {
  const IMG_HEIGHT = 200;
  const IMG_WIDTH = 150;

  const DEFAULT_IMAGE_PATH = "/image/missing_image.jpg";

  return (
    <div>
      <div style={{border: "solid"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          {data.name}
          { data?.imageURL 
            ? (
              <img 
                alt={data.name} 
                src={data.imageURL}
                height={IMG_HEIGHT}
                width={IMG_WIDTH}
              />
            ) : (
              <img 
                alt={data.name} 
                src={DEFAULT_IMAGE_PATH}
                height={IMG_HEIGHT}
                width={IMG_WIDTH}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default ShowPortrait;