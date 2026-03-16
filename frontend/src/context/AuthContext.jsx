import { createContext, useState, useContext } from 'react'

// Create the context
const AuthContext = createContext()

// AuthProvider wraps the whole app and shares user data everywhere
export const AuthProvider = ({ children }) => {
  // Check if user is already logged in (stored in localStorage)
  const [user, setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )

  // Login — save user data to state and localStorage
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Logout — clear everything
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — easy way to use auth in any component
export const useAuth = () => useContext(AuthContext)