import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import HomePage from './components/HomePage';
import ShowOverview from './components/shows/individual/ShowOverview';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shows/:id" element={<ShowOverview />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router;