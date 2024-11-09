import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '../Components/Context/AuthContext';
import axios from 'axios';
import { useFetcher, useLocation, useNavigate } from 'react-router-dom';
import useRazorpay from "react-razorpay";
import { useCartDetail } from '../Components/Context/CartContext';
import Alert from './Alert';
import { useLoader } from '../Components/Context/LoaderContext';
import Loader from './Loader';

const Checkout = () => {

    const formStyle = `space-y-2 bg-gray-200 p-2`;
    const formHeadingStyle = `text-lg font-mono font-bold`;
    const formDivStyle = `flex flex-row justify-between items-center gap-2 px-2`;
    const inputStyle = `bg-pink-100 rounded-md p-2 text-slate-900`;

    const navigate = useNavigate();
    const { loading, handleLoading } = useLoader();

    const [showAddressBar, setShowAddressBar] = useState(true);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showPaymet, setShowPayment] = useState(false);
    const [showCOD, setShowCOD] = useState(false);

    const [hidePhoneNumber, setHidePhoneNumber] = useState(true);
    const [hidePayment, setHidePayment] = useState(true);

    const { setCartState, cartItem, fetchCartItems } = useCartDetail();
    const { user } = useAuth();
    const [address, setAddress] = useState([]);
    const [newAddress, setNewAddress] = useState(false);
    const [paided, setPaided] = useState(false);
    const [prePaid, setPrePaid] = useState(false);

    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState("");

    const location = useLocation();
    const totalItem = location.state.len;
    const totalAmount = location.state.TotalPrice;
    const finalItem = location.state.finalItem;

    // console.log(finalItem);

    const [Razorpay, isLoaded] = useRazorpay();

    useEffect(() => {
        fetchUserAddress();
    }, [user]);

    //fetch the all userAddress
    const fetchUserAddress = async () => {
        try {
            const response = await axios.get(`https://food-delivery-sand.vercel.app/auth/address?email=${user.email}`);
            if (response.status === 200) {
                handleLoading(false);
            }
            setAddress(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    //handle delivery
    const handleDelivery = async () => {
        const email = user.email;
        // console.log(email);
        const status = "placed";
        try {
            const response = await axios.post("https://food-delivery-sand.vercel.app/order/new", {
                email, finalItem, deliveryAddress, deliveryPhoneNumber, status, totalItem, totalAmount, prePaid
            })
            console.log("hi1");
            // console.log(finalItem);
            // console.log(cartItem);
            const updatedCartItem = cartItem.filter(item => {
                return finalItem.cartItem.some(finalItem => finalItem.fetchedItem._id === item.fetchedItem._id);
            })

            console.log(updatedCartItem);

            const cartItemObjectId = updatedCartItem.map(item => item.fetchedItem._id);

            const updatedItem = await axios.delete("https://food-delivery-sand.vercel.app/auth/cartItem/delete", {
                data: { credentials: { email, cartItemObjectId } }
            });

            await fetchCartItems();

        } catch (err) {
            console.log(err);
        }
    }

    const handleCOD = () => {
        handleDelivery();
        setShowPayment(false);
        setPrePaid(false);
        setPaided(true);
        setTimeout(() => {
            setPaided(false);
        }, 10000);
        navigate('/delivery');
    }

    //Address componenet
    const Address = () => {

        const addressButton = `w-full bg-blue-600 text-white py-2 px-4 rounded-md text-lg capitalize font-serif hover:bg-blue-900 transition-all duration-500`;

        //showing the address
        const PrintAddress = ({ value }) => {
            return (
                <div className='border p-2 font-mono bg-white shadow-lg rounded-md w-full max-w-lg mx-auto'>
                    <div>
                        <p className=''>{value}</p>
                        <div className='flex flex-row justify-between pt-2'>
                            <button
                                className='p-2 bg-pink-600 rounded-md cursor-pointer text-pink-100'
                                onClick={() => {
                                    setDeliveryAddress(value);
                                    setShowAddressBar((prevShowAddressBar) => !prevShowAddressBar);
                                    setHidePhoneNumber(false);
                                    setShowPhoneNumber(true);
                                }}
                            >
                                Use this Address
                            </button>
                            <button
                                className='p-2 bg-pink-600 rounded-md cursor-pointer text-pink-100'
                                onClick={() => deleteAddress(value)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            );
        };

        const HandleNewAddress = () => {
            const parentFormElement = `flex flex-col font-mono lg:text-lg space-y-2 text-pink-100`;
            const addressButton = `w-full bg-pink-900 text-white py-2 px-4 rounded-md text-lg capitalize font-serif hover:bg-slate-900 transition-all duration-500`;

            const [addressData, setAddressData] = useState({
                street: '',
                city: '',
                pincode: '',
                landmark: ''
            })

            const handldleFormChange = (e) => {
                e.preventDefault();
                const { name, value } = e.target;
                setAddressData((prevValue) => ({
                    ...prevValue,
                    [name]: value
                }));
            }

            //Adding new Address
            const handleAddressFormSubmit = async (e) => {
                e.preventDefault();
                const finalNewAddress = addressData.street + " " + addressData.city + " " + addressData.pincode + "  LandMark : " + addressData.landmark;
                try {
                    const response = await axios.post('https://food-delivery-sand.vercel.app/auth/newAddress', {
                        credentials: { email: user.email, address: finalNewAddress },
                    });
                    setNewAddress(false);
                    // Fetch the updated address list
                    fetchUserAddress();
                } catch (e) {
                    console.log(e);
                }
            };
            return (
                <div>
                    <form className='bg-pink-700 px-5 py-2 rounded-xl space-y-2' onSubmit={handleAddressFormSubmit}>
                        <div className={parentFormElement}>
                            <label>Door no,Street</label>
                            <input type='text' name='street' className={inputStyle} value={addressData.street} onChange={handldleFormChange} required />
                        </div>
                        <div className={parentFormElement}>
                            <label>City</label>
                            <input type='text' name='city' className={inputStyle} value={addressData.city} onChange={handldleFormChange} required />
                        </div>
                        <div className={parentFormElement}>
                            <label>Pincode</label>
                            <input type='text' name='pincode' className={inputStyle} value={addressData.pincode} onChange={handldleFormChange} required />
                        </div>
                        <div className={parentFormElement}>
                            <label>LandMark</label>
                            <input type='text' name='landmark' className={inputStyle} value={addressData.landmark} onChange={handldleFormChange} required />
                        </div>
                        <div className='space-y-2'>
                            <button className={addressButton}>submit</button>
                            <button className={addressButton} onClick={(prevValue) => setNewAddress(false)}>Close</button>
                        </div>
                    </form>
                </div>
            )
        };

        //Delete the existing address
        const deleteAddress = async (addressToDelete) => {
            try {
                await axios.delete('https://food-delivery-sand.vercel.app/auth/deleteAddress', {
                    data: { email: user.email, address: addressToDelete },
                });
                fetchUserAddress();
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <div className={formStyle}>
                <div className={formDivStyle}>
                    <h1 className={formHeadingStyle}>Select the Address</h1>
                    {!showAddressBar &&
                        <button className='text-2xl' onClick={() => setShowAddressBar(true)}>+</button>
                    }
                    {showAddressBar &&
                        <button className='text-2xl' onClick={() => setShowAddressBar(false)}>-</button>
                    }
                </div>
                {address.length > 0 && showAddressBar && (
                    <div className='px-2 space-y-2 overflow-y-scroll '>
                        {address.map((value, index) => (
                            <PrintAddress value={value} key={index} />
                        ))}
                    </div>
                )}
                {showAddressBar &&
                    <div className='w-full sm:w-1/2 md:w-1/3 mx-auto'>
                        {!newAddress &&
                            <button className={addressButton} onClick={(prevValue) => setNewAddress(true)}>Add new Address</button>
                        }
                        {newAddress &&
                            <>
                                <HandleNewAddress />
                            </>
                        }
                    </div>
                }
            </div>
        )
    }

    //Phone number
    const PhoneNumber = () => {

        const [phoneNumberAlert, setPhoneNumberAlert] = useState(false);

        const phoneNumInputStyle = `w-full sm:w-1/2 bg-pink-100 rounded-md p-2 text-slate-900 border-2 border-black`;

        const [orderPhoneNumber, setOrderPhoneNumber] = useState({
            phoneNumber: ''
        });

        const handleOrderPhoneNumberChange = (e) => {
            e.preventDefault();
            // console.log(e);
            setOrderPhoneNumber((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value
            }))
        }

        //handle phoneNumber submit
        const handlePhoneNumberSubmit = () => {
            if (orderPhoneNumber.phoneNumber.length != 10) {
                setPhoneNumberAlert(true);
            } else {
                setShowPhoneNumber((prevValue) => !prevValue);
                setHidePayment(false);
                setShowPayment(true);
                setDeliveryPhoneNumber(orderPhoneNumber.phoneNumber);
                console.log("I don't know why running");
            }
        }

        return (
            <div>
                {hidePhoneNumber &&
                    <div className='space-y-2 bg-gray-200 py-2 px-4 opacity-40'>
                        <h1 className={formHeadingStyle}>Select the phoneNumber</h1>
                    </div>
                }
                {!hidePhoneNumber &&
                    <div className='space-y-2 bg-gray-200 p-2'>
                        <div className={formDivStyle}>
                            <h1 className={formHeadingStyle}>Select the PhoneNumber</h1>
                            {!showPhoneNumber &&
                                <button className='text-2xl' onClick={() => setShowPhoneNumber(true)}>+</button>
                            }
                            {showPhoneNumber &&
                                <button className='text-2xl' onClick={() => setShowPhoneNumber(false)}>-</button>
                            }
                        </div>
                        {showPhoneNumber &&
                            <div className='px-2 flex flex-col space-y-4 font-mono'>
                                <label>Enter the number for this Order</label>
                                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                                    <input className={phoneNumInputStyle} type='number' name='phoneNumber' value={orderPhoneNumber.phoneNumber} onChange={handleOrderPhoneNumberChange} placeholder='Eg:9965437878' required />
                                    <button className='text-xl bg-pink-600 p-2 rounded hover:bg-slate-900 text-pink-100 rounded-xl' onClick={() => handlePhoneNumberSubmit()}>Submit</button>
                                </div>
                                {phoneNumberAlert &&
                                    <h1 className='text-red-600 font-bold'>Input should be only number and equal to 10 digit</h1>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }

    //Payment Method

    const Payment = () => {

        console.log(deliveryAddress + " " + deliveryPhoneNumber);

        const handlePayment = useCallback(() => {

            const options = {
                key: "rzp_test_6eXuEZ5plG52mG",
                amount: 100 * totalAmount,
                currency: "INR",
                name: "Acme Corp",
                description: "Test Transaction",
                image: "",
                //   order_id: order.id,
                handler: (res) => {
                    if (res) {
                        // Set the delivery address here
                        setPaided(true);
                        setPrePaid(true);
                        handleDelivery();
                        setShowPayment(false);
                        setPaided(!paided);
                        setTimeout(() => {
                            setPaided(false);
                        }, 10000);
                        navigate('/delivery');
                    }
                },
                prefill: {
                    name: "Piyush Garg",
                    email: "youremail@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzpay = new Razorpay(options);
            rzpay.open();
        }, [Razorpay]);


        return (
            <div>
                {paided &&
                    <Alert message="Payment Done" />
                }
                <div className='space-y-2 bg-gray-200 p-2'>
                    {hidePayment &&
                        <div className='space-y-2 bg-gray-200 py-2 px-4 opacity-40'>
                            <h1 className={formHeadingStyle}>Payment</h1>
                        </div>
                    }
                    {!hidePayment &&
                        <div>
                            <div className={formDivStyle}>
                                <h1 className={formHeadingStyle}>Payment</h1>
                                {!showPaymet &&
                                    <button className='text-2xl' onClick={() => setShowPayment(true)}>+</button>
                                }
                                {showPaymet &&
                                    <button className='text-2xl' onClick={() => setShowPayment(false)}>-</button>
                                }
                            </div>
                            {showPaymet &&
                                <div className='flex justify-center'>
                                    <div className='bg-red-300 mt-2 rounded-xl pt-2 text-xl'>
                                        <p className='pl-4 uppercase font-bold pb-2'>Price Details</p>
                                        <hr className=''></hr>
                                        <div className='flex flex-row justify-between p-10'>
                                            <div className='flex flex-col gap-5 '>
                                                <p>Price: ({totalAmount})</p>
                                                <p className='pr-1'>Delivery Charges :</p>
                                                <p className='font-bold'>Total Amount</p>
                                            </div>
                                            <div className='flex flex-col gap-5'>
                                                <p>₹ {totalAmount}</p>
                                                <p>None</p>
                                                <p className='font-bold'>₹ {totalAmount}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-row sm-flex-col'>
                                            <button className=
                                                'w-full text-center bg-orange-500 p-2 rounded-xl hover:bg-green-800 transition-all duration-500 hover:text-pink-100 capitalize shadow-xl text-xl'
                                                onClick={() => setShowCOD(true)}
                                            >
                                                Cash On Delivery
                                            </button>
                                            <button className=
                                                'w-full text-center bg-orange-500 p-2 rounded-xl hover:bg-green-800 transition-all duration-500 hover:text-pink-100 capitalize shadow-xl text-xl'
                                                onClick={handlePayment}
                                            >
                                                UPI Pay
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>

        )

    }

    //     {/*<div className='space-y-4 overflow-y-scroll'>
    //         <div className='w-full pt-2 pb-5 bg-gray-100 space-y-4'>
    //             <h2 className='font-bold text-xl px-2'>Select the Address</h2>
    //             {address.length > 0 && (
    //                 <div className='px-2 space-y-2 h-32 sm:h-40 md:h-44 lg:h-48 overflow-y-scroll '>
    //                     {address.map((value, index) => (
    //                         <PrintAddress value={value} key={index} />
    //                     ))}
    //                 </div>
    //             )}
    //             <div className='flex justify-center'>
    //                 <button className={addressButton} onClick={handleNewAddress}>
    //                     Add new Address
    //                 </button>
    //             </div>
    //             {newAddress && (
    //                 <div className='flex justify-center'>
    //                     <form className='w-full sm:max-w-lg p-2 border border-2 border-pink-500 rounded-lg' onSubmit={handleAddressFormSubmit}>
    //                         <div>
    //                             <textarea
    //                                 className='w-full max-w-lg p-2'
    //                                 placeholder='Enter Address Here....'
    //                                 rows={5}
    //                                 name='address'
    //                                 value={formData.address} // Use formData.address here
    //                                 onChange={handleChange}
    //                             />
    //                         </div>
    //                         <div className='flex justify-center'>
    //                             <button className={addressButton}>
    //                                 Submit
    //                             </button>
    //                         </div>
    //                     </form>
    //                 </div>
    //             )}
    //         </div>
    //          <div className='w-full p-2 pb-5 bg-gray-100 space-y-4 font-serif'>
    //              <h2 className='font-bold text-xl'>Payment</h2>
    //              <div className='flex justify-center'>
    //                  <div className='hidden w-1/2 md:block h-1/2 lg:w-2/5 bg-red-300 mt-2 rounded-xl pt-2'>
    //                      <p className=' pl-4 uppercase font-bold pb-2'>Price Details</p>
    //                      <hr className=''></hr>
    //                      <div className='flex flex-row justify-between p-10'>
    //                          <div className='flex flex-col gap-5 '>
    //                              <p>Price: ({totalAmount})</p>
    //                              <p>Delivery Charges</p>
    //                              <p className='font-bold'>Total Amount</p>
    //                          </div>
    //                          <div className='flex flex-col gap-5'>
    //                              <p>₹ {totalAmount}</p>
    //                              <p>None</p>
    //                              <p className='font-bold'>₹ {totalAmount}</p>
    //                          </div>
    //                      </div>
    //                      <button className=
    //                         'w-full text-center bg-orange-500 p-2 rounded-xl hover:bg-green-800 transition-all duration-500 hover:text-pink-100 capitalize shadow-xl text-xl'
    //                         onClick={handlePayment}
    //                     >
    //                         Click to pay
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //         {paided &&
    //             <div className='w-full p-2 pb-5 bg-gray-100 space-y-4 font-mono text-pink-100 fixed top-0'>
    //                 <p className='bg-green-500 p-2 w-full max-w-lg mx-auto text-center text-xl rounded-2xl'>Payment Done!</p>
    //             </div>}
    //         </div> */}

    // );

    return (
        <div className='relative'>
            <div className=' p-4 space-y-3 mb-20 w-full max-w-3xl mx-auto'>
                {
                    loading ? <Loader /> :
                        <div>
                            <Address />
                            <PhoneNumber />
                            <Payment />
                        </div>
                }

            </div>
            {showCOD &&
                <div className='absolute w-full top-20'>
                    <div className='relative w-4/5 md:w-3/5 lg:w-1/3 mx-auto hover:scale-105 transition-all duration-1000'>
                        <div className='absolute w-full bg-pink-500 text-pink-100 mx-auto p-5 text-xl text-center space-y-4 rounded-xl'>
                            <h1>Are you sure to place order?</h1>
                            <div className='flex flex-row w-full gap-2 overflow-hidden'>
                                <button className='w-1/2 bg-pink-900 rounded-xl p-2 hover:scale-95 transition-all duration-500' onClick={handleCOD}>
                                    Yes
                                </button>
                                <button className='w-1/2 bg-pink-900 rounded-xl p-2 hover:scale-95 transition-all duration-500' onClick={() => setShowCOD(false)}>
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }


        </div>

    )
};

export default Checkout;
