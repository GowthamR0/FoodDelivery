import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
    name:{type:"string",required:"true"},
    city:{type:"string",required:"true"},
    address:{type:"string",required:"true"},
    mapLocation:{type:"string",required:"true"},
    cuisine:[String],
    restaurantTimings: String,
    contactNumber: Number,
    website: String,
    popularDishes: [String],
    averageCost: Number,
    amenities: [String],
    menuImages: {
        type:mongoose.Types.ObjectId,
        ref: "Images"
    },
    menu:{
        type:mongoose.Types.ObjectId,
        ref: "Menus"
    },
    reviews: [{
        type:mongoose.Types.ObjectId,
        ref: "Reviews"
    }],
    Photos: [{
        type:mongoose.Types.ObjectId,
        ref: "Images"
    }],
},
{
    timestamps:true
}
)

export const RestaurantModel = mongoose.model("Restaurants",RestaurantSchema);
