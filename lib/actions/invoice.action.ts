"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

import Invoice from "@/lib/database/models/invoice.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { handleError } from "@/lib/utils";

export async function createInvoice(invoice: any) {
  try {
    await connectToDatabase();

    const newInvoice = await Invoice.create(invoice);

    return JSON.parse(JSON.stringify(newInvoice));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllInvoice() {
  try {
    await connectToDatabase();

    const invoice = await Invoice.find();
    if (!invoice) throw new Error("invoice not found");

    return JSON.parse(JSON.stringify(invoice));
  } catch (error) {
    handleError(error);
  }
}

export async function getinvoiceById(id: string) {
  try {
    await connectToDatabase();
    let o_id = new ObjectId(id);

    const invoice = await Invoice.findOne({"_id":o_id});

    if (!invoice) throw new Error("invoice not found");

    return JSON.parse(JSON.stringify(invoice));
  } catch (error) {
    handleError(error);
  }
}

export async function updateinvoice(id: string, Invoice: any) {
  try {
    await connectToDatabase();
    let o_id = new ObjectId(id);

    const updatedinvoice = await Invoice.findOneAndUpdate({"_id":o_id}, Invoice, {
      new: true,
    });

    if (!updatedinvoice) throw new Error("invoice update failed");

    return JSON.parse(JSON.stringify(updatedinvoice));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteInvoice(id: string) {
  try {
    await connectToDatabase();
    let o_id = new ObjectId(id);

    // Find invoice to delete
    const invoiceToDelete = await Invoice.findOne({"_id":o_id});

    if (!invoiceToDelete) {
      throw new Error("invoice not found");
    }

    // Delete invoice
    const deletedinvoice = await Invoice.findByIdAndDelete(invoiceToDelete._id);
    revalidatePath("/");

    return deletedinvoice ? JSON.parse(JSON.stringify(deletedinvoice)) : null;
  } catch (error) {
    handleError(error);
  }
}
