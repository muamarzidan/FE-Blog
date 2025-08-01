import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useAuth } from './context/Auth'
// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import EmailVerification from './pages/auth/EmailVerification'
import GoogleCallback from './pages/auth/GoogleCallback'
// Main Pages
import Home from './pages/Home'
import BlogDetail from './pages/blog/BlogDetail'
import AdminDashboard from './pages/dashboard/Home'
// Components
import ProtectedRoute from './components/ProtectedRoute'
import LoadingSpinner from './components/moleculs/LoadingSpinner'


function App() {
  const { isLoading, isAuthenticated, user } = useAuth()

  if (isLoading) {
    return <LoadingSpinner fullScreen />
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'text-center',
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              user?.role === 'admin' ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Login />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? (
              user?.role === 'admin' ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Register />
            )
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            isAuthenticated ? (
              user?.role === 'admin' ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <ForgotPassword />
            )
          } 
        />
        <Route 
          path="/reset-password" 
          element={
            isAuthenticated ? (
              user?.role === 'admin' ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <ResetPassword />
            )
          } 
        />

        <Route
          path="/email/verification"
          element={
              <EmailVerification />
            // <ProtectedRoute>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <BlogDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  )
}

export default App;