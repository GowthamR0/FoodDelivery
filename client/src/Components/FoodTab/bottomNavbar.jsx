//import React from 'react';
import { useState } from 'react';
import { MdBrunchDining, MdDeliveryDining, MdOutlineDining, MdRamenDining } from 'react-icons/md';

import { useParams, Link } from "react-router-dom";

//mobileview
const Mobileview = () => {
    const [allTypes, setAllTypes] = useState([
        {
            id: "delivery",
            icon: <MdBrunchDining />,
            name: "Delivery",
        },
        {
            id: "night",
            icon: <MdOutlineDining />,
            name: "Night Life",
        },
        {
            id: "dining",
            icon: <MdDeliveryDining />,
            name: "Dining Out",
        }
    ]);

    const { type } = useParams();

    return (
        <div className="lg:hidden bg-white shadow-lg p-3 fixed bottom-0 z-10 w-full flex items-center justify-between md:justify-evenly text-gray-500 ">
            {allTypes.map((items, index) => (
                <button key={items.id}>
                    <Link key={index} to={`/${items.id}`}>
                        <div
                            className={
                                items.id === type ? "flex flex-col relative items-center text-xl text-pink-400 "
                                    : "flex flex-col items-center text-xl"
                            }
                        >
                            <div
                                className={
                                    items.id === type &&
                                    "absolute top-[-8px] w-full h-2 border-t-2 border-pink-400"
                                }
                            />
                            {items.icon}
                            <h5 className="text-sm">{items.name}</h5>
                        </div>
                    </Link>
                </button>
            )
            )}
        </div>
    );
};

const LargeScreen = () => {

    const [allTypes, setAllTypes] = useState([
        {
            id: "delivery",
            icon: <MdBrunchDining />,
            name: "Delivery"
        },
        {
            id: "night",
            icon: <MdOutlineDining />,
            name: "Night Life",

        },
        {
            id: "dining",
            icon: <MdDeliveryDining />,
            name: "Dining Out",

        }
    ]);

    const { type } = useParams();
    //console.log(type);
    return (
        <div className='w-2/3 hidden container lg:flex justify-between px-20 py-4 gap-4 '>
            {allTypes.map((items, index) => (
                <button key={items.id}>
                    <Link key={index} to={`/${items.id}`}>
                        <div
                            className={
                                items.id === type ? "grid grid-rows-1 grid-flow-col items-center gap-5 text-3xl text-pink-600 border-b-4 border-pink-500 pb-4"
                                : "grid grid-rows-1 grid-flow-col items-center text-3xl gap-5 text-gray-600 pb-4"
                              }
                        >
                            {items.icon}
                            <h5 className="text-sm">{items.name}</h5>
                            <div
                                className={type == items.id && "border-b-2 border-pink-400"}
                            />
                        </div>
                    </Link>
                </button>
            ))}
        </div>
    )
}

const BottomNavbar = () => {
    return (
        <>
            <Mobileview />
            <LargeScreen />
        </>
    )
}

export default BottomNavbar;
