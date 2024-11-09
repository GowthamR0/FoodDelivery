import mongoose from 'mongoose';

const OrderShema = new mongoose.Schema({
    user: {
        email: { type: 'string', required: true },
    },

    orderDetails: [
        {
            food: { type: mongoose.Types.ObjectId, ref: "food" },
            quantity: { type: Number, required: true },
            paymode: { type: String, required: true },
            status: { type: String, default: "placed" },
            deliveryAddress: { type: String, required: true },
            deliveryPhoneNumber: { type: Number, required: true },
            paymentDetails: {
                totalItem: { type: 'String', required: true },
                totalAmount: { type: 'String', required: true }
            },
            Date: { type: 'String', required:true },
            Time: { type: 'String', required: true}
        }
    ],
    orderRating: {
        type: Number,
        require: true,
    }
},
    {
        timestamps: true
    });

export const OrderModel = mongoose.model("Orders", OrderShema);