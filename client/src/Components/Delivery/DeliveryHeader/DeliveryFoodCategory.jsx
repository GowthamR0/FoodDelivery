import React from 'react';
import { Images } from './Image';
import DeliveryHeaderCarousal from './DeliveryHeaderCarousal';

const DeliveryFoodCategory = () => {
    return (
        <>
            <h1 className='text-xl text-gray-700 md:text-2xl font-bold'>Inspiration for your First Order</h1>
            <div className='flex overflow-x-auto gap-8'>
                {Images.map((item) => (
                    <DeliveryHeaderCarousal
                        key={item.Title}
                        image={item.ImageUrl}
                        title={item.Title}
                    />
                ))}
            </div>
        </>
    )
}

export default DeliveryFoodCategory;