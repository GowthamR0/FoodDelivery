import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UseCategory({ OrderType, Category }) {

    const navigate = useNavigate();

    const [items, setItems] = useState([])

    const fetchCategoryData = async () => {
        try {
            //console.log(Category);
            const foodList = await axios.get(`https://food-delivery-sand.vercel.app/food/menu/${OrderType}?category=${Category}`);
            console.log(foodList.data.message);
            const foodArray = foodList.data.message;
            setItems(foodArray);
            //return {categoryData, fetchCategoryData};
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchCategoryData();
    }, [Category]); // Trigger fetchCategoryData when the category changes

    return { items };
}

export default UseCategory;