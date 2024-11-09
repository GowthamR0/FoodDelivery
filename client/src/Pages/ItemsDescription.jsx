import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../Components/Context/AuthContext";
import Alert from './Alert';
import { useCartDetail } from '../Components/Context/CartContext';
import { useLoader } from '../Components/Context/LoaderContext';
import Loader from './Loader';

const ItemsDescription = () => {

  const { cartItem, setCartState, fetchCartItems } = useCartDetail();

  const { loading, handleLoading } = useLoader();

  const quantityButtonStyle = `text-5xl`;
  const cartButtonStyle = `text-xl bg-pink-600 p-4 text-pink-100 rounded-xl w-2/5 hover:bg-pink-800 md:hover:scale-105 transistion duration-1000`;
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const location = useLocation();
  const props = location.state;

  const { user } = useAuth();

  //set the alert to show messages
  const [alert, setAlert] = useState("");
  const [message, setMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');


  useEffect(() => {
    setTimeout(() => {
      handleLoading(false);
      // console.log(loading);
    }, 1000);
    const fetchFoodList = async () => {
      try {
        const response = await axios.get(`https://food-delivery-sand.vercel.app/food/menu/${props.OrderType}`);
        setItems(response.data.message);
        // console.log(response.data.message);
        // if (response.status === 200) {
        //   await handleLoading(false);
        //   // console.log(loading);
        // }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchFoodList();
  }, [user, props])
  //handling the items count button
  const handleAddItems = () => {
    setCount(prevCount => prevCount + 1);
  }

  const handleDeleteItems = () => {
    if (count !== 0) {
      setCount(prevCount => prevCount - 1);
    }
  }
  const navigate = useNavigate();

  const handleClick = (items) => {
    //console.log(items);
    navigate(`/${items.OrderType}/food/${items.Title}`, { state: items })
  }

  const handleAddToCart = async (totalItem) => {
    // console.log(totalItem)
    const cartItemObjectId = props._id;

    let email;
    if (user) {
      email = user.email;
    }
    const itemTotal = totalItem;
    if (user) {
      // console.log(user)
      try {
        if (itemTotal == 0) {
          setAlert(true);
          setMessage("Add the quantity.It's 0");
          setAlertColor("pink");
          setTimeout(() => {
            setAlert(false);
          }, 5000);
        }
        else {
          let foodId = false;
          //console.log(cartItem);
          for (let i = 0; i < cartItem.length; i++) {
            if (cartItem[i].fetchedItem._id === cartItemObjectId) {
              // console.log(true);
              foodId = true;
              setAlert(true);
              setMessage("Item already in the cart");
              setAlertColor("pink");
              setTimeout(() => {
                setAlert(false);
              }, 5000);
            }
            //console.log(cartItem[i]);
          }
          if (!foodId) {
            const response = await axios.post("https://food-delivery-sand.vercel.app/auth/cart", {
              credentials: { email, cartItemObjectId, itemTotal }
            });
            // console.log(response);
            setAlert(true);
            setMessage("Item added sucessfully");
            setAlertColor("green");
            setTimeout(() => {
              setAlert(false);
            }, 3000);
            setCartState(response.data.user.cart);
            await fetchCartItems();
            console.log(cartItem);
          }
        }
      } catch (err) {
        //console.log("inside catch block");
        console.log(err);
      }
    } else {
      navigate('/login');
    }
  }

  const handleBuyThisNow = async (totalItem) => {
    // console.log(props);
    const itemTotal = totalItem;
    if (user) {
      // console.log(user)
      try {
        if (itemTotal == 0) {
          setAlert(true);
          setMessage("Add the quantity.It's 0");
          setAlertColor("pink");
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        }
        else {
          const fetchedItem = props;
          const cartItem = { fetchedItem, itemTotal };
          const len = 1;
          const TotalPrice = parseInt(props.Rupees) * itemTotal;
          const property = { len, TotalPrice, finalItem: { cartItem } };
          navigate('/delivery/cart/checkout', { state: property });
          //   console.log(cartItem);
        }
      } catch (err) {
        //console.log("inside catch block");
        console.log(err);
      }
    } else {
      navigate('/login');
    }
  }

  return (
    <div className='w-full h-full'>
      {loading ? <Loader /> :
        <div>
          <div className='absolute w-full p-2'>
            <div className='max-w-lg mx-auto'>
              {alert ? <Alert message={message} alertColor={alertColor} className="position-absolute" /> : <></>}
            </div>
          </div>
          <div className='p-3 mb-20'>
            <div className='w-full sm:flex sm:gap-3 lg:gap-10 items-center'>
              <div className='w-full sm:w-1/2 sm:h-56 md:h-60 lg:h-80'>
                <img src={props.ImageUrl} alt="title" className='w-full h-full rounded-xl' />
              </div>
              <div className='flex flex-col gap-3 sm:w-1/2'>
                <h1 className='font-bold text-xl'>{props.Title}</h1>
                <h3 className='font-bold'>{props.Type}</h3>
                <p>{props.Description}
                </p>
                <div className='flex flex-row gap-10 items-center mt-5'>
                  <p className='font-bold text-xl'>Quantity</p>
                  <div className='flex flex-row items-center gap-3 '>
                    <button className={quantityButtonStyle} onClick={handleDeleteItems}>-</button>
                    <div className='border bg-pink-600 w-10 p-1 text-center text-white text-2xl font-bold'>{count}</div>
                    <button className={quantityButtonStyle} onClick={handleAddItems}> + </button>
                  </div>
                </div>
                <p className='text-3xl mt-3 text-gray-700 flex flex-row'>₹{props.Rupees}</p>
                <div className='flex flex-row justify-between mt-5'>
                  <button className={cartButtonStyle} onClick={() => handleBuyThisNow(count)}>Buy Now</button>
                  <button className={cartButtonStyle} onClick={() => handleAddToCart(count)} > Add To Cart</button>
                </div>
              </div>
            </div>

            {/* Products recommended based on the cart */}
            <div className='mt-5'>
              <p className='text-xl font-bold capitalize'>Products that recommended for you</p>
              <div className='mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10'>
                {items.map(item => (
                  <div className='cursor-pointer' key={item._id} onClick={() => handleClick(item)}>
                    <div className='w-full'>
                      <img src={item.ImageUrl} className='w-full rounded-xl' />
                    </div>
                    <h1 className='text-xl font-bold pl-2'>{item.Title}</h1>
                    <p className='pl-2'>{item.Type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      }

    </div>
  )
}

export default ItemsDescription;