import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useLoader } from '../Context/LoaderContext';

const Modal = () => {

    const { loading, handleLoading } = useLoader();

    useEffect(() => {
        handleLoading(false);
    })

    const [isModalOpen, setIsModalOpen] = useState(true);

    const { user, setUserState } = useAuth();

    const headStyle = `font-serif text-pink-600 font-bold text-2xl `;
    const paraStyle = `font-mono text-pink-900 text-lg cursor-pointer`;
    const lineStyle = `h-1 bg-pink-800`;

    const navigate = useNavigate();

    const closeModal = () => {
        setIsModalOpen(false);
        navigate(-1);
    };

    const NavigateTOLogin = () => {
        navigate('/login');
    }

    const NavigateToSignUp = () => {
        navigate('/signup');
    }

    const handleDeleteAccount = () => {
        navigate('/delete/account');
    }

    const handleLogout = () => {
        // Clear user data in context
        setUserState(null);
        navigate('/');
    }

    const NavigateToOrder = () => {
        navigate('/order');
    }


    window.onclick = function (event) {
        if (event.target.id === 'modal') {
            closeModal();
        }
    }

    return (
        <div className=''>
            <div className='modal w-full h-full fixed left-0 top-0 bg-gray-300/90' id='modal'>
                <div className='modal-content fixed w-full p-4 space-y-3'>
                    <div className='modal-header flex flex justify-between mb-2'>
                        <p className={headStyle}>My Profile</p>
                        <button onClick={closeModal} className='text-2xl text-black font-bold'>&times;</button>
                    </div>
                    <hr className={lineStyle} />
                    <div className='modal-body space-y-2'>
                        <p className={paraStyle} onClick={NavigateTOLogin}>Login</p>
                        <p className={paraStyle} onClick={NavigateToSignUp}>Signup</p>
                        <p className={paraStyle} onClick={handleLogout}>Logout</p>
                    </div>
                    <hr className={lineStyle} />
                    <div className='modal-body space-y-2'>
                        <p className={paraStyle} onClick={NavigateToOrder}>Orders</p>
                        <p className={paraStyle}>Wishlist</p>
                        <p className={paraStyle}>EditProfile</p>
                    </div>

                    <div className='modal-footer w-4/5 sm:w-1/2 mx-auto'>
                        <button className='text-pink-100 bg-pink-800 rounded-xl p-4 w-full text-xl' onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
