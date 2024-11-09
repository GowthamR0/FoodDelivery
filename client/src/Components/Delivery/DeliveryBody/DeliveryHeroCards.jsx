import React from 'react';
import { FcRating } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const DeliveryHeroCards = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${props.OrderType}/food/${props.Title}`,{ state :props})
    }
    return (
        <div>
            <div className='w-full h-80 my-4 cursor-pointer overflow-hidden' onClick={handleClick}>
                <img src={props.ImageUrl} alt={props.Title} className='w-full h-4/5 rounded-xl hover:scale-105 transistion-all duration-700' />
                <div className='flex flex-row justify-between mt-4'>
                    <div>
                        <p className='text-xl font-bold'>{props.Title}</p>
                        <h1>{props.Type}</h1>
                    </div>
                    <div>
                        <div className='flex items-center gap-2'>
                            <FcRating className='' />
                            <p>{props.Rating}</p>
                        </div>
                        <p>₹{props.Rupees}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryHeroCards;