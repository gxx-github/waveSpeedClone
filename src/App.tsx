import type React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ModelsPage from './pages/ModelsPage';
import ModelDetailPage from './pages/ModelDetailPage';
import Dashboard from './pages/Dashboard';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

// Main App Routes
const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/models" element={<ModelsPage />} />
        <Route path="/models/:provider/:model" element={<ModelDetailPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/collections/:collection" element={<ModelsPage />} />
        <Route path="/docs" element={<div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Documentation</h1>
          <p>API documentation coming soon...</p>
        </div>} />
        <Route path="/blog" element={<div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Blog</h1>
          <p>Blog posts coming soon...</p>
        </div>} />
        <Route path="/creators" element={<div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Creators</h1>
          <p>Creator resources coming soon...</p>
        </div>} />
        <Route path="/terms" element={<div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Terms of Service</h1>
          <p>Terms of service coming soon...</p>
        </div>} />
        <Route path="/privacy" element={<div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Privacy Policy</h1>
          <p>Privacy policy coming soon...</p>
        </div>} />
        <Route path="*" element={<div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
        </div>} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <GlobalStyles />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
