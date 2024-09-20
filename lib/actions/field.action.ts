"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../../lib/utils";

import Field from "../database/models/field.model";
import { FieldInterface } from "../../constants/types";

export async function createField(field: FieldInterface) {
  try {
    await connectToDatabase();

    const newField = await Field.create(field);

    revalidatePath("/dashboard/field");
    return JSON.parse(JSON.stringify(newField));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllFields() {
  try {
    await connectToDatabase();

    const fields = await Field.find().populate('pic', 'name email');
    if (!fields) throw new Error("Fields not found");

    revalidatePath("/dashboard/field");
    return JSON.parse(JSON.stringify(fields));
  } catch (error) {
    handleError(error);
  }
}

export async function getFieldById(fieldId: string) {
  try {
    await connectToDatabase();

    const field = await Field.findById(fieldId).populate('pic', 'username email');

    if (!field) throw new Error("Field not found");

    return JSON.parse(JSON.stringify(field));
  } catch (error) {
    handleError(error);
  }
}

export async function updateField(fieldId: string, field: Partial<FieldInterface>) {
  try {
    await connectToDatabase();

    const updatedField = await Field.findByIdAndUpdate(
      fieldId,
      { $set: field },
      { new: true, runValidators: true }
    ).populate('pic', 'username email');

    if (!updatedField) throw new Error("Field update failed");

    revalidatePath("/dashboard/field");
    return JSON.parse(JSON.stringify(updatedField));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteField(fieldId: string) {
  try {
    await connectToDatabase();

    const deletedField = await Field.findByIdAndDelete(fieldId);

    if (!deletedField) {
      throw new Error("Field not found");
    }

    revalidatePath("/dashboard/field");

    return JSON.parse(JSON.stringify(deletedField));
  } catch (error) {
    handleError(error);
  }
}

export async function getFieldsByPIC(userId: string) {
  try {
    await connectToDatabase();

    const fields = await Field.find({ pic: userId }).populate('pic', 'username email');

    if (!fields) throw new Error("No fields found for this user");

    return JSON.parse(JSON.stringify(fields));
  } catch (error) {
    handleError(error);
  }
}

export async function getFieldsByCropType(cropType: string) {
  try {
    await connectToDatabase();

    const fields = await Field.find({ cropType }).populate('pic', 'username email');

    if (!fields) throw new Error("No fields found with this crop type");

    return JSON.parse(JSON.stringify(fields));
  } catch (error) {
    handleError(error);
  }
}

export async function updateFieldStatus(fieldId: string, status: 'active' | 'inactive' | 'maintenance') {
  try {
    await connectToDatabase();

    const updatedField = await Field.findByIdAndUpdate(
      fieldId,
      { $set: { status } },
      { new: true, runValidators: true }
    ).populate('pic', 'username email');

    if (!updatedField) throw new Error("Field status update failed");

    revalidatePath("/dashboard/field");
    return JSON.parse(JSON.stringify(updatedField));
  } catch (error) {
    handleError(error);
  }
}

export async function recordFieldInspection(fieldId: string, notes: string) {
  try {
    await connectToDatabase();

    const updatedField = await Field.findByIdAndUpdate(
      fieldId,
      {
        $set: {
          lastInspection: new Date(),
          notes: notes
        }
      },
      { new: true, runValidators: true }
    ).populate('pic', 'username email');

    if (!updatedField) throw new Error("Field inspection record failed");

    revalidatePath("/dashboard/field");
    return JSON.parse(JSON.stringify(updatedField));
  } catch (error) {
    handleError(error);
  }
}
