import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Reset } from 'styled-reset';
import DepartmentList from './pages/DepartmentList';
import Story from './pages/Story';

function App() {
  return (
    <div>
      <Reset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/department-list" element={<DepartmentList />} />
        {/* <Route path="/mypage" element={<Mypage />} /> */}
        <Route path="/story" element={<Story />} />
      </Routes>
    </div>
  );
}

export default App;
