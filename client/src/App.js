import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Book from './components/Book';
import React, { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback="loading">
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/book/:id' element={<Book />} />
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
