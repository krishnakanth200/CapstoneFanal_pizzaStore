import React, { createContext, useState, useContext } from 'react';
import Loading from '../components/Loading/Lodaing'; // Ensure this path is correct

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <Loading />} {/* Ensure Loading is correctly imported */}
      {children}
    </LoadingContext.Provider>
  );
};
