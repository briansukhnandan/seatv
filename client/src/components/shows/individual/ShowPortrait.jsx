import React, { Component } from 'react';

export default class ShowPortrait extends Component {
  constructor(props) {
    super(props);
  }
  
  async componentDidMount() {
    const api = new Api();

    console.log('hi');
    const metaData = await api.getTVShowMetadataByTVID(10);
    console.log(metaData);
  }

  render() {
    return (
      <div>Test123</div>
    )
  }
}