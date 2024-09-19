import { Types } from 'mongoose';

export interface TeamTableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text';
    children: React.ReactNode;
}

export interface TaskTableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'text' | 'textarea' | 'date' | 'select';
    children: React.ReactNode;
}

export interface ClerkUserInterface {
    clerkId?: string;
    email: string;
    username: string;
    photo?: string;
    phone: string;
}

export interface UserInterface {
    _id: string;
    clerkId?: string;
    email: string;
    username: string;
    photo?: string;
    phone: string;
}

export interface ProductInterface {
    _id: string;
    name: string;
    price: number;
    description?: string;
    category: string;
    photo: string[];
    stock: number;
}

export interface EditProductInterface {
    name: string;
    price: number;
    description: string;
    category: string;
    photo: string[];
    stock: number;
}

export interface TaskInterface {
    _id: string;
    taskName: string;
    taskDescription?: string;
    date: Date;
    cycle: 'Daily' | 'Weekly' | 'Monthly' | 'Custom';
    status: 'To Do' | 'In Progress' | 'Done';
    tag: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface FieldInterface {
    _id?: string;
    fieldName: string;
    cropType?: string;
    location?: {
        coordinates?: [number, number];
        address?: string;
    };
    pic?: Types.ObjectId | string;
    size?: {
        value: number;
        unit: 'hectares' | 'acres' | 'square meters';
    };
    status?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EditFieldInterface extends Omit<FieldInterface, 'pic' | '_id' | 'createdAt' | 'updatedAt'> {
    pic?: string;
  }