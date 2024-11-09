import express from "express";

import { RestaurantModel } from "../../database/restaurant";

//validation
import { validateRestaurantCity, validateRestaurantSearchString } from "../../validation/restaurant";
import { ValidateRestaurantId } from "../../validation/food";



const Router = express.Router();
Router.use(express.json());

/*
Route:/
Descript:get all restaurant based on city
Params:None
Access:public
Method:get
*/

Router.get("/", async (req, res) => {
    try {
        
        await validateRestaurantCity(req.query);

        const { city } = req.query;
        const restaurant = await RestaurantModel.find({ city });
        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

/*
Route:/
Descript:get the restaurant based on _id
Params:_id
Access:public
Method:get
*/

Router.get("/:_id", async (req, res) => {
    try {

        await ValidateRestaurantId(req.params);

        const { _id } = req.params;
        const restaurant = await RestaurantModel.findOne({ _id });

        if (!restaurant)
            return res.status(404).json({ message: "No restaurant found" });

        return restaurant.status(200).json({restaurant});
    }catch(error) {
        return res.status(500).json({ message:error.message });
    }
    
});

/*
Route:/search
Descript:get the restaurant based on search
Params:none
Access:public
Method:get
*/

Router.get('/search', async (req, res) => {
    try {

        await validateRestaurantSearchString(req.body);
        
        const {searchString} = req.body;

        const restaurant = await RestaurantModel.find({
            name:{$regex: searchString, $options:"i"}
        })
        return res.status(200).json({restaurant})   
    } catch(error) {
        return res.status(500).json({error:"error.message"});
    }    
});


export default Router;


