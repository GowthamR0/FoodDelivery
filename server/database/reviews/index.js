import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    food:{type:mongoose.Types.ObjectId, ref:"Foods"},
    restaurant:{type:mongoose.Types.ObjectId, ref:"Restaurants"},
    user:{type:mongoose.Types.ObjectId, ref:"Users"},
    rating:{type:Number, required:true},
    review:{type:String, required:true},
    photos:[{
        type:mongoose.Types.ObjectId,
        ref:"Images"
    }],
    isRestaurantReview : Boolean,
    isFoodReview : Boolean,
},
{
    timestamps:true
});

export const ReviewModel = mongoose.model("Reviews",ReviewSchema);