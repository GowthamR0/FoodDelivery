import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useAuth } from '../Components/Context/AuthContext';
import { useCartDetail } from '../Components/Context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../Components/Context/LoaderContext';


const CartItems = ({ property, index }) => {

    const navigate = useNavigate();
    //user
    const { user } = useAuth();
    const { email } = user;

    //setting the cartItem food id
    const { cartItem, setCartState, fetchCartItems } = useCartDetail();

    const { loading, handleLoading } = useLoader();

    let currentItem = [];

    //used to remo)ve the item
    const [isItemVisible, setIsItemVisible] = useState(true);

    //Decrease Button
    const handleDecrease = async (index) => {
        console.log(index);
        console.log(cartItem);
        const quantity = cartItem[index].itemTotal - 1;
        if (quantity > 0) {
            try {
                const response = await axios.put(`https://food-delivery-sand.vercel.app/auth/updateQuantity`, {
                    email, index, quantity
                });
                console.log(response);
                if (response.status == 200) {
                    fetchCartItems();
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    //increse button
    const handleIncrease = async (index) => {
        console.log(index);
        console.log(cartItem);
        const quantity = cartItem[index].itemTotal + 1;
        try {
            const response = await axios.put(`https://food-delivery-sand.vercel.app/auth/updateQuantity`, {
                email, index, quantity
            });
            fetchCartItems();
        } catch (e) {
            console.log(e);
        }
    }

    //Remove Button
    const removeItem = async (props) => {
        const { email } = user;
        const cartItemObjectId = props.fetchedItem._id;
        handleLoading(true);
        try {
            console.log(loading);
            const updatedItem = await axios.delete("https://food-delivery-sand.vercel.app/auth/cartItem/delete", {
                data: { credentials: { email, cartItemObjectId } }
            });
            if (updatedItem) {
                // setIsItemVisible(false);
                fetchCartItems();
            }
        } catch (err) {
            console.log(err);
        }
        // console.log(props.fetchedItem._id);
    }

    const handleBtn = () => {
        console.log("button is working...");
        navigate('/');
    }

    //Buy this now 
    const handleMarkAsFavorite = () => {

    }

    const RatingIcon = ({ rating }) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<AiFillStar key={i} className='text-pink-700 inline' />);
        }
        return <>{stars}</>
    }
    const quantityButton = `border px-2 bg-pink-600 text-white font-bold py-0.5 cursor-pointer`;
    const tableDataButton = `font-serif font-bold text-md md:text-2xl`;
    const itemsButton = `text-md lg:text-lg border w-full font-serif  bg-pink-600 p-1 hover:bg-pink-700 text-pink-100 transistion-all duration-1000`;
    const tableDataHeader = `font-serif font-bold sm:text-xl`;
    //console.log(property);
    const rating = property.fetchedItem.Rating;
    const hasRating = rating > 0;
    if (!isItemVisible) {
        // Don't render anything if the item is not visible
        return null;
    }
    return (
        <div>
            <div className='flex flex-col w-full gap-5 border p-2 border-2 rounded-xl border-pink-300 select-none'>
                <div className='flex flex-row gap-10 w-full'>
                    <div className='w-1/2'>
                        <div className='w-full h-32 sm:h-48 md:h-48 lg:h-56 overflow-hidden'>
                            <img src={property.fetchedItem.ImageUrl} className='w-full h-full rounded-xl hover:cursor-pointer transistion-all duration-1000' />
                        </div>
                        <div className={tableDataButton} style={{ marginTop: "10px", marginBottom: "10px", textAlign: "center" }}>
                            <span className={quantityButton} onClick={() => handleDecrease(index)}>-</span>
                            <span className='px-2'>{property.itemTotal}</span>
                            <span className={quantityButton} onClick={() => handleIncrease(index)}>+</span>
                        </div>
                    </div>
                    <div>
                        <h1 className={tableDataHeader}>{property.fetchedItem.Title}</h1>
                        <p className='md:text-lg'>Category: {property.fetchedItem.Category}</p>
                        <span className='font-bold items-center md:text-lg '>Rating: {hasRating ? (
                            <span className='font-bold items-center'>
                                <RatingIcon rating={rating} />
                            </span>
                        ) : (
                            <span className='font-bold items-center text-red-500 md:text-lg'>Unavailable</span>
                        )}</span>
                        <p className='font-serif font-bold text-pink-800 sm:text-xl md:text-2xl'>₹ {property.fetchedItem.Rupees}</p>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <button className={itemsButton} onClick={() => removeItem(property)}>Remove</button>
                    <button className={itemsButton} onClick={() => handleMarkAsFavorite()}>Mark As Favourite</button>
                </div>
            </div>
        </div>
    )

}

export default CartItems;