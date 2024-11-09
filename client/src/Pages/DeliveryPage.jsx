import React, { useEffect } from 'react'
import DeliveryFoodCategory from '../Components/Delivery/DeliveryHeader/DeliveryFoodCategory'
import DeliveryHeroContainer from '../Components/Delivery/DeliveryBody/DeliveryHeroContainer'
import { useLoader } from '../Components/Context/LoaderContext';
import Loader from './Loader';

const DeliveryPage = () => {

  const { loading, setLoading } = useLoader();
  // console.log(loading);
  return (
    <div>
      {loading ? <Loader /> :
        <div className='md:pl-10 lg:px-20'>
          <DeliveryFoodCategory />
          <DeliveryHeroContainer />
        </div>
      }
    </div>
  )
}

export default DeliveryPage