import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
    setLoggedIn: (loggedIn: boolean) => void;
    loggedIn: boolean;
    setJWT: (JWT: string) => void;
    JWT: string;
    setUserId: (userId: string) => void;
    userId: string;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [JWT, setJWT] = useState('');
    const [userId, setUserId] = useState('');

    return (
        <AuthContext.Provider value={{ loggedIn, JWT, userId, setLoggedIn, setJWT, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
