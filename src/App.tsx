import type React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/Layout';
import { ToastProvider } from './components/Toast';
import HomePage from './pages/HomePage';
import ModelsPage from './pages/ModelsPage';
import ModelDetailPage from './pages/ModelDetailPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import OAuthCallback from './pages/OAuthCallback';
import ApiKeysPage from './pages/ApiKeysPage';
import BillingPage from './pages/BillingPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated', isAuthenticated);
  return <>{children}</>
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Main App Routes
const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/models" element={<ModelsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
        <Route path="/auth/google/callback" element={<OAuthCallback />} />
        <Route path="/models/:provider/:model" element={<ModelDetailPage />} />
        <Route path="/models/:provider/:model/:subtype" element={<ModelDetailPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/api-keys" element={
          <ProtectedRoute>
            <ApiKeysPage />
          </ProtectedRoute>
        } />
        <Route path="/billing" element={
          <ProtectedRoute>
            <BillingPage />
          </ProtectedRoute>
        } />
        <Route path="/collections/:collection" element={<ModelsPage />} />
        <Route path="/docs" element={<div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Documentation</h1>
          <p>API documentation coming soon...</p>
        </div>} />
        <Route path="/creators" element={<div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Creators</h1>
          <p>Creator resources coming soon...</p>
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
    <Router>
      <GlobalStyles />
      <AppRoutes />
    </Router>
  );
};

export default App;
