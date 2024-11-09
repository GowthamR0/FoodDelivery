import mongoose from 'mongoose';

const FoodItemsSchema = new mongoose.Schema({
    ImageUrl: String,
    Title: String,
    Type: String,
    Description: String,
    Rating: String,
    Rupees: String,
    Category: String,
    OrderType: String,
});

export const FoodItemsModel = mongoose.model("Items", FoodItemsSchema);