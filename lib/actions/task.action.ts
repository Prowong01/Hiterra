"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
// import { UserInterface } from "../../constants/types";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../../lib/utils";

export async function saveCompany(values: { companyName: string; salesOwner: string }) {
    // Here you would typically save to your database
    console.log('Saving company:', values);
    // For example:
    // await db.companies.create(values);
  }