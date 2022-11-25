import React, { Component } from 'react';

export default class ShowPortrait extends Component {
  constructor(props) {
    super(props);
  }
  
  async componentDidMount() {
    const metaData = await (this.props.api).getTVShowMetadataByTVID(5);
    console.log(metaData);

    const similar = await (this.props.api).getSimilarTVShowsByTVID(5);
    console.log(similar);

    const recommendations = await (this.props.api).getRecommendationsByTVID(5);
    console.log(recommendations);

    const reviews = await (this.props.api).getReviewsByTVID(5);
    console.log(reviews);
  }

  render() {
    return (
      <div>Test123</div>
    )
  }
}