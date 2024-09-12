export interface EditableTableProps<T extends { key: string }> {
    initialData: T[];
    columns: Array<{
        title: string;
        dataIndex: keyof T;
        width: string;
        editable: boolean;
        inputType?: 'number' | 'text';
    }>;
}

export interface UserDataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

export interface TaskDataType {
    key: string;
    name: string;
    status: string;
    cycle: number;
    createdAt: Date;
    updatedAt: Date;
}