import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../../Pages/Alert';
import { useAuth } from '../Context/AuthContext';
import { useLoader } from '../Context/LoaderContext';


const SignUp = () => {

    const { handleLoading } = useLoader();

    useEffect(() => {
        handleLoading(false);
    }, [])

    const navigate = useNavigate();
    const inputStyle = `appearance-none text-black border rounded w-full p-3 focus:outline-none focus:shadow-outline`;
    const signupButtonStyle = `w-1/2 mx-auto mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded focus:outline-none focus:shadow-outline`;

    const [alert, setAlert] = useState('');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
    });

    const { user, setUserState } = useAuth();
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
            const response = await axios.post('https://food-delivery-sand.vercel.app/auth/signup', {
                credentials: formData,
            });
            if (response.status === 200) {
                // Redirect to Master component after successful signup
                console.log('SignUp.jsx navigating to /master');
                console.log(response.data);
                setUserState(response.data);
                navigate('/delivery');
            }
        } catch (error) {
            console.log(error);
            setAlert(true);
            setMessage(error.response.data.message);
            setAlertColor("green");
            setTimeout(() => {
                setAlert(false);
            }, 5000);
            console.error('Signup error:', error);
        }
    };

    //login button changes event
    const handleLogin = () => {
        navigate("/login");
    }

    return (
        <div className="flex justify-center items-center h-screen bg-slate-800 text-white text-xl">
            <form className="w-full max-w-sm p-6" onSubmit={handleSubmit}>
                <div className='mb-4'>
                    {alert ? <Alert message={message} alertColor={alertColor} /> : <></>}
                </div>
                <div className="mb-4">
                    <label className="block  font-bold mb-2" htmlFor="fullName">
                        Full Name
                    </label>
                    <input
                        className={inputStyle}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="PhoneNumber">
                        Mobile No
                    </label>
                    <input
                        className={inputStyle}
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex'>
                    <button
                        className={signupButtonStyle}
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
                <div className='flex'>
                    <button
                        className={signupButtonStyle}
                        style={{ width: '100%' }}
                        onClick={handleLogin}
                    >
                        Already Have an account? LogIn
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
