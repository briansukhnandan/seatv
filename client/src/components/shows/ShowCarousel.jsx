import React, { Component } from 'react';
import ShowPortrait from './individual/ShowPortrait';
import { isTheMovieDBApiResponseValid } from '../../util/response';

export default class ShowCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      generatedShowMetadata: []
    }
  }

  async generateRandomShowIds() {
    // It's unclear how many tv ids TheMovieDB houses. From minimal
    // trial and error, it seems anything past 150k DNE.
    const maxNumberToChooseFrom = 150000;
    const numShowsToFetch = 10;

    const generatedShowMetadata = [];
    while (generatedShowMetadata.length < numShowsToFetch) {
      const metaData = await (this.props.api).getTVShowMetadataByTVID(Math.floor(Math.random() * maxNumberToChooseFrom) + 1);

      if (isTheMovieDBApiResponseValid(metaData)) {
        generatedShowMetadata.push({
          name: metaData.name,
          posterPath: metaData.poster_path
        });
      }
    }

    return generatedShowMetadata;
  }

  async componentDidMount() {
    const generatedShowMetadata = await this.generateRandomShowIds();
    this.setState({ generatedShowMetadata });
  }

  render() {
    return(
      <>
        { this.state.generatedShowMetadata.map(show => <ShowPortrait key={show.name} api={this.props.api} data={show} />) }
      </>
    )
  }

}