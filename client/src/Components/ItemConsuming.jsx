import React from 'react';
import { useParams } from 'react-router-dom';
import DeliveryPage from '../Pages/DeliveryPage';

const ItemConsuming = () => {
    const { type } = useParams();
    // console.log(type);
    return (
        <>
            <div className='p-3'>
                {type === "delivery" && <DeliveryPage />}
            </div>
        </>
    );
};

export default ItemConsuming;