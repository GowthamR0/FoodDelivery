import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoaderContext = ({ children }) => {

    const [loading, setLoading] = useState(true);

    const handleLoading = (value) => {
        setLoading(value);
    }

    return (
        <LoadingContext.Provider value={{ loading, handleLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoader = () => {
    const context = useContext(LoadingContext);
    return context;
}