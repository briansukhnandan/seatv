import React, { Component } from 'react';
import Api from '../api/Api';

export default class ShowPortrait extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const api = new Api();
    const metaData = await api.getTVShowMetadataByTVID(5);
    console.log(metaData);
  }

  render() {
    return(
      <div>Test123</div>
    )
  }

}