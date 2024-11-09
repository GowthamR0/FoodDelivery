import React from 'react'

const OrderLayout = ({ item, index }) => {

    const MobileView = () => {
        return (
            <div className='w-full bg-pink-600 max-w-2xl mx-auto text-pink-100 rounded-xl sm:hidden'>
                <div className='p-2 space-y-3'>
                    <div>
                        <div className='w-full'>
                            <img src={item.imageUrl} className='w-full rounded-xl' />
                        </div>
                        <h1 className='text-center text-xl '>{item.title}</h1>
                    </div>
                    <div className='capitalize space-y-2 text-center'>
                        <h1>Status : {item.status}</h1>
                        <p>Qtn : {item.quantity}</p>
                        <p>Date : {item.orderedDate}</p>
                    </div>
                </div>
            </div>
        )
    }

    const TabView = () => {
        return (
            <div className='w-full bg-pink-600 max-w-xl mx-auto text-pink-100 rounded-xl hidden sm:block'>
                <div className='flex flex-row p-2 gap-10'>
                    <div>
                        <div className='w-full'>
                            <img src={item.imageUrl} className='w-44 rounded-xl' />
                        </div>
                        <h1 className='text-center text-xl '>{item.title}</h1>
                    </div>
                    <div className='capitalize space-y-2'>
                        <h1>Status : {item.status}</h1>
                        <p>Qtn : {item.quantity}</p>
                        <p>Date : {item.orderedDate}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <MobileView />
            <TabView />
        </div>
    )
}

export default OrderLayout