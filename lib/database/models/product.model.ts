import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    photo: {
        type: Array,
    },
    stock: {
        type: Number,
        default: 0,
    }
});

const Product = models?.Product || model("Product", ProductSchema);

export default Product;
