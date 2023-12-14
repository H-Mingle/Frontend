import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Reset } from 'styled-reset';
import DepartmentList from './pages/DepartmentList';
import Story from './pages/Story';
import MyPage from './pages/MyPage';
import Auth from './pages/Auth';
import Edit from './pages/Edit';
import Feed from './pages/Feed';
import NotFound from './components/Common/NotFound';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Common/PrivateRoute';
import React from 'react';

function App() {
  return (
    <AuthProvider>
      <Reset /> {/* style reset */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/department-list" element={<DepartmentList />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route path="/story/:id" element={<Story />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
