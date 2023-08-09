import React from 'react';
import ShowCarousel from './shows/ShowCarousel';
import Api from '../api/Api';
import Logo from './misc/Logo';

export default function HomePage() {
  return (
    <>
      <Logo />
      <ShowCarousel 
        api={new Api()}
      />
    </>
  );
}