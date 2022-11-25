export default class Api {
  /*
    General function for making a request to some endpoint
    endpoint - URL on the backend to make request.
    params - Extra stuff we want to pass on (e.g. id, name, etc.). Pass in as a Javascript obj.
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

  /*
    Wrapper functions to interact with the
    Express backend. 
  */
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
}