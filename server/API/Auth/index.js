import express from 'express';
import bcrypt from 'bcrypt';


import { UserModel } from "../../database/user";

//validation
import { validateSignIn, validateSignUp } from '../../validation/auth';
import passport from 'passport';

require("dotenv").config();

//to avoid reloading or prevent from reloading
const Router = express.Router();

Router.use(express.json());

/*
Route:/signup
Descript:Signup with email and passowrd
params: none
Access: public
Method: POST
*/

Router.post('/signup', async (req, res) => {
    try {
        //check if username or email exists
        // console.log(req.body.credentials);
        await UserModel.findEmailAndPhone(req.body.credentials);
        
        await validateSignUp(req.body.credentials);

        /* const bcryptSalt = await bcrypt.genSalt(8); // hashing 8 times of pwd
        const hashedPassword = await bcrypt.hash(password, bcryptSalt); // to store on behalf of pwd */
        //DB
        const newUser = await UserModel.create(req.body.credentials);
        // console.log(newUser);
        //Auth using jwt token.It is used to exchange msg b/w 2 party securly
        const token = newUser.generateJwtToken();

        return res.status(200).json(newUser);

    } catch (error) {
        // Log the error for debugging purposes
        res.status(500).json({ message: error.message });
    }
});

/*
Route:/signin
Descript:signin with email and pwd
params:none
access:public
method:post
*/

Router.post('/signin', async (req, res) => {
    console.log(req.body.credentials);
    try {

        await validateSignIn(req.body.credentials);

        const user = await UserModel.findEmailAndPassword(req.body.credentials);

        let response;
        if (user) {
            response = { email: user.email, password: user.password }
        }

        const token = user.generateJwtToken();

        return res.status(200).json({ response, status: "Success" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})


/*
Route: /google
descript:google signin
params:none
access:public
methode:get
*/

Router.get('/google', passport.authenticate('google', {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
}))

/*
Route         /cart
Descrip       Add the element in the cart
Params        None
Access        Public
Method        POST
*/

Router.post('/cart', async (req, res) => {
    try {
        //console.log(req.body.credentials);
        const { email, cartItemObjectId, itemTotal } = req.body.credentials;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        user.cart.push({ cartItemObjectId, itemTotal });
        await user.save();
        return res.status(200).json({ message: 'Item added to cart successfully', user });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})


/*
Route         /cartItem
Descrip       get the item in the cart
Params        None
Access        Public
Method        GET
*/

Router.get("/cartItem", async (req, res) => {
    try {
        //console.log(req.query);
        const { email } = req.query;
        //console.log(email);
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json(user.cart);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

/*
Route         /address
Descrip       get the address of the user
Params        None
Access        Public
Method        GET
*/
Router.get('/address', async (req, res) => {
    try {
        //console.log(req.query);
        const { email } = req.query;
        //console.log(email);
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json(user.address);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

})

/*
Route         /newAddress
Descrip       post the address to the user
Params        None
Access        Public
Method        POST
*/
Router.post('/newAddress', async (req, res) => {
    try {
        const userData = req.body.credentials;
        const { email, address } = userData;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        // console.log(address);
        user.address.push(address);
        await user.save();
        return res.status(200).json(user);

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }

})

/*
Route         /myorders
Descrip       post the myorders to the user
Params        None
Access        Public
Method        POST
*/
Router.post('/myorders', async (req, res) => {
    try {
        const { email, cartItem, deliveryAddress, status } = req.body.credentials;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        user.orders.push({ cartItem, deliveryAddress, status });
        await user.save();
        return res.status(200).json(user);

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }

})


/*
Route         /deleteAddress
Descrip       delete the address to the user
Params        None
Access        Public
Method        delete
*/

Router.delete("/deleteAddress", async (req, res) => {
    try {
        const { email, address } = req.body;

        // Find the user by email and remove the specified address from the array
        const updatedUser = await UserModel.findOneAndUpdate(
            { email },
            { $pull: { address } }, // Use $pull to remove the address from the array
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

/*
Route         /updateAddress
Descrip       dupdate the address to the user
Params        None
Access        Public
Method        update
*/

Router.put("/updateAddress", async (req, res) => {
    try {
        const { email, index, updatedAddress } = req.body;

        // Find the user by email and update the address at the specified index
        const updatedUser = await UserModel.findOne({ email });

        if (!updatedUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        if (index < 0 || index >= updatedUser.address.length) {
            return res.status(400).json({ message: "Invalid address index" });
        }

        updatedUser.address[index] = updatedAddress;
        const savedUser = await updatedUser.save();

        return res.status(200).json(savedUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


/*
Route       /updateQuantity
Descrip     update the quantity and quantity total in usersQuantity
Params      None
Access      Public
Method      put
*/

Router.put('/updateQuantity', async (req, res) => {

    try {
        const { email, index, quantity } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not found" });
        }
        user.cart[index].itemTotal = quantity;

        await user.save();

        return res.status(200).json({ user });

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }

})

/*
Route         /cartItem/delete
Descrip       delete the item in the cart
Params        None
Access        Public
Method        PUT
*/
Router.delete("/cartItem/delete", async (req, res) => {
    //console.log("hi");
    try {
        //console.log("Inside try block");
        //console.log(req.body.credentials);
        const { email, cartItemObjectId } = req.body.credentials;
        // console.log(email);
        // console.log(cartItemObjectId);
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const objectIdArray = Array.isArray(cartItemObjectId) ? cartItemObjectId : [cartItemObjectId];

        // console.log(objectIdArray);

        user.cart = user.cart.filter((item) => !objectIdArray.includes(item.cartItemObjectId));

        console.log(user.cart);

        await user.save();
        return res.status(200).json({ message: "Cart item deleted successfully", user });
    } catch (err) {
        //console.log("Inside catch block");
        return res.status(500).json({ message: err.message });
    }
})

/*
Route         /deleteAccount
Descrip       delete the user account
Params        None
Access        Public
Method        DELETE
*/

Router.delete('/deleteAccount', async (req, res) => {
    try {
        
        const { email, password } = req.body;
        // console.log({email});
        // console.log({password});
        const user = await UserModel.findEmailAndPassword({email , password });


        if(user) {
            const findUser = await UserModel.findOneAndDelete({ email });
            return res.status(200).json({ message: "user deleted successfully" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})



/*
Route         /google/callback
Descrip       Google Signin callback
Params        None
Access        Public
Method        GET
*/

Router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        return res.json({ token: req.session.passport.user.token });
    }
);

export default Router;