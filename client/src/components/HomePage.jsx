import React, { Component } from 'react';
import ShowCarousel from './shows/ShowCarousel';

export default class HomePage extends Component {

  async componentDidMount() {

  }

  render() {
    return(
      <div>
        <ShowCarousel />
      </div>
    )
  }
}