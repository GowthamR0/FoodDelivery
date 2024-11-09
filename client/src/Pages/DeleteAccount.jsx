import React, { useState } from 'react'
import { useAuth } from '../Components/Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../Components/Context/LoaderContext';

const DeleteAccount = () => {

    const textStyle = `text-md font-mono`;
    const paraStyle = `text-lg bg-slate-950 p-2 rounded-xl px-5 `;

    const { user, setUserState } = useAuth();

    const { handleLoading } = useLoader();

    const [deleteAccount, setDeleteAccount] = useState(false);
    const [password1, setUserPassword] = useState();
    const [processCompleted, setProcessCompleted] = useState(false);

    const handleDeleteAccountYes = () => {
        setDeleteAccount(true);
    }

    const navigate = useNavigate();

    const handleDeleteAccountNo = () => {
        setDeleteAccount(false);
        navigate('/');
    }

    const handlePassword = (e) => {
        // console.log(e.target.value);
        setUserPassword(e.target.value);
    }

    const handlesetProcessCompleted = () => {

        localStorage.removeItem('user');

        setTimeout(() => {
            navigate('/');
        }, 2000);

        setProcessCompleted(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user.email);
        const password = password1;
        console.log(password);
        const email = user.email;
        try {
            const response = await axios.delete(
                'https://food-delivery-sand.vercel.app/auth/deleteAccount',
                { data: { email, password } } // Send data in the request body
            );

            if (response.status === 200) {
                handleLoading(false);
                console.log(response);
                handlesetProcessCompleted();
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className=''>
            {!processCompleted &&
                <div className=' md:w-3/5 lg:w-1/2 mx-auto p-5 bg-slate-700 text-pink-100 mt-20 mx-5 rounded-2xl shadow-xl'>
                    {!deleteAccount &&
                        <div className='space-y-4 mb-4'>
                            <h1 className={textStyle}>Are you Sure to delete the account</h1>
                            <div className='flex justify-around'>
                                <p className={paraStyle} onClick={handleDeleteAccountYes}>Yes</p>
                                <p className={paraStyle} onClick={handleDeleteAccountNo}>No</p>
                            </div>
                        </div>
                    }
                    {deleteAccount &&
                        <div className='space-y-4 mb-4'>
                            <h1 className={textStyle}>Please Confirm with password</h1>
                            <form className='space-y-4' onSubmit={handleSubmit}>
                                <h1 className={textStyle}>Enter the password to confirm</h1>
                                <input type='password' name='password' value={password1} onChange={handlePassword} className='w-full max-w-xl rounded-md py-2 px-2 text-black' />
                                <div className='w-1/2 mx-auto'>
                                    <button className='bg-slate-950 p-2 rounded-xl w-full'>Submit</button>
                                </div>
                            </form>
                        </div>
                    }
                    <div className='w-4/5 mx-auto'>
                        <button className='bg-slate-950 rounded-2xl py-1 px-3 w-full max-w-xl' onClick={handleDeleteAccountNo}>Move to Home</button>
                    </div>
                </div>
            }
            {processCompleted &&
                <div className='w-full lg:w-3/5 lg:mx-auto p-5 bg-slate-700 text-pink-100 mt-20 rounded-2xl shadow-xl space-y-4'>
                    <div className='w-4/5 mx-auto text-center'>
                        Account deleted Successfully
                    </div>
                    <div className='w-4/5 lg:w-3/5 mx-auto'>
                        <button className='bg-slate-950 rounded-2xl py-1 px-3 w-full' onClick={handleDeleteAccountNo}>Move to Home</button>
                    </div>
                </div>
            }
        </div >
    )
}

export default DeleteAccount