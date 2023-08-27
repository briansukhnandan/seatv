import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import HomePage from 'components/pages/HomePage';
import ShowOverview from 'components/pages/ShowOverview';
import ShowSearchResults from 'components/pages/ShowSearchResults';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shows/:id" element={<ShowOverview />} />
      <Route path="/shows/search/:query" element={<ShowSearchResults />} />
    </Routes>
  </BrowserRouter>
);

export default Router;