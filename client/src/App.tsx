// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // Import dashboard
import ProtectedRoute from './components/ProtectedRoute'; // Import protected route
import BudgetPage from './pages/BudgetPage';

<Route 
  path="/budgets"
  element={<ProtectedRoute><BudgetPage /></ProtectedRoute>}
/>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        {/* Add a default route later */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;