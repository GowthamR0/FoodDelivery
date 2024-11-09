import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../Components/Context/LoaderContext';

const parentElement = `w-full sm:mx-auto flex flex-col space-y-2`;
const labelElement = `w-full capitalize`;
const inputElement = `text-black p-1 ps-3 sm:p-2 rounded-xl `;
const buttonParentElement = `w-full sm:mx-auto max-w-sm flex flex-row justify-between`;
const buttonStyle = `border p-1 w-2/5 rounded-xl hover:bg-transparent hover:text-white bg-pink-100 text-black transistion duration-1000`;
const headStyle = `
        bg-slate-900
        flex 
        flex-col 
        text-white 
        text-lg 
        font-medium 
        space-y-5
        w-full p-5 
        mx-auto 
        max-w-sm 
        lg:max-w-md
        border 
        border-red-500 
        rounded-2xl
        drop-shadow-2xl 
 `;

const Items = () => {

    const navigate = useNavigate();

    const { handleLoading } = useLoader();

    useEffect(() => {
        handleLoading(false);
    })

    const [Image, SetImage] = useState("");
    const [Title, setTitle] = useState("");
    const [Type, setType] = useState("");
    const [Rating, setRating] = useState("");
    const [Category, setCategory] = useState("Briyani");
    const [Rupees, setRupees] = useState("");
    const [OrderType, setOrderType] = useState("delivery");
    const [Description, setDescription] = useState("");
    //let ImageUrl;
    // const itemDetails = {
    //     ImageUrl,Title,Type,Rating,Category,Rupees
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append("file", Image);

            const imageUrl = await axios.post("https://food-delivery-sand.vercel.app/image/", formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            console.log(imageUrl.data.uploadImage.Location);
            const ImageUrl = imageUrl.data.uploadImage.Location;
            console.log(ImageUrl);
            const food = await axios.post("https://food-delivery-sand.vercel.app/food/new", {
                FoodDetails: { ImageUrl, Title, Type, Rating, Category, Rupees, OrderType, Description }
            });
            if (food.status === 200) {
                navigate(`/delivery/category?${Type}`);
                SetImage("");
                setType("");
                setTitle("");
                setRating("");
                setRupees("");
                setDescription("");
            }
            console.log(food);
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleBack = () => {
        navigate('/');
    }

    return (
        <div className='w-full h-full bg-slate-800 p-10'>
            <form className={headStyle} onSubmit={handleSubmit}>
                <div className={parentElement}>
                    <label className={labelElement} >Image</label>
                    <input type="file" name="file" accept='image/*' className='text-sm lg:w-3/5' required onChange={(e) => SetImage(e.target.files[0])} />
                </div>
                <div className={parentElement}>
                    <label className={labelElement}>Title</label>
                    <input type="text" name="title" value={Title} onChange={(e) => setTitle(e.target.value)} placeholder='Briyani' className={inputElement} required />
                </div>
                <div className={parentElement}>
                    <label className={labelElement}>Type</label>
                    <input type="text" name="type" value={Type} required onChange={(e) => setType(e.target.value)} className={inputElement} />
                </div>
                <div className={parentElement}>
                    <label className={labelElement}>OrderType</label>
                    <select className={inputElement} name="orderType" value={OrderType} required onChange={(e) => setOrderType(e.target.value)}>
                        <option value="delivery">Delivery</option>
                        <option value="dining" >Dining</option>
                        <option value="nightlife" >NightLife</option>
                    </select>
                </div>
                <div className={parentElement}>
                    <label className={labelElement}>Description</label>
                    <textarea type="text" name="description" value={Description} required onChange={(e) => setDescription(e.target.value)} className={inputElement} />
                </div>
                <div className={parentElement}>
                    <label className={labelElement}>Rating</label>
                    <input type="text" name="rating" value={Rating} required onChange={(e) => setRating(e.target.value)} className={inputElement} />
                </div>
                <div className={parentElement}>
                    <label className={labelElement}>Category</label>
                    <select className={inputElement} name="category" value={Category} required onChange={(e) => setCategory(e.target.value)} >
                        <option value="Briyani">Briyani</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Chicken">Chicken</option>
                        <option value="Chaat">Chaat</option>
                        <option value="Burger">Burger</option>
                        <option value="Shawarma">Shawarma</option>
                        <option value="Cake">Cake</option>
                        <option value="FriedRice">FriedRice</option>
                    </select>
                </div>
                <div className={parentElement}>
                    <label className={labelElement}>Rupees</label>
                    <input type="text" name="rupees" value={Rupees} required onChange={(e) => setRupees(e.target.value)} className={inputElement} />
                </div>
                <div className={buttonParentElement} >
                    <button className={buttonStyle} type='submit' >Submit</button>
                    <button className={buttonStyle} onClick={handleBack} >Back</button>
                </div>
            </form>
        </div>
    )
}

export default Items;