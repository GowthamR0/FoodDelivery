import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { useLoader } from '../Context/LoaderContext';
import Loader from '../../Pages/Loader';
import OrderLayout from './OrderLayout';

const Order = () => {

    const { user } = useAuth();
    const { loading, handleLoading } = useLoader();

    const [orderItems, setorderItems] = useState([]);

    const email = user.email;

    let orderDetails;

    let orderDetailswithImageUrl = [];

    useEffect(() => {
        setTimeout(() => {
            handleLoading(false);
        }, 2000);
        const getOrders = async () => {
            // console.log(email);
            try {
                const response = await axios.get(`https://food-delivery-sand.vercel.app/order/${email}`)
                orderDetails = response.data.orderDetails;
                // console.log(orderDetails);

                const promises = orderDetails.map(async (item) => {
                    const imageId = item.food;
                    const orderedDate = item.Date;
                    const quantity = item.quantity;
                    const status = item.status;
                    const res = await axios.get(`https://food-delivery-sand.vercel.app/food/menu?item=${imageId}`);
                    // console.log(res.data.fetchedItem);
                    const imageUrl = res.data.fetchItem.ImageUrl;
                    const title = res.data.fetchItem.Title;
                    return { title, imageUrl, orderedDate, quantity, status };
                })

                orderDetailswithImageUrl = await Promise.all(promises);
                setorderItems(orderDetailswithImageUrl);
                console.log(orderDetailswithImageUrl);
            } catch (e) {
                console.log(e);
            }
        }
        getOrders();
    }, [user])

    return (
        <div>
            {
                loading ? <Loader /> :
                    <div className='space-y-4 p-2 mb-16'>
                        {orderItems.map((item, index) => (
                            <OrderLayout item={item} key={index} />
                        ))}
                    </div>
            }

        </div>

    )
}

export default Order