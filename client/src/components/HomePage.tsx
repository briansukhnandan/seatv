import React from 'react';

import { CenteredLogo } from './misc/Logo';
import ShowCarousel from './shows/ShowCarousel';
import GeneralPageTemplate from './misc/GeneralPageTemplate';

const HomePage = () => (
  <GeneralPageTemplate>
    <ShowCarousel />
  </GeneralPageTemplate>
);

export default HomePage;