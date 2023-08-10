import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import ShowPortrait from './individual/ShowPortrait';
import { Show } from '../../../../common/types/Show';
import { generateBlobAndURLFromImageData } from '../../util/ShowUtil';
import useApi from '../../hooks/useApi';

export const ShowCarousel = () => {
  const [ randomShows, setRandomShows ] = useState<Partial<Show>[]>([]);
  const { api, data } = useApi(async(api) => {
    // It's unclear how many tv ids TheMovieDB houses. From minimal
    // trial and error, it seems anything past 150k DNE.
    const maxNumberToChooseFrom = 150000;
    const numShowsToFetch = 15;
    const ids = [];

    for (let i = 0; i < numShowsToFetch; i++) {
      ids.push(Math.floor(Math.random() * maxNumberToChooseFrom) + 1);
    }
    const showMetadata: Record<string, Partial<Show>> = await api.getMultipleTVShowMetadataByTVIDs(ids);
    const shows = Object.values(showMetadata).filter(show => !!show?.name);

    const modifiedData: Partial<Show>[] = [];
    shows.forEach(async show => {
      const newShow = await generateBlobAndURLFromImageData(show);
      modifiedData.push(newShow);
    });

    setRandomShows(modifiedData);
  });

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