import dotenv from 'dotenv';
dotenv.config({path: `${__dirname}/../../.env`})

export default class Auth {
  private theMovieDBAccessToken: string;
  private theMovieDBApiKey: string;

  constructor() {
    this.theMovieDBAccessToken = process.env.THEMOVIEDB_ACCESS_TOKEN;
    this.theMovieDBApiKey = process.env.THEMOVIEDB_API_KEY;
  }

  public getTheMovieDBCredentials() {
    return {
      token:`${this.theMovieDBAccessToken}`,
      apiKey: `${this.theMovieDBApiKey}`
    };
  }
}