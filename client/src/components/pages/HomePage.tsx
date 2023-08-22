import React from 'react';

import ShowCarousel from 'components/shows/ShowCarousel';
import GeneralPageTemplate from 'components/templates/GeneralPageTemplate';

const HomePage = () => (
  <GeneralPageTemplate>
    <ShowCarousel />
  </GeneralPageTemplate>
);

export default HomePage;