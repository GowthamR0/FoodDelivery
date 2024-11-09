import React, { createContext, useContext, useState } from 'react';

const AuthorizeContext = createContext();

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Initialize from localStorage if available, or set to null
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const setUserState = (newUser) => {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    }
    return (
        <AuthorizeContext.Provider value={{ user, setUserState }} >
            {children}
        </AuthorizeContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthorizeContext);
    return context;
}