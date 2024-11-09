// DeliveryHeaderCarousal.jsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeliveryHeaderCarousal = (props) => {
  const {type} = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${type}/food/?category=${props.title}`);
  }

  return (
    <div>
      <div className='flex flex-col items-center'>
        <button className='w-16 h-16  mt-4 mb-2 md:w-32 md:h-32' onClick={handleClick}>
          <img src={props.image} alt={props.title} className='w-full h-full' />
        </button>
        <p className='text-md md:text-xl'>{props.title}</p>
      </div>
    </div>
  )
}

export default DeliveryHeaderCarousal;
