import React from 'react';
import ShowCarousel from './shows/ShowCarousel';
import Api from '../api/Api';

export default function HomePage() {
  return (
    <>
      <ShowCarousel 
        api={new Api()}
      />
    </>
  );
}