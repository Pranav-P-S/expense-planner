// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

// 1. Create the context
const AuthContext = createContext();

// 2. Create a custom hook for easy access to the context
export function useAuth() {
  return useContext(AuthContext);
}

// 3. Create the provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check if auth state is loaded

  useEffect(() => {
    // onAuthStateChanged is a listener from Firebase that triggers
    // whenever the user's login state changes.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Auth state has been checked
    });

    // Cleanup the listener when the component unmounts
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  // Render children only after the initial loading is complete
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}