import React, { useEffect } from 'react'
import HomeHeader from '../Components/HomePageComponents/HomeHeader';
import HomeBody from '../Components/HomePageComponents/HomeBody';
import { useLoader } from '../Components/Context/LoaderContext';
import Loader from './Loader';

const HomePage = () => {

  const { loading, handleLoading } = useLoader();

  console.log(loading);

  useEffect(() => {
    setTimeout(() => {
      handleLoading(false);
    }, 2000)
  })
  return (

    <div>
      {loading ? <Loader /> :
        <div>
          <HomeHeader />
          <HomeBody />
        </div>
      }

    </div>
  )
}

export default HomePage;