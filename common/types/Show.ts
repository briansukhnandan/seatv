export interface Show {
  name: string,
  posterPath: string,

  /**
   * Related to image data that may come along.
   * `imageData` is generated on the server side.
   */
  imageData?: number[],
  imageBlob?: Blob,
  imageURL?: string
}