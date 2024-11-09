import React, { useEffect, useState } from 'react'
import { useAuth } from '../Components/Context/AuthContext';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { useCartDetail } from '../Components/Context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartItems from './CartItems';

import cartEmpty from '../assets/cartEmpty.jpg'
import { useLoader } from '../Components/Context/LoaderContext';
import Loader from './Loader';

const AddToCart = () => {

  //alertComponent
  const [alert, setAlert] = useState();
  const { loading, handleLoading } = useLoader();

  const navigate = useNavigate();

  //user email
  const { user } = useAuth();
  const { email } = user;


  //setting the cartItem food id
  const { cartItem, setCartState, fetchCartItems } = useCartDetail();
  const [TotalPrice, setTotalPrice] = useState(0);

  //handling the orderTotal amount
  const handleOrderTotal = () => {
    let tempPrice = 0;
    setTotalPrice(prevTotalPrice => 0);
    for (const { fetchedItem, itemTotal } of cartItem) {
      const price = fetchedItem.Rupees;
      tempPrice += itemTotal * parseInt(price);
      // console.log(tempPrice);
    }
    // console.log(tempPrice);
    setTotalPrice(prevTotalPrice => prevTotalPrice + tempPrice);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        console.log("user is fetching");
        await fetchCartItems();
        handleOrderTotal();
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    handleOrderTotal();
  }, [cartItem]);

  const tableHeaderButton = `text-left font-bold font-serif text-md py-2`;


  //handle the placeOrderButton
  const handlePlaceOrder = () => {
    const len = cartItem.length
    const props = { len, TotalPrice, finalItem: { cartItem } };
    navigate('/delivery/cart/checkout', { state: props });
  }

  const handleClick = () => {
    navigate('/delivery');
  }


  if (cartItem.length < 1) {
    return (
      <div className='w-full'>
        <div className='w-full h-96 max-w-2xl mx-auto'>
          <img src={cartEmpty} className='w-full h-full' />
          <div className='w-1/2 mx-auto overflow-hidden'>
            <button className='text-center p-4 bg-pink-600 rounded-xl text-pink-100 w-full text-xl hover:scale-125 transition-all duration-1000 hover:bg-pink-900' onClick={handleClick}>
              AddItems
            </button>
          </div>
        </div>
      </div>
    )
  }

  // console.log(cartItem);

  return (
    <div className='mb-20 w-full'>
      {loading ? <Loader /> :
        <div>
          <h1 className='text-center my-2 text-lg '>Your Cart <b>{cartItem.length}</b> items</h1>
          <div className='md:flex md:flex-row w-full lg:w-4/5 md:mx-auto gap-2 md:pr-2'>
            <div className='flex flex-col gap-2 p-2 pb-10 md:w-3/5 md:h-screen overflow-scroll'>
              {cartItem.map((item, index) => (
                <CartItems key={index} index={index} property={item} />
              ))}
            </div>
            <div className='fixed bottom-16 w-full px-2 flex justify-between font-bold font-serif md:hidden'>
              <p className='w-1/2 text-center font-bold p-2 bg-pink-200 hover:bg-pink-900 transistion-all duration-1000 hover:text-pink-100'>OrderTotal: <span className='text-2xl'>{TotalPrice}</span></p>
              <button className='bg-red-400 w-1/2 capitalize p-2 hover:bg-pink-900 transistion-all duration-1000 hover:text-pink-100'
                onClick={handlePlaceOrder}
              >placeOrder</button>
            </div>
            <div className='hidden w-1/2 md:block h-1/2 lg:w-2/5 bg-red-300 mt-2 rounded-xl pt-2'>
              <p className=' pl-4 uppercase font-bold pb-2'>Price Details</p>
              <hr className=''></hr>
              <div className='flex flex-row justify-between p-10'>
                <div className='flex flex-col gap-5 '>
                  <p>Price: ({cartItem.length}Items)</p>
                  <p>Delivery Charges</p>
                  <p className='font-bold'>Total Amount</p>
                </div>
                <div className='flex flex-col gap-5'>
                  <p>₹ {TotalPrice}</p>
                  <p>None</p>
                  <p className='font-bold'>₹{TotalPrice}</p>
                </div>
              </div>
              <button className='w-full bg-orange-600 roundex-xl font-serif p-2 font-bold hover:bg-orange-900 hover:text-pink-100 transistion-all duration-1000'
                onClick={handlePlaceOrder}
              >Place Order</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default AddToCart