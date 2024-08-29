import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Load token from localStorage on initial render
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (storedToken) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setRole(JSON.parse(storedRole));
    }
  }, []);

  const login = (token, user, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', JSON.stringify(role));

    setToken(token);
    setUser(user);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');

    setToken(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
