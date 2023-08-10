import React from 'react';

import { CenteredLogo } from './misc/Logo';
import ShowCarousel from './shows/ShowCarousel';

export default function HomePage() {
  return (
    <>
      <CenteredLogo />
      <ShowCarousel />
    </>
  );
}