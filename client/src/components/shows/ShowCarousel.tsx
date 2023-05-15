import React, { useEffect, useState } from 'react';
import ShowPortrait from './individual/ShowPortrait';
import { Show } from '../../../../common/types/Show';

export const ShowCarousel = ({api}) => {
  const [ randomShows, setRandomShows ] = useState([]);

  const generateRandomShows = async() => {
    // It's unclear how many tv ids TheMovieDB houses. From minimal
    // trial and error, it seems anything past 150k DNE.
    const maxNumberToChooseFrom = 150000;
    const numShowsToFetch = 10;
    const ids = [];

    for (let i = 0; i < numShowsToFetch; i++) {
      ids.push(Math.floor(Math.random() * maxNumberToChooseFrom) + 1);
    }
    const showMetadata: Record<string, Show> = await api.getMultipleTVShowMetadataByTVIDs(ids);

    return Object.values(showMetadata).filter(show => !!show?.name);
  }

  useEffect(() => {
    generateRandomShows().then(data => {
      setRandomShows(data);
    });
  }, []);

  console.log(randomShows);

  return (
    <>
      {(randomShows || []).map(show => (
        <ShowPortrait 
          key={show.id} 
          api={api} 
          data={show} 
        />
      ))}
    </>
  )
}

export default ShowCarousel;