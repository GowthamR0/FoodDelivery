import React from 'react';
import DeliveryImage from '../../assets/Homepage-Delivery.jpg';
import DiningImage from '../../assets/HomePage-Dining.avif';
import { useNavigate } from 'react-router-dom';
import { useSearchQueryContext } from '../Context/SearchQueryContext';

const HomeBody = () => {

    const { handleStatus } = useSearchQueryContext();

    const cardStyle = `h-56 
    w-full 
    sm:w-2/5 
    sm:h-60 
    lg:w-1/3 
    lg:h-72 
    cursor-pointer
    drop-shadow-xl 
    hover:bg-pink-600 
    rounded-2xl 
    hover:text-pink-100 
    transition-all
    duration-1000
    `
    const navigate = useNavigate();
    const handleClick = (props) => {
        navigate(`${props}`);
        console.log(props);
        handleStatus(false);
    }

    const CardDetails = [
        {
            Image: DeliveryImage,
            Title: "Order Online",
            Description: "Stay home and order to your doorstep",
            Type: "delivery",
            category: ""
        },
        {
            Image: DiningImage,
            Title: "Dining",
            Description: "View the city's favorite dining venues",
            Type: "dining",
            category: ""
        }
    ];

    const HomeBodyCards = () => {
        return (
            <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
                {CardDetails.map(item => (
                    <div className={cardStyle} key={item.Title} onClick={() => handleClick(item.Type)} >
                        <div className='w-full h-2/3 overflow-hidden'>
                            <img src={item.Image} className='w-full h-full transition-all duration-1000 hover:scale-125 rounded-2xl' alt={item.Title} />
                        </div>
                        <h1 className='w-full text-xl sm:ps-2 font-bold'>{item.Title}</h1>
                        <p className='w-full sm:ps-2'>{item.Description}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='w-full px-2 mt-5'>
            <HomeBodyCards />
        </div>
    );
};

export default HomeBody;
