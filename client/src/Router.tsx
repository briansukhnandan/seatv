import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import HomePage from './components/HomePage';
import ShowOverview from './components/shows/individual/ShowOverview';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shows/:id" element={<ShowOverview />} />
    </Routes>
  </BrowserRouter>
);

export default Router;