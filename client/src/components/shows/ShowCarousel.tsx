import React, { useEffect, useState } from 'react';
import ShowPortrait from './individual/ShowPortrait';
import { Show } from '../../../../common/types/Show';
import Api from '../../api/Api';

export const ShowCarousel = ({api}: {api: Api}) => {
  const [ randomShows, setRandomShows ] = useState<Partial<Show>[]>([]);

  const generateRandomShows = async(): Promise<Partial<Show>[]> => {
    // It's unclear how many tv ids TheMovieDB houses. From minimal
    // trial and error, it seems anything past 150k DNE.
    const maxNumberToChooseFrom = 150000;
    const numShowsToFetch = 10;
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
        const modifiedData = data.slice();
        modifiedData.forEach(show => {

          // Not every show retrieved has imageData
          if (show?.imageData) {
            show.imageBlob = new Blob([new Uint8Array(show.imageData).buffer])
            show.imageURL = URL.createObjectURL(show.imageBlob);
          }
        });

        setRandomShows(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      {(randomShows || []).map(show => (
        <ShowPortrait 
          key={show.name} 
          api={api} 
          data={show} 
        />
      ))}
    </div>
  );
}

export default ShowCarousel;