import { Routes, Route, Navigate } from 'react-router-dom';
import useStore from '../store/useStore';
import AppLayout from '../components/layout/AppLayout';

// Pages
import LandingPage from '../pages/LandingPage';
import AuthSelectPage from '../pages/AuthSelectPage';
import ChildHomePage from '../pages/ChildHomePage';
import WeeklyChallengePage from '../pages/WeeklyChallengePage';
import ThreeJarsPage from '../pages/ThreeJarsPage';
import TeachAIPage from '../pages/TeachAIPage';
import MyItemsPage from '../pages/MyItemsPage';
import ItemDetailPage from '../pages/ItemDetailPage';
import ParentDashboardPage from '../pages/ParentDashboardPage';
import ApprovalQueuePage from '../pages/ApprovalQueuePage';
import MoneyConfirmationPage from '../pages/MoneyConfirmationPage';
import SafetySettingsPage from '../pages/SafetySettingsPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';

/**
 * ProtectedRoute - Redirects to auth if no role selected
 */
function ProtectedRoute({ children, allowedRole }) {
  const { currentRole } = useStore();

  if (!currentRole) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRole && currentRole !== allowedRole) {
    const routeMap = {
      child: '/child',
      parent: '/parent',
      admin: '/admin',
    };
    return <Navigate to={routeMap[currentRole] || '/auth'} replace />;
  }

  return <AppLayout>{children}</AppLayout>;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthSelectPage />} />

      {/* Child routes */}
      <Route
        path="/child"
        element={
          <ProtectedRoute allowedRole="child">
            <ChildHomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/child/challenge"
        element={
          <ProtectedRoute allowedRole="child">
            <WeeklyChallengePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/child/jars"
        element={
          <ProtectedRoute allowedRole="child">
            <ThreeJarsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/child/teach-ai"
        element={
          <ProtectedRoute allowedRole="child">
            <TeachAIPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/child/items"
        element={
          <ProtectedRoute allowedRole="child">
            <MyItemsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/child/items/:id"
        element={
          <ProtectedRoute allowedRole="child">
            <ItemDetailPage />
          </ProtectedRoute>
        }
      />

      {/* Parent routes */}
      <Route
        path="/parent"
        element={
          <ProtectedRoute allowedRole="parent">
            <ParentDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/approvals"
        element={
          <ProtectedRoute allowedRole="parent">
            <ApprovalQueuePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/money"
        element={
          <ProtectedRoute allowedRole="parent">
            <MoneyConfirmationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/safety"
        element={
          <ProtectedRoute allowedRole="parent">
            <SafetySettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
