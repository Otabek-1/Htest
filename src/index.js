import ReactDOM from 'react-dom/client';
import "./input.css";
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './Login';
import Dashboard from './Components/User/Dashboard';
import TestPage from './Components/User/TestPage';
import ResultPage from './Components/User/ResultPage';
import GlobalResults from './Components/User/GlobalResults';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Content from './Components/User/Content';
import CreatePost from './Components/Admin/CreatePost';
import AdminTests from './Components/Admin/AdminTests';
import CreateTest from './Components/Admin/Create-test';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/enter" element={<Auth />} />
      <Route path='/main' element={<Dashboard />} />
      <Route path='/test' element={<TestPage />} />
      <Route path='/result' element={<ResultPage />}/>
      <Route path='/public-results' element={<GlobalResults />}/>
      <Route path='/show/:article' element={<Content />}/>

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path='/create-post' element={<CreatePost />}/>
      <Route path='/create-test' element={<CreateTest />} />
    </Routes>
  </BrowserRouter>
);
