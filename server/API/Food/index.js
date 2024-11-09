import express from 'express';
import { FoodModel } from '../../database/allModels';
import { ValidateCategory, ValidateRestaurantId } from '../../validation/food';
import { FoodItemsModel } from '../../database/foodItems';

const Router = express.Router();
Router.use(express.json());

/*
Route:/
Descript:get the food based on restaurant
Params:_id
Access:public
Method:get
*/

// Router.get('/:_id', async (req, res) => {
//     try {

//         await ValidateRestaurantId(req.params);

//         const { _id } = req.params;
//         const food = await FoodModel.find({
//             restaurant: _id
//         });

//         return res.status(200).json({ food });
//     } catch (err) {
//         return res.status(500).json({ Error: err.message });
//     }

// });

/*
Route         /food
Descrip       get the food
Params        None
Access        Public
Method        GET
*/

// Router.get("/" ,async(req,res) => {
//     return res.json("In food");
// })

Router.get('/menu', async (req, res) => {
    try {
        // console.log(req.query);
        const { item } = req.query;
        const fetchItem = await FoodItemsModel.findOne({ _id: item });
        if (!fetchItem) {
            return res.status(404).json({ message: "Item Not Found" });
        }
        // console.log(fetchItem);
        return res.status(200).json({ fetchItem });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

/*
Route:/r
Descript:get the foods based on restaurant
Params:/category
Access:public
Method:get
*/

Router.get("/r/:category", async (req, res) => {
    try {

        await ValidateCategory(req.params);

        const { category } = req.params;
        const food = await FoodModel.find({
            category: { $regex: category, $options: "i" }
        });
        return res.status(200).json({ food });

    } catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});

/*
Route:/menu
Des:get the food items
Params:orderType
Method:get
Access:private
*/

Router.get("/menu/:orderType", async (req, res) => {
    try {
        const { orderType } = req.params;
        let query = { OrderType: { $regex: orderType, $options: "i" } };

        const { category } = req.query;
        // console.log(category);

        if (category) {
            const categoryWithoutWhitespace = category.replace(/\s/g, ''); // Remove whitespace
            query.Category = { $regex: categoryWithoutWhitespace, $options: "i" };
        }
        
        const food = await FoodItemsModel.find(query);
        // console.log(food);

        if (food) {
            return res.status(200).json({ message: food });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

/*
Route:/menu/delete
Des:delete the  menu
Params:none
Method:delete
Access:private*/

Router.delete("/menu/delete", async (req, res) => {
    try {
        const { objectId } = req.body;

        const food = await FoodItemsModel.findByIdAndDelete(objectId);
        if (food) {
            return res.status(200).json({ message: "Food item deleted" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

/*
Route:/menu/update
Des:update the  menu
Params:none
Method:put
Access:private*/

Router.put("/menu/update", async (req, res) => {
    try {

        const { objectId, updatedData } = req.body;

        const food = await FoodItemsModel.findByIdAndUpdate(objectId, updatedData, { new: true });

        if (food) {
            return res.status(200).json({ message: "Food items updated successfully" });
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

/*
Route:/new
Des:add the new menu
Params:none
Method:post
Access:private*/


Router.post('/new', async (req, res) => {
    try {
        const { FoodDetails } = req.body;

        const Food = await FoodItemsModel.create(FoodDetails);
        if (Food) {
            return res.status(200).json({ message: Food });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
})



export default Router;