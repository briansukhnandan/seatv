import { Show } from "../../../common/types/Show";

/**
 * Takes in a show (presumably fetched from API) and
 * attaches an imageBlob and imageURL field on it if the
 * show has imageData.
 * 
 * With the imageURL, we can then display the image in
 * any img tag or whatever.
 * 
 * @param show Show to generate Blob and URL for.
 * @returns A new show with all prev fields + new ones attached
 */
export async function generateBlobAndURLFromImageData(show: Partial<Show>): Promise<Partial<Show>> {
  const newShow = {...show};
  
  // Not every show retrieved has imageData
  if (show?.imageData) {
    newShow.imageBlob = new Blob([new Uint8Array(show.imageData).buffer]);
    newShow.imageURL = URL.createObjectURL(newShow.imageBlob);
  } else {
    newShow.imageURL = "/image/missing_image.jpg";
  }

  return newShow;
}

/**
 * @param numToFetch Number of shows to fetch
 * @param idMax Max ID number to choose from.
 * @returns Arr of random numbers from 1 to idMax.
 */
export function generateNRandomShowIds(numToFetch: number, idMax = 150000) {
  const ids = [];
  for (let i = 0; i < numToFetch; i++) {
    ids.push(Math.floor(Math.random() * idMax) + 1);
  }
  return ids;
}