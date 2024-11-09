import { createContext, useContext, useState } from "react";

const SearchingContest = createContext();

export const SearchQueryContext = ({ children }) => {

    const [query, setQuery] = useState();
    const [status, setStatus] = useState(false);

    const handleQuery = (value) => {
        setQuery(value);
    }

    const handleStatus = (value) => {
        setStatus(true);
    }

    return (
        <SearchingContest.Provider value={{ query, handleQuery, handleStatus, status }}>
            {children}
        </SearchingContest.Provider>
    )
}

export const useSearchQueryContext = () => {
    return useContext(SearchingContest);
}