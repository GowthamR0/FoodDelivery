import express from 'express';
import { MenuModel } from '../../database/menu';
import { ImageModel } from '../../database/image';

const Router = express.Router();

Router.use(express.json());

/*
Route:/list
Descript:get the menu based on list
Params:/_id
Access:public
Method:get
*/

Router.get("/list/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const menus = await MenuModel.find(_id);
        return res.json({menus});
    }catch(err) {
        return res.status(500).json({error: err.message});
    }
});

/*
Route:/image
Descript:get the menu image based on the id
Params:_id
Access:public
Method:get
*/

Router.get("/image", async (req, res) => {
    try {
        const { _id } = req.params;
        const menus = await ImageModel.findOne(_id);

        return res.json({menus});

    }catch(err) {
        return res.status(500).json({error: err.message});
    }
});

export default Router;