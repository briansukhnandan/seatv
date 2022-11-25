import React, { Component } from 'react';

export default class ShowPortrait extends Component {
  constructor(props) {
    super(props);
  }
  
  async componentDidMount() {
  }

  render() {
    return (
      <div>{this.props.data.name}</div>
    )
  }
}