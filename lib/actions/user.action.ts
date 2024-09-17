"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../../lib/utils";

import User from "../database/models/user.model";
import { ClerkUserInterface, UserInterface } from "../../constants/types";

// CREATE
export async function createClerkUser(user: ClerkUserInterface) {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function createUser(user: UserInterface) {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);

    revalidatePath("/dashboard/team");
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// GET
export async function getAllUser() {
  try {
    await connectToDatabase();

    const user = await User.find();
    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// GET USER BY ID
export async function getUserById(clerkId: any) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: clerkId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UDPATE
export async function updateUser(user: UserInterface) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    revalidatePath("/dashboard/team");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE USER
export async function deleteUser(userId: string) {
  try {
    await connectToDatabase();

    // Delete user directly using _id
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new Error("User not found");
    }

    revalidatePath("/dashboard/team");

    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    handleError(error);
  }
}
