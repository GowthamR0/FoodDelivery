import React, { useEffect, useState } from 'react';
import DeliveryHeroCards from './DeliveryHeroCards';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '../../Context/LoaderContext';
import { SearchQueryContext, useSearchQueryContext } from '../../Context/SearchQueryContext';

const DeliveryHeroContainer = () => {

    const { loading, handleLoading } = useLoader();

    const { type } = useParams();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');

    const { query } = useSearchQueryContext();

    useEffect(() => {
        // console.log(location);
        const fetchFoodList = async () => {
            try {
                const response = await axios.get(`https://food-delivery-sand.vercel.app/food/menu/${type}`);
                setItems(response.data.message);
                // console.log(response);
                if (response.status === 200) {
                    handleLoading(false);
                }
            } catch (err) {
                console.log(err.mesage);
            }
        }
        fetchFoodList();
    }, [type])

    useEffect(() => {
        // console.log(type);
        if (category) {
            const filtered = items.filter((item) => {
                const formattedTitle = item.Title.toLowerCase().replace(/\s/g, '');
                // console.log(formattedTitle);
                const formattedCategory = category.toLowerCase().replace(/\s/g, '');
                // console.log(formattedCategory);
                return formattedTitle.includes(formattedCategory);
            });
            filtered.length === 0 ? setFilteredItems(items) : setFilteredItems(filtered);
        } else {
            setFilteredItems(items);
        }
        setTimeout(() => {
            handleLoading(false);
        }, 2000)
    }, [category, items])

    return (
        <div className='py-4 lg:py-16'>
            <h1 className='text-xl text-gray-700 md:text-2xl font-bold capitalize'>{type}</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-10'>
                {filteredItems.map(item => (
                    <DeliveryHeroCards key={item.Title} {...item} />
                ))}
            </div>
        </div>
    )
}

export default DeliveryHeroContainer;