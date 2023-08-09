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
 */
export async function generateBlobAndURLFromImageData(show: Partial<Show>): Promise<Partial<Show>> {
  const newShow = {...show};
  
  // Not every show retrieved has imageData
  if (show?.imageData) {
    newShow.imageBlob = new Blob([new Uint8Array(show.imageData).buffer])
    newShow.imageURL = URL.createObjectURL(newShow.imageBlob);
  }

  return newShow;
}