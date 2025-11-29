import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import pcteTheme from './theme/pcteTheme';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import SelfServicePortal from './components/SelfServicePortal';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import ArchitectureDiagramSVG from './components/ArchitectureDiagramSVG';
import TicketDashboard from './components/TicketDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AnalyticsPage from './components/AnalyticsPage';
import ConfigurationInterface from './components/ConfigurationInterface';
import EscalationWorkflow from './components/EscalationWorkflow';
import SystemIntegrationStatus from './components/SystemIntegrationStatus';
import ModelVersioning from './components/ModelVersioning';
import SecurityComplianceDashboard from './components/SecurityComplianceDashboard';
import DemoScriptNavigator from './components/DemoScriptNavigator';

// Role-based access control configuration
const rolePermissions = {
  'Cyber Operator': {
    allowedRoutes: ['/operator'],
    defaultRoute: '/operator',
  },
  'Training Manager': {
    allowedRoutes: ['/operator', '/manager', '/analytics', '/analytics-legacy', '/escalation', '/architecture', '/architecture-svg'],
    defaultRoute: '/manager',
  },
  'Help Desk Analyst': {
    allowedRoutes: ['/operator', '/analyst', '/tickets', '/analytics', '/analytics-legacy', '/escalation', '/integration', '/model-versioning', '/architecture', '/architecture-svg'],
    defaultRoute: '/analyst',
  },
  'Administrator': {
    allowedRoutes: ['*'], // All routes
    defaultRoute: '/admin',
  },
};

// Check if user has access to a route
const hasRouteAccess = (userRole, routePath) => {
  if (!userRole) return false;
  
  const permissions = rolePermissions[userRole];
  if (!permissions) return false;
  
  // Administrator has access to all routes
  if (permissions.allowedRoutes.includes('*')) return true;
  
  // Check if route is in allowed routes
  return permissions.allowedRoutes.includes(routePath);
};

// Get default route for a role
const getDefaultRoute = (userRole) => {
  const permissions = rolePermissions[userRole];
  return permissions?.defaultRoute || '/operator';
};

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

// Role-protected route wrapper
const RoleProtectedRoute = ({ children, path }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Check if user has access to this route
  if (!hasRouteAccess(user.role, path)) {
    // Redirect to default route for their role
    const defaultRoute = getDefaultRoute(user.role);
    return <Navigate to={defaultRoute} replace />;
  }

  return <Layout>{children}</Layout>;
};

function AppRoutes() {
  const { user, login } = useAuth();

  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<LoginPage onLogin={login} />} />

      {/* Cyber Operator Dashboard */}
      <Route
        path="/operator"
        element={
          <RoleProtectedRoute path="/operator">
            <SelfServicePortal />
          </RoleProtectedRoute>
        }
      />

      {/* Training Manager Dashboard */}
      <Route
        path="/manager"
        element={
          <RoleProtectedRoute path="/manager">
            <SelfServicePortal />
          </RoleProtectedRoute>
        }
      />

      {/* Help Desk Analyst Dashboard */}
      <Route
        path="/analyst"
        element={
          <RoleProtectedRoute path="/analyst">
            <TicketDashboard />
          </RoleProtectedRoute>
        }
      />

      {/* Ticket Dashboard */}
      <Route
        path="/tickets"
        element={
          <RoleProtectedRoute path="/tickets">
            <TicketDashboard />
          </RoleProtectedRoute>
        }
      />

      {/* Architecture Diagram */}
      <Route
        path="/architecture"
        element={
          <RoleProtectedRoute path="/architecture">
            <ArchitectureDiagram />
          </RoleProtectedRoute>
        }
      />

      {/* Architecture Diagram (SVG, hidden route) */}
      <Route
        path="/architecture-svg"
        element={
          <RoleProtectedRoute path="/architecture-svg">
            <ArchitectureDiagramSVG />
          </RoleProtectedRoute>
        }
      />

      {/* Analytics (new) */}
      <Route
        path="/analytics"
        element={
          <RoleProtectedRoute path="/analytics">
            <AnalyticsPage />
          </RoleProtectedRoute>
        }
      />

      {/* Analytics legacy full screen */}
      <Route
        path="/analytics-legacy"
        element={
          <RoleProtectedRoute path="/analytics-legacy">
            <AnalyticsDashboard />
          </RoleProtectedRoute>
        }
      />

      {/* Knowledge Base Management - Admin only */}
      <Route
        path="/kb"
        element={
          <RoleProtectedRoute path="/kb">
            <ConfigurationInterface />
          </RoleProtectedRoute>
        }
      />

      {/* Escalation Workflow */}
      <Route
        path="/escalation"
        element={
          <RoleProtectedRoute path="/escalation">
            <EscalationWorkflow />
          </RoleProtectedRoute>
        }
      />

      {/* System Integration Status */}
      <Route
        path="/integration"
        element={
          <RoleProtectedRoute path="/integration">
            <SystemIntegrationStatus />
          </RoleProtectedRoute>
        }
      />

      {/* Model Versioning & Continuous Learning */}
      <Route
        path="/model-versioning"
        element={
          <RoleProtectedRoute path="/model-versioning">
            <ModelVersioning />
          </RoleProtectedRoute>
        }
      />

      {/* Security & Compliance Dashboard - Admin only */}
      <Route
        path="/security"
        element={
          <RoleProtectedRoute path="/security">
            <SecurityComplianceDashboard />
          </RoleProtectedRoute>
        }
      />

      {/* Administrator Dashboard - Admin only */}
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute path="/admin">
            <ConfigurationInterface />
          </RoleProtectedRoute>
        }
      />

      {/* Demo Script Navigator - Public (no auth required) */}
      <Route
        path="/demo-script"
        element={<DemoScriptNavigator onClose={() => window.close()} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={pcteTheme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
