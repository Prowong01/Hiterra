export interface EditableTableProps<T extends { _id: string }> {
    initialData: T[];
    columns: {
        title: string;
        dataIndex: string;
        width?: string;
        editable?: boolean;
        inputType?: 'number' | 'text' | 'select';
        options?: { value: string; label: string }[];
    }[];
    onUpdate: (record: T) => Promise<T | null>;
    onDelete: (id: string) => Promise<T | null>;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text' | 'select';
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

export interface TaskInterface {
    _id: string;
    key: string;
    name: string;
    status: string;
    cycle: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductInterface {
    _id: string;
    name: string;
    price: number;
    description?: string;
    category: string;
    photo: string[];
    quantity: number;
}