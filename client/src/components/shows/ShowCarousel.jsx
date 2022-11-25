import React, { Component } from 'react';
import ShowPortrait from './individual/ShowPortrait';
import Api from '../../api/Api';

export default class ShowCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shows: []
    }
  }

  async componentDidMount() {
    const api = new Api();

    console.log('hi');
    const metaData = await api.getTVShowMetadataByTVID(10);
    console.log(metaData);
  }

  render() {
    return(
      <>
        <ShowPortrait />
      </>
    )
  }

}