// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ViewItems from './pages/ViewItems';
import AddItem from './pages/AddItem';

function App() {
  return (
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ViewItems />} />
            <Route path="/add" element={<AddItem />} />
          </Routes>
        </main>
      </Router>
  );
}

export default App;
