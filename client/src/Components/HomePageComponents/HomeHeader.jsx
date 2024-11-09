import React, { useEffect, useRef, useState } from 'react';
import backgroundImage from '../../assets/Homepage-Background.avif';
import { FiSearch } from 'react-icons/fi';
import HomeNavbar from './HomeNavbar';
import { useSearchQueryContext } from '../Context/SearchQueryContext';
import { useNavigate } from 'react-router-dom';
import { useSearchRecommendationContext } from '../Context/SearchRecommedation';

const HomeHeader = () => {
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]); // State to hold suggestions
    const { query, handleQuery } = useSearchQueryContext();
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const [suggest, setSuggest] = useState(false);
    const suggestionRef = useRef(null);

    const querySuggestionRef = useRef(null);

    const { recommendedQuery, handleRecommendedQuery, fetchRecommedationQuery } = useSearchRecommendationContext();

    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggest && suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setSuggest(false);
            }
        };

        if (suggest) {
            window.addEventListener('click', handleClickOutside);
        } else {
            setSearchInput("");
            window.removeEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [suggest]);

    useEffect(() => {
        setHighlightedIndex(0);
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


    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        width: '100%',
        height: '100%',
    };

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
                        style={{ backgroundColor: highlightedIndex === index ? 'lightgray' : 'transparent' }}
                        className='p-2 hover:text-pink-500 cursor-pointer'
                        onClick={() => navigate(`/delivery?category=${item}`)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        )
    }

    const handleSearchSubmit = () => {
        console.log("handling");
        handleQuery(searchInput);
        navigate(`/delivery?category=${searchInput}`);
    };

    const handleClick = () => {
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

    return (
        <div className='w-full h-full' style={{ height: '500px' }}>
            <div style={backgroundStyle}>
                <HomeNavbar />
                <div className='h-4/5 w-full flex flex-col items-center justify-center gap-3 px-10'>
                    <div className='bg-pink-600 px-9 py-5 rounded-3xl'>
                        <h1 className='text-2xl text-pink-100 font-bold sm:animate-pulse'>Zelo</h1>
                    </div>
                    <p className='text-2xl text-pink-100 font-bold text-center'>Discover the best food and drinks</p>
                    <div className='flex items-center w-full justify-center'>
                        <FiSearch className='text-pink-600 w-10 bg-gray-300 p-2 h-10 rounded-md rounded-r-none' />
                        <input
                            type='text'
                            className='w-full max-w-xl bg-gray-300 text-xl p-2 ps-4 h-10 rounded-xl rounded-l-none outline-none'
                            placeholder='Search the best Dish'
                            onClick={handleClick}
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            ref={suggestionRef}
                            onKeyDown={KeyUpAndDownFunctionality}
                        />
                    </div>
                    <div className='relative w-full max-w-xl'>
                        {
                            suggest && recommendedQuery.length > 0 &&
                            <div className='absolute bg-white w-full rounded p-2 z-10 max-h-40 overflow-auto'>
                                <ShowSuggestions />
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomeHeader;
