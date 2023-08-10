import React from 'react';

import Logo, { CenteredLogo } from './misc/Logo';
import ShowCarousel from './shows/ShowCarousel';

export default function HomePage() {
  return (
    <>
      <CenteredLogo />
      <ShowCarousel />
    </>
  );
}