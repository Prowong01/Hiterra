"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../../lib/utils";

import Product from "../database/models/product.model";
import { ProductInterface } from "../../constants/types";

export async function createProduct(product: ProductInterface) {
  try {
    await connectToDatabase();

    const newProduct = await Product.create(product);

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllProduct() {
  try {
    await connectToDatabase();

    const product = await Product.find();
    if (!Product) throw new Error("Product not found");

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    handleError(error);
  }
}

export async function getProductById(productId: string) {
  try {
    await connectToDatabase();

    const product = await Product.findOne({ objectId: productId });

    if (!product) throw new Error("Product not found");

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    handleError(error);
  }
}

export async function updateProduct(productId: string, product: ProductInterface) {
  try {
    await connectToDatabase();

    const updatedProduct = await Product.findOneAndUpdate({ productId }, product, {
      new: true,
    });

    if (!updatedProduct) throw new Error("Product update failed");

    return JSON.parse(JSON.stringify(updatedProduct));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteHotel(productId: string) {
  try {
    await connectToDatabase();

    const ProductToDelete = await Product.findOne({ productId });

    if (!ProductToDelete) {
      throw new Error("Hotel not found");
    }

    const deletedProduct = await Product.findByIdAndDelete(ProductToDelete._id);
    revalidatePath("/dashboard/product");

    return deletedProduct ? JSON.parse(JSON.stringify(deletedProduct)) : null;
  } catch (error) {
    handleError(error);
  }
}
