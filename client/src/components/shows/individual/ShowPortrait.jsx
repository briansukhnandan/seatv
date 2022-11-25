import React, { Component } from 'react';

export default class ShowPortrait extends Component {
  constructor(props) {
    super(props);
  }
  
  async componentDidMount() {
    const metaData = await (this.props.api).getTVShowMetadataByTVID(5);
    console.log(metaData);
  }

  render() {
    return (
      <div>Test123</div>
    )
  }
}