import React from 'react'
import { UserAlertContext } from '../Context/UserMenuContext';
import { useNavigate } from 'react-router-dom';


const UserMenuAlert = () => {

    const navigate = useNavigate();

    const { userMenu, handleUserMenu } = UserAlertContext();

    const handleClose = () => {
        handleUserMenu(false);
    }

    const handleLogin = () => {
        navigate('/login');
    }

    const handleSignUp = () => {
        navigate('/signup');
    }

    return (
        <div>
            {userMenu &&
                <div className='flex justify-center h-screen fixed top-24 left-0 right-0 bottom-0 z-50'>
                    <div className='max-w-sm mx-auto text-xl font-bold w-1/2 absolute mx-auto'>
                        <div className="bg-gray-200 border border-red-400 text-pink-700 px-4 py-3 rounded relative" role="alert">
                            <div className='flex flex-col space-y-4'>
                                <button onClick={handleLogin}>Login</button>
                                <button onClick={handleSignUp} >SignUp</button>
                            </div>
                            <div className='flex flex-col mt-4 items-center'>
                                <button className='border rounded-xl text-black bg-gray-500 w-28 sm:w-40 max-w-xs p-2 hover:bg-white hover:transition hover:duration-1000'
                                    onClick={handleClose}
                                >Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserMenuAlert