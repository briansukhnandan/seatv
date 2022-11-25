import React, { Component } from 'react';
import ShowCarousel from './shows/ShowCarousel';
import Api from '../api/Api';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {

  }

  render() {
    return(
      <div>
        <ShowCarousel 
          api={new Api()}
        />
      </div>
    )
  }
}