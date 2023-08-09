import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import ShowPortrait from './individual/ShowPortrait';
import { Show } from '../../../../common/types/Show';
import Api from '../../api/Api';
import { generateBlobAndURLFromImageData } from '../../util/ShowUtil';

export const ShowCarousel = ({api}: {api: Api}) => {
  const [ randomShows, setRandomShows ] = useState<Partial<Show>[]>([]);

  const generateRandomShows = async(): Promise<Partial<Show>[]> => {
    // It's unclear how many tv ids TheMovieDB houses. From minimal
    // trial and error, it seems anything past 150k DNE.
    const maxNumberToChooseFrom = 150000;
    const numShowsToFetch = 15;
    const ids = [];

    for (let i = 0; i < numShowsToFetch; i++) {
      ids.push(Math.floor(Math.random() * maxNumberToChooseFrom) + 1);
    }
    const showMetadata: Record<string, Partial<Show>> = await api.getMultipleTVShowMetadataByTVIDs(ids);
    return Object.values(showMetadata).filter(show => !!show?.name);
  }

  useEffect(() => {
    if (!randomShows.length) {
      generateRandomShows().then(data => {
        const modifiedData: Partial<Show>[] = [];
        data.forEach(async show => {
          const newShow = await generateBlobAndURLFromImageData(show);
          modifiedData.push(newShow);
        });

        setRandomShows(modifiedData);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Marquee
      autoFill={true}
      pauseOnHover={true}
    >
      {(randomShows || []).map(show => (
        <ShowPortrait 
          key={show.name} 
          api={api} 
          data={show} 
        />
      ))}
    </Marquee>
  );
}

export default ShowCarousel;