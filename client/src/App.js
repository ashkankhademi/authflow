// Import necessary tools from React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your LoginPage component from the pages folder
import LoginPage from './pages/LoginPage';

// This is your main App component
function App() {
  return (
    // Set up the router to handle page navigation
    <Router>
      {/* Define all your page routes here */}
      <Routes>

        {/* Route for the login page */}
        {/* If user visits http://localhost:3000/login → show <LoginPage /> */}
        <Route path="/login" element={<LoginPage />} />

        {/* Later, you can add more routes here, like register or dashboard */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

      </Routes>
    </Router>
  );
}

// Export this component so it can be loaded in index.js
export default App;
