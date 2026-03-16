import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ClientPortal from './pages/Client/ClientPortal'
import GovernmentPortal from './pages/Government/GovernmentPortal'

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to='/login' />
  if (role && user.role !== role) return <Navigate to='/login' />
  return children
}

const AppRoutes = () => {
  const { user } = useAuth()
  return (
    <Routes>
      {/* Home page */}
      <Route path='/' element={<Home />} />

      {/* Auth */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* Client */}
      <Route path='/client/*' element={
        <ProtectedRoute role='client'>
          <ClientPortal />
        </ProtectedRoute>
      } />

      {/* Government */}
      <Route path='/government/*' element={
        <ProtectedRoute role='government'>
          <GovernmentPortal />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            background: '#1f2937',
            color: 'white',
            border: '1px solid #374151'
          }
        }}
      />
      <AppRoutes />
    </AuthProvider>
  )
}
