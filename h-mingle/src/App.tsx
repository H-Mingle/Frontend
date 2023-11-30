import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Reset } from 'styled-reset';
import DepartmentList from './pages/DepartmentList';
import Story from './pages/Story';
import MyPage from './pages/MyPage';
import Auth from './pages/Auth';

function App() {
  return (
    <div>
      <Reset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/department-list" element={<DepartmentList />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/story" element={<Story />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
