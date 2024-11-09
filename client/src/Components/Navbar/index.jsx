import { useEffect, useRef, useState } from 'react';
import { BiSolidUser } from 'react-icons/bi';
import { BsSearch, BsCart } from 'react-icons/bs';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import { useCartDetail } from '../Context/CartContext';
import { useSearchQueryContext } from '../Context/SearchQueryContext';
import { useSearchRecommendationContext } from '../Context/SearchRecommedation';


const MobileNav = () => {

    const { cartItem } = useCartDetail();

    const navigate = useNavigate();

    const { user } = useAuth();

    const NavigateToCart = () => {
        if (user !== null) {
            navigate('/delivery/cart');
        } else {
            navigate('/login');
        }

    }

    // if (user) {
    //     useEffect(() => {
    //         const fetchCartItems = async () => {
    //             const { email } = user;
    //             //console.log(email);
    //             try {
    //                 const response = await axios.get(`https://food-delivery-sand.vercel.app/auth/cartItem?email=${email}`);
    //                 //console.log(response);
    //                 setCartItem(response.data);
    //             }
    //             catch (err) {
    //                 console.log(err);
    //             }
    //         }
    //         fetchCartItems();
    //     });
    // }
    const toggleUserMenu = () => {
        navigate('/myProfile');
    }


    return (
        <>
            <div className='flex flex-column justify-between px-6 py-4 shadow-md md:hidden'>
                <h1 className='font-bold text-3xl'>zelo</h1>
                <div className='relative'>
                    <div className='flex items-center gap-3'>
                        <span className='w-10 h-10 flex items-center' onClick={NavigateToCart}><BsCart className='w-full h-full text-pink-700' />
                            {user &&
                                <span className='bg-red-600 rounded-full text-xs p-1 absolute text-white left-6 -top-1'>
                                    {cartItem.length}
                                </span>
                            }
                        </span>
                        <button
                            className='w-8 border border-black rounded-full p-1'
                            onClick={toggleUserMenu} // Toggle the user menu on button click
                        >
                            <BiSolidUser className='w-full h-full text-rose-600' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

const LargeScreenNav = () => {

    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]); // State to hold suggestions
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const { query, handleQuery } = useSearchQueryContext();

    const [suggest, setSuggest] = useState(false);
    const suggestionRef = useRef(null);

    const querySuggestionRef = useRef(null);

    const { recommendedQuery, handleRecommendedQuery, fetchRecommedationQuery } = useSearchRecommendationContext();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggest && suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setSuggest(false);
            }
        };

        if (suggest) {
            setSearchInput("");
            window.addEventListener('click', handleClickOutside);
        } else {
            window.removeEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [suggest]);

    useEffect(() => {
        setHighlightedIndex(-1);
    }, [recommendedQuery]);

    useEffect(() => {
        if (highlightedIndex && querySuggestionRef.current) {
            const highlightedItem = querySuggestionRef.current.querySelector(`li:nth-child(${highlightedIndex + 1})`);
            // console.log(highlightedItem);
            if (highlightedItem) {
                highlightedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
            }
        }
        setSearchInput(recommendedQuery[highlightedIndex]);
        // console.log(querySuggestionRef.current);
    }, [highlightedIndex])

    const handleSearchInputChange = (e) => {
        const input = e.target.value;
        setSearchInput(input);
        handleQuery(input);
        fetchRecommedationQuery();
    };

    const ShowSuggestions = () => {
        return (
            <ul ref={querySuggestionRef}>
                {recommendedQuery.map((item, index) => (
                    <li
                        key={index}
                        style={{ backgroundColor: highlightedIndex === index ? 'pink' : 'transparent' }}
                        className='p-2 text-black hover:text-gray-700 cursor-pointer rounded-xl'
                        onClick={() => navigate(`/delivery?category=${item}`)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        )
    }

    const handleSearchSubmit = () => {
        handleQuery(searchInput);
        navigate(`/delivery?category=${searchInput}`);
    };

    const handleClickOfSuggest = () => {
        setSuggest(true);
    }

    const KeyUpAndDownFunctionality = (e) => {
        if (e.key === 'ArrowDown') {
            console.log(highlightedIndex);
            e.preventDefault();
            setHighlightedIndex((prevIndex) => {
                return prevIndex < recommendedQuery.length - 1 ? prevIndex + 1 : prevIndex;
            })
            // console.log(recommendedQuery);
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) => {
                return prevIndex > 0 ? prevIndex - 1 : prevIndex
            });
        } else if (e.key === 'Enter' && highlightedIndex !== -1) {
            setSearchInput("");
            setSuggest(false);
            if (recommendedQuery.length > 0) {
                navigate(`/delivery?category=${recommendedQuery[highlightedIndex]}`);
            } else {
                handleQuery(searchInput);
                navigate(`/delivery?category=${searchInput}`);
            }
            handleRecommendedQuery("");
        }
    }

    const { cartItem } = useCartDetail();

    const [profile, setProfile] = useState(false);

    const handleProfile = () => {
        setProfile(!profile);
    }

    const { user, setUserState } = useAuth();

    const popUpButton = `flex justify-end pe-4 ps-7 `;

    const handleClick = () => {
        setProfile(!profile);
    }

    const navigate = useNavigate();

    //handle the logout button
    const handleLogout = () => {
        // Clear user data in context
        setUserState(null);
        setProfile(!profile);
        navigate('/');
    }

    const handleCartBtn = () => {
        console.log(user);
        console.log(cartItem.length);
    }

    const handleDeleteAccount = () => {
        navigate('/delete/account');
    }

    return (
        <>
            <div className='flex flex-column justify-between px-20 py-4 shadow-md hidden md:flex'>
                <div className='flex flex-column gap-3 w-2/3'>
                    <h1 className='font-bold text-3xl'>zelo</h1>
                    <div className="w-full flex flex-column border-2 border-black-400 p-2">
                        <BsSearch
                            className='mt-1 mr-3' />
                        <div className='w-full'>
                            <input
                                type="text"
                                placeholder="Search for restaurant cuisine or dishes"
                                className='w-full focus:outline-none'
                                onClick={handleClickOfSuggest}
                                value={searchInput}
                                onChange={handleSearchInputChange}
                                ref={suggestionRef}
                                onKeyDown={KeyUpAndDownFunctionality}
                            />
                            <div className='relative w-full top-2'>
                                {
                                    suggest && recommendedQuery.length > 0 &&
                                    <div className='absolute bg-pink-500 text-pink-100 w-full max-h-40 overflow-auto rounded p-2'>
                                        <ShowSuggestions />
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className='grid grid-rows-1 grid-flow-col gap-4 items-center'>
                    {user ? (
                        <Link to="/delivery/cart" className='w-10 h-7'>
                            <span className='w-10 h-10 flex'><BsCart className='w-full h-full text-pink-700 relative' />
                                <span className='bg-red-600 rounded-full text-xs p-1 text-white absolute '>
                                    {cartItem.length}
                                </span>
                            </span>
                        </Link>
                    ) : (
                        <Link to="/login" className='w-10 h-7'>
                            <span className='w-10 h-10 flex'><BsCart className='w-full h-full text-pink-700 relative' /></span>
                        </Link>
                    )}
                    <Link to="/login" className='text-gray-500 hover:text-black'>Login</Link>
                    <Link to="/signup" className='text-gray-500 hover:text-black'>Signup</Link>
                    <button className='text-gray-500 hover:text-black' onClick={handleProfile}>Profile</button>
                    {profile && <div className='absolute right-0 top-0 bg-pink-100 flex flex-col rounded-l-2xl space-y-2 w-1/4 '>
                        <p className='py-2 pe-3 ps-20 sm:ps-40 font-bold font-serif' >My Profile</p>
                        <hr className='bg-black h-0.5' />
                        <button className={popUpButton}>Orders</button>
                        <button className={popUpButton}>Wishlist</button>
                        {user && <div className=''>
                            <hr className='bg-black h-0.5' />
                            <button className='float-right pe-4 ps-7 text-lg' onClick={handleLogout}><b>Logout</b></button>
                        </div>}
                        {user &&
                            <button onClick={handleDeleteAccount} className='w-4/5 bg-pink-500 text-lg text-pink-100 mx-auto rounded-2xl py-2'>Delete the user Account</button>
                        }
                        <button onClick={handleClick} className='w-full bg-pink-600 text-pink-100 text-lg p-2 rounded-l-2xl font-serif'>Close</button>
                    </div>}
                </div>
            </div>
        </>
    )
}

const Navbar = () => {
    return (
        <nav>
            <MobileNav />
            <LargeScreenNav />
        </nav>

    )
}

export default Navbar;