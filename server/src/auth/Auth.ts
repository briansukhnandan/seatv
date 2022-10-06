import dotenv from 'dotenv';
dotenv.config({path: `${__dirname}/../../.env`})

export default class Auth {
  traktClientID: string;
  traktClientSecret: string;

  constructor() {
    this.traktClientID = process.env.TRAKT_CLIENT_ID;
    this.traktClientSecret = process.env.TRAKT_CLIENT_SECRET;
  }
}