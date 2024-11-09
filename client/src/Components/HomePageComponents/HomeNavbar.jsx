import React from 'react';
import { BiSolidUser } from 'react-icons/bi';
import UserMenuAlert from '../AuthenticationPages/UserMenuAlert';
import { UserAlertContext } from '../Context/UserMenuContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const HomeNavbar = () => {

    const popUpButton = `flex justify-end pe-4 ps-7 `;

    const handleClick = () => {
        handleUserMenu(!userMenu);
    }

    const navigate = useNavigate();

    const { userMenu, handleUserMenu } = UserAlertContext();
    const { user, setUserState } = useAuth();

    //handle the login button
    const handleLogin = () => {
        navigate('/login');
        handleUserMenu(!userMenu);
    }

    //handle the signup button
    const handleSignUp = () => {
        navigate('/signup');
        handleUserMenu(!userMenu);
    }

    //handle the logout button
    const handleLogout = () => {
        // Clear user data in context
        setUserState(null);

        handleUserMenu(!userMenu);
    }

    const handleOrders = () => {
        navigate('/order');
        handleUserMenu(!userMenu);

    }

    const MobileView = () => {
        return ( // Add the return statement here
            <div className='md:hidden'>
                <div className='flex flex-row justify-between items-center'>
                    <h1 className='font-mono text-pink-100 font-bold text-3xl animate-pulse'>Zelo</h1>
                    <div>
                        <button className='border-2 border-pink-100 p-2 rounded-2xl hover:bg-pink-600 text-2xl transition-all duration-500' onClick={handleClick}>
                            <BiSolidUser className='text-pink-100' />
                        </button>
                    </div>
                </div>
                {userMenu && (
                    <div className='absolute right-0 top-0 bg-pink-100 flex flex-col rounded-l-2xl space-y-2 '>
                        <p className='py-2 pe-3 ps-20 sm:ps-40 font-bold font-serif' >My Profile</p>
                        <hr className='bg-black h-0.5'></hr>
                        <button className={popUpButton} onClick={handleLogin}>Login</button>
                        <button className={popUpButton} onClick={handleSignUp}>Signup</button>
                        <hr className='bg-black h-0.5' />
                        <button className={popUpButton} onClick={handleOrders}>Orders</button>
                        <button className={popUpButton}>Wishlist</button>
                        {user && <div className=''>
                            <hr className='bg-black h-0.5' />
                            <button className='float-right pe-4 ps-7 text-lg' onClick={handleLogout}><b>Logout</b></button>
                        </div>}
                        <button onClick={handleClick} className='w-full bg-pink-600 text-pink-100 text-lg p-2 rounded-l-2xl font-serif'>Close</button>
                    </div>
                )}
            </div>
        );
    }

    const LargeScreenView = () => {

        const buttonStyle = `hover:scale-125 transition-all duration-300`;

        const brandNameStyle = `p-3 font-mono text-pink-100 font-bold text-3xl transition-all duration-300  hover:animate-spin hover:rounded-3xl hover:bg-pink-600 `;

        const navigate = useNavigate();

        const handleLogin = () => {
            navigate('/login');
        }

        const handleSignup = () => {
            navigate('/signup');
        }

        const handleProfile = () => {
            navigate('/myProfile');
        }

        return (
            <div className='hidden md:block'>
                <div className='flex flex-row justify-between text-2xl items-center'>
                    <h1 className={brandNameStyle}>Zelo</h1>
                    <div className='flex flex-row gap-10 font-mono text-pink-100 font-bold' >
                        <button className={buttonStyle} onClick={handleProfile}>Profile</button>
                        <button onClick={handleLogin} className={buttonStyle}>Login</button>
                        <button onClick={handleSignup} className={buttonStyle}>SignUp</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='pt-4 px-3 w-full'>
            <MobileView />
            <LargeScreenView />
        </div>
    )
}

export default HomeNavbar;