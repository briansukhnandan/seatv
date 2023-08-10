import React, { useState } from 'react';
import Marquee from "react-fast-marquee";
import ShowPortrait from './individual/ShowPortrait';
import { Show } from '../../../../common/types/Show';
import { generateBlobAndURLFromImageData, generateNRandomShowIds } from 'util/ShowUtil';
import useApi from 'hooks/useApi';
import Api from 'api/Api';
import LoadingSpinner from 'components/misc/LoadingSpinner';

export const ShowCarousel = () => {
  const [ randomShows, setRandomShows ] = useState<Partial<Show>[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const generateRandomShows = async(api: Api) => {
    const ids = generateNRandomShowIds(15);
    const showMetadata: Record<string, Partial<Show>> = await api.getMultipleTVShowMetadataByTVIDs(ids);
    const shows = Object.values(showMetadata).filter(show => !!show?.name && !!show?.id);

    const modifiedData: Partial<Show>[] = [];
    shows.forEach(async(show) => {
      const newShow = await generateBlobAndURLFromImageData(show);
      modifiedData.push(newShow);
    });

    setRandomShows(modifiedData);
    setIsLoading(false);
  };

  useApi(generateRandomShows);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Marquee
      autoFill={true}
      pauseOnHover={true}
    >
      {(randomShows || []).map(show => (
        <ShowPortrait 
          key={show.name} 
          data={show} 
        />
      ))}
    </Marquee>
  );
}

export default ShowCarousel;