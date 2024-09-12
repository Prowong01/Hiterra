"use server";

import { revalidatePath } from "next/cache";

import Hotel from "@/lib/database/models/hotel.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { handleError } from "@/lib/utils";

export async function createHotel(Hotel: any) {
  try {
    await connectToDatabase();

    const newHotel = await Hotel.create(Hotel);

    return JSON.parse(JSON.stringify(newHotel));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllHotel() {
  try {
    await connectToDatabase();

    const hotel = await Hotel.find();
    if (!Hotel) throw new Error("Hotel not found");

    return JSON.parse(JSON.stringify(hotel));
  } catch (error) {
    handleError(error);
  }
}

export async function getHotelById(HotelId: String) {
  try {
    await connectToDatabase();

    const hotel = await Hotel.findOne({ objectId: HotelId });

    if (!Hotel) throw new Error("Hotel not found");

    return JSON.parse(JSON.stringify(hotel));
  } catch (error) {
    handleError(error);
  }
}

export async function updateHotel(objectId: string, Hotel: any) {
  try {
    await connectToDatabase();

    const updatedHotel = await Hotel.findOneAndUpdate({ objectId }, Hotel, {
      new: true,
    });

    if (!updatedHotel) throw new Error("Hotel update failed");

    return JSON.parse(JSON.stringify(updatedHotel));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteHotel(objectId: string) {
  try {
    await connectToDatabase();

    // Find Hotel to delete
    const HotelToDelete = await Hotel.findOne({ objectId });

    if (!HotelToDelete) {
      throw new Error("Hotel not found");
    }

    // Delete Hotel
    const deletedHotel = await Hotel.findByIdAndDelete(HotelToDelete._id);
    revalidatePath("/");

    return deletedHotel ? JSON.parse(JSON.stringify(deletedHotel)) : null;
  } catch (error) {
    handleError(error);
  }
}
