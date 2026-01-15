import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in (from localStorage)
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // For demo purposes, accept any email/password
        // In production, this would call your backend API
        if (email && password) {
            const userData = {
                email: email,
                name: email.split('@')[0],
                role: 'Admin'
            };

            // Store in localStorage
            localStorage.setItem('authToken', 'demo-token-' + Date.now());
            localStorage.setItem('userData', JSON.stringify(userData));

            setIsAuthenticated(true);
            setUser(userData);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
