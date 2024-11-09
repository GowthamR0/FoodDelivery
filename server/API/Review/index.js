import express from 'express';

import { ReviewModel } from '../../database/allModels';

const Router = express.Router();
Router.use(express.json());

/*
Route:/new
Descript:add a new review
body:Review data
Params:none
Access:public
Method:post
*/

Router.post('/new' , async (req, res) => {
    try {
        const { reviewData } = req.body;

        await ReviewModel.create(reviewData);
        return res.json({review : "Successfully created review"});
    } catch (err) {
        return res.status(500).json({ error: err.message});
    }
})

/*
Route:/delete
Descript:delete a new review
Params:_id
Access:public
Method:post
*/

Router.post("/delete?:_id" , async(req, res) => {
    try {
        const { _id} = req.params;

        await ReviewModel.findByIdAndDelete(_id);
        return res.json({Message: "Successfully deleted"});
    } catch (err) { 
        return res.status(500).json({ error: err.message});
    }
});

export default Router;