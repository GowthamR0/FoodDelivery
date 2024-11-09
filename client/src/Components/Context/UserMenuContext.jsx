import React, { createContext, useContext, useState } from 'react';

const UserAlert = createContext();

export const UserMenuContext = ({ children }) => { // Pass children as a prop
    const [userMenu, setUserMenu] = useState(false)

    const handleUserMenu = (props) => {
        setUserMenu(props);
    }
    return (
        <div>
            <UserAlert.Provider value={{ userMenu, handleUserMenu }} >
                {children}
            </UserAlert.Provider>
        </div>
    )
}

export const UserAlertContext = () => {
    return useContext(UserAlert);
}