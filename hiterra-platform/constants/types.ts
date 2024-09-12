
// User
export interface UserInterface {
    clerkId: string;
    email?: string;
    userName?: string;
    photo?: string;
    phone?: string;
};

// Invoice
interface Item {
    courseTitle: string;
    customer: string;
    courseDate: any;
    noOfPax: number;
    venue: string;
    scheme: string;
    noOfDays: number;
    unitPrice: number;
    total: number;
}

export interface InvoiceInterface extends Document {
    date: any;
    refNo: string;
    purchaseOrderNo: string;
    paymentTerm: string;
    grandTotal: number;
    items: Item[];
    createdAt?: Date;
    updatedAt?: Date;
    _id: string;
}