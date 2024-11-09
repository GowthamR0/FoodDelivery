import React, { useEffect } from 'react'
import DeliveryFoodCategory from '../Components/Delivery/DeliveryHeader/DeliveryFoodCategory';
import DeliveryItems from '../Components/Delivery/DeliveryBody/DeliveryItems';
import { useLoader } from '../Components/Context/LoaderContext';
import Loader from './Loader';

const DeliveryCategory = () => {
    const { loading, handleLoading } = useLoader();
    // console.log("In parent"+loading);
    return (
        <div className='p-3'>
            <>
                {loading ? <Loader /> :
                    <div className='md:pl-10 lg:px-20'>
                        <DeliveryFoodCategory />
                        <DeliveryItems />
                    </div>
                }
            </>
        </div>
    )
}

export default DeliveryCategory;