"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../../lib/utils";

import Product from "../database/models/product.model";
import { ProductInterface, EditProductInterface } from "../../constants/types";

export async function createProduct(product: ProductInterface) {
  try {
    await connectToDatabase();

    await Product.create(product);

    const allProducts = await Product.find();

    revalidatePath("/dashboard/product");
    return JSON.parse(JSON.stringify(allProducts));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllProduct() {
  try {
    await connectToDatabase();

    const product = await Product.find();
    if (!Product) throw new Error("Product not found");

    revalidatePath("/dashboard/product");
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

export async function updateProduct(productId: string, product: Partial<EditProductInterface>) {
  try {
    await connectToDatabase();

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: product },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) throw new Error("Product update failed");

    revalidatePath("/dashboard/product");
    return JSON.parse(JSON.stringify(updatedProduct));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(productId: string) {
  try {
    await connectToDatabase();

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      throw new Error("Product not found");
    }

    revalidatePath("/dashboard/product");

    return JSON.parse(JSON.stringify(deletedProduct));
  } catch (error) {
    handleError(error);
  }
}
