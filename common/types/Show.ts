export interface Show {
  id: number,
  name: string,
  posterPath: string,
  synopsis: string,
  currentlyInProduction: boolean,
  firstAirDate: string,
  lastAirDate: string,
  rating: number, /* Represented as a float out of 10.0 */
  episodeRunTime: number[],
  languages: string[], /* e.g. ['en'] */
  genres: Genre[],
  originCountry: string[],

  /**
   * Related to image data that may come along.
   * `imageData` is generated on the server-side,
   * while `imageBlob` and `imageURL` are generated
   * on the client-side.
   */
  imageData?: number[],
  imageBlob?: Blob,
  imageURL?: string
}

export interface Genre {
  id: number,
  name: string
}