export default class Api {
  /*
    General function for making a request to some endpoint
    endpoint - URL on the backend to make request.
    data (optional) - For passing in data on POST request
  */
  async makeGETApiRequest(endpoint) {
    return await fetch(endpoint, {
      method: 'GET',
      mode: 'cors'
    });
  }

  async makePOSTApiRequest(endpoint, data) {
    const res = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return res.json();
  }

  /////////////////////////////////////////
  // TMDB Search by ID wrapper functions //
  /////////////////////////////////////////
  async getTVShowMetadataByTVID(id) {
    const metaData = await this.makeGETApiRequest(`/api/tv/${id}`);
    return await metaData.json();
  }

  async getSimilarTVShowsByTVID(id) {
    const metaData = await this.makeGETApiRequest(`/api/tv/${id}/similar`);
    return await metaData.json();
  }

  async getRecommendationsByTVID(id) {
    const metaData = await this.makeGETApiRequest(`/api/tv/${id}/recommendations`);
    return await metaData.json();
  }

  async getReviewsByTVID(id) {
    const metaData = await this.makeGETApiRequest(`/api/tv/${id}/reviews`);
    return await metaData.json();
  }

  ////////////////////////////////////////////
  // TMDB Search by Query wrapper functions //
  ////////////////////////////////////////////
  async getTVShowMetadataByQuery(query) {
    const metaData = await this.makeGETApiRequest(`/api/search/tv/${encodeURI(query)}`);
    return await metaData.json();
  }
}