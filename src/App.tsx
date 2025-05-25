import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route
          path="/" 
          element={<Dashboard />}
          // element={
          //   isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          // }
        />
      </Routes>
    </Router>
  );

  return null;  // This will never be reached since we're using Routes above
}

export default App;