import React, { Component } from 'react';
import ShowPortrait from './individual/ShowPortrait';

export default class ShowCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      generatedShowMetadata: []
    }
  }

  async generateRandomShows() {
    // It's unclear how many tv ids TheMovieDB houses. From minimal
    // trial and error, it seems anything past 150k DNE.
    const maxNumberToChooseFrom = 150000;
    const numShowsToFetch = 10;
    const ids = [];

    for (let i = 0; i < numShowsToFetch; i++) {
      ids.push(Math.floor(Math.random() * maxNumberToChooseFrom) + 1);
    }
    const showMetadata = await (this.props.api).getMultipleTVShowMetadataByTVIDs(ids);

    return Object.values(showMetadata);
  }

  async componentDidMount() {
    const generatedShowMetadata = await this.generateRandomShows();
    this.setState({ generatedShowMetadata });

    //const multi = await (this.props.api).getMultipleTVShowMetadataByTVIDs()
  }

  render() {
    return(
      <>
        { this.state.generatedShowMetadata.map(show => <ShowPortrait key={show.name} api={this.props.api} data={show} />) }
      </>
    )
  }
}