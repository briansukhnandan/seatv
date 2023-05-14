export default class Api {
  /*
    General function for making a request to some endpoint
    endpoint - URL on the backend to make request.
    data (optional) - For passing in data on POST request
  */
  async makeGETApiRequest(endpoint: string) {
    return await fetch(endpoint, {
      method: 'GET',
      mode: 'cors'
    });
  }

  async makePOSTApiRequest(endpoint: string, data: any) {
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

  ////////////////////////////////////////////
  // TMDB Search by ID wrapper GET requests //
  ////////////////////////////////////////////
  async getTVShowMetadataByTVID(id: number) {
    const metaData = await this.makeGETApiRequest(`/api/tv/${id}`);
    return await metaData.json();
  }

  async getSimilarTVShowsByTVID(id: number) {
    const metaData = await this.makeGETApiRequest(`/api/tv/${id}/similar`);
    return await metaData.json();
  }

  async getRecommendationsByTVID(id: number) {
    const metaData = await this.makeGETApiRequest(`/api/tv/${id}/recommendations`);
    return await metaData.json();
  }

  async getReviewsByTVID(id: number) {
    const metaData = await this.makeGETApiRequest(`/api/tv/${id}/reviews`);
    return await metaData.json();
  }

  ////////////////////////////////////
  // TMDB Search by ID RPC requests //
  ////////////////////////////////////
  async getMultipleTVShowMetadataByTVIDs(ids: number[]) {
    const metaData = await this.makePOSTApiRequest('/api/rpc/tv', {
      ids
    });

    return metaData;
  }
  

  ////////////////////////////////////////////
  // TMDB Search by Query wrapper functions //
  ////////////////////////////////////////////
  async getTVShowMetadataByQuery(query: string) {
    const metaData = await this.makeGETApiRequest(`/api/search/tv/${encodeURI(query)}`);
    return await metaData.json();
  }
}