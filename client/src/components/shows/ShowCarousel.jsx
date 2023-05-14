import React, { useEffect, useState } from 'react';
import ShowPortrait from './individual/ShowPortrait';

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
    console.log(ids);
    const showMetadata = await api.getMultipleTVShowMetadataByTVIDs(ids);

    return Object.values(showMetadata).filter(show => !!show?.name);
  }

  useEffect(() => {
    const generatedShowMetadata = generateRandomShows().then(data => {
      setRandomShows(data);
    });
  }, []);

  // console.log('loaded showcarousel');
  console.log(randomShows);

  return (
    <>
      {(randomShows || []).map(show => (
          <ShowPortrait 
            key={show.name} 
            api={api} 
            data={show} 
          />
        )
      )}
    </>
  )
}

export default ShowCarousel;