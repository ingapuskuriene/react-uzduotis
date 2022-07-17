import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Toolbar from './components/Toolbar';
import AllConversationsPage from './pages/AllConversationsPage';
import AllUsersPage from './pages/AllUsersPage';
import SingleUserPage from './pages/SingleUserPage';
import SingleConversationPage from './pages/SingleConversationPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toolbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/all-users" element={<AllUsersPage />} />
          <Route path="/user/:id" element={<SingleUserPage />} />
          <Route path="/conversations" element={<AllConversationsPage />} />
          <Route
            path="/conversation/:id"
            element={<SingleConversationPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
