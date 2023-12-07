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

function App() {
  return (
    <div>
      <Reset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/department-list" element={<DepartmentList />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/story" element={<Story />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
