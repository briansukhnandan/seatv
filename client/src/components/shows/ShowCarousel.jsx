import React, { Component } from 'react';
import ShowPortrait from './individual/ShowPortrait';

export default class ShowCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shows: []
    }
  }

  async componentDidMount() {
    
  }

  render() {
    return(
      <>
        <ShowPortrait 
          api={this.props.api}
        />
      </>
    )
  }

}