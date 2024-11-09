import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../Pages/Alert';
import { useAuth } from "../Context/AuthContext";
import { useLoader } from '../Context/LoaderContext';

const Login = () => {

    const { handleLoading } = useLoader();

    useEffect(() => {
        handleLoading(false);
    }, [])

    const navigate = useNavigate();
    const inputStyle = `appearance-none text-black border rounded w-full p-3 focus:outline-none focus:shadow-outline`;
    const buttonStyle = `w-1/2 mx-auto mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded focus:outline-none focus:shadow-outline`
    const [alert, setAlert] = useState('');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');

    const { setUserState } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    //input field changes event
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //submit button changes event
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://food-delivery-sand.vercel.app/auth/signin", {
                credentials: formData,
            })
            if (response.status === 200) {
                //console.log(response);
                setUserState(response.data.response);
                // Redirect to Master component after successful signup
                //console.log('login.jsx navigating to /master');
                navigate('/delivery');
            }
        } catch (error) {
            console.error('Logon error:', error.message);
        }

    }

    //signup button changes event
    const handleSignUp = () => {
        //console.log("called signUp");
        navigate('/signup');
    }


    return (
        <div className="flex justify-center items-center h-screen bg-slate-800 text-white text-xl">
            <form className="w-full max-w-sm p-6" onSubmit={handleSubmit}>
                {/* <div className='mb-4'>
                    {alert ? <Alert message={message} alertColor={alertColor} /> : <></>}
                </div> */}
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="fullName">
                        Email
                    </label>
                    <input
                        className={inputStyle}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="fullName">
                        Password
                    </label>
                    <input
                        className={inputStyle}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex'>
                    <button
                        className={buttonStyle}
                        type="submit"
                    >
                        Login
                    </button>
                </div>
                <div className='flex'>
                    <button className={buttonStyle} onClick={handleSignUp} style={{ width: '100%' }} >Create a New Account</button>
                </div>
                <Link to="/"><h1 className="text-sm italic cursor-pointer w-1/2  bg-slate-900 mx-auto text-center rounded-md p-1 hover:bg-black">back to home</h1></Link>
            </form>
        </div>
    );
};

export default Login;
