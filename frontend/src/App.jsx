import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

// Pages (we'll create these next)
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ClientPortal from './pages/Client/ClientPortal'
import GovernmentPortal from './pages/Government/GovernmentPortal'

// Protected Route — only logged in users can access
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth()

  if (!user) return <Navigate to='/login' />
  if (role && user.role !== role) return <Navigate to='/login' />

  return children
}

// App Routes
const AppRoutes = () => {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* Client protected routes */}
      <Route path='/client/*' element={
        <ProtectedRoute role='client'>
          <ClientPortal />
        </ProtectedRoute>
      } />

      {/* Government protected routes */}
      <Route path='/government/*' element={
        <ProtectedRoute role='government'>
          <GovernmentPortal />
        </ProtectedRoute>
      } />

      {/* Default redirect based on role */}
      <Route path='/' element={
        user
          ? user.role === 'client'
            ? <Navigate to='/client' />
            : <Navigate to='/government' />
          : <Navigate to='/login' />
      } />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      {/* Toast notifications */}
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

/*

## 💡 Key Concept — Protected Routes
```
User visits /client
      ↓
ProtectedRoute checks — is user logged in?
      ↓ No
Redirect to /login
      ↓ Yes
Is role = 'client'?
      ↓ Yes
Show ClientPortal ✅

*/