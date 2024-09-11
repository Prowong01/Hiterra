import { Icons } from '@/components/icons';

// User
export interface UserInterface {
    clerkId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    photo?: string;
    country?: string;
    city?: string;
    phone?: string;
    isAdmin?: boolean;
    userType?: string;
    fullName?: string;
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

export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export interface FooterItem {
    title: string;
    items: {
        title: string;
        href: string;
        external?: boolean;
    }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
