import React from 'react';

import ShowCarousel from 'components/shows/ShowCarousel';
import GeneralPageTemplate from 'components/templates/GeneralPageTemplate';
import ShowSearchBar from 'components/misc/ShowSearchBar';

const HomePage = () => (
  <GeneralPageTemplate>
    <ShowCarousel />
  </GeneralPageTemplate>
);

export default HomePage;