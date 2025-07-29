import { Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from './context/Auth'
// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
// Main Pages
import Home from './pages/Home'
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
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/home"element={<Home />}/> */}

      <Route
        path="/home"
        element={
          <ProtectedRoute requiredRole="user">
            <Home />
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

      <Route
        path="/"
        element={
          isAuthenticated ? (
            user?.role === 'admin' ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/home" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="*"
        element={
          isAuthenticated ? (
            user?.role === 'admin' ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/home" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}

export default App