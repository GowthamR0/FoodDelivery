import { createContext, useContext, useState } from "react";

const locationSavingContext = createContext();

export const LocationContext = ({ children }) => {
    const [locationVal, setLocationVal] = useState({
        pathName: "",
        search: ""
    });
    const handleLocation = ({ PathName, Search }) => {
        console.log(PathName);
        console.log(Search);
        setLocationVal({
            pathName: PathName,
            search: Search
        });
    };
    return (
        <locationSavingContext.Provider value={{ locationVal, handleLocation }}>
            {children}
        </locationSavingContext.Provider>
    )
}

export const useLocationContext = () => {
    return useContext(locationSavingContext);
}