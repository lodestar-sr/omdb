import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  
  return (
    <Fragment>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/movie-details/:title' element={<MovieDetails/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;