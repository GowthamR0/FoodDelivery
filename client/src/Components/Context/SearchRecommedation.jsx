import { createContext, useContext, useEffect, useState } from "react";
import { useSearchQueryContext } from "./SearchQueryContext";
import axios from "axios";

const searchRecommedationContext = createContext();

export const SearchRecommedation = ({ children }) => {

    const [recommendedQuery, setRecommendedQuery] = useState([]);

    const [foodItems, setFoodItems] = useState([]);

    const { query } = useSearchQueryContext();

    const type = 'delivery';

    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await axios.get(`https://food-delivery-sand.vercel.app/food/menu/${type}`);
                setFoodItems(response.data.message);
                if (response.status === 200) {
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchFoodList();
    }, [])

    const handleRecommendedQuery = (value) => {
        setRecommendedQuery(value);
    }

    const fetchRecommedationQuery = () => {
        const filtered = foodItems.
            filter((item) => item.Title.toLowerCase().includes(query))
            .map((item) => item.Title);
        ;
        setRecommendedQuery(filtered);
    }

    return (
        <searchRecommedationContext.Provider value={{ recommendedQuery, handleRecommendedQuery, fetchRecommedationQuery }}>
            {children}
        </searchRecommedationContext.Provider>
    )
}


export const useSearchRecommendationContext = () => {
    return useContext(searchRecommedationContext)
}