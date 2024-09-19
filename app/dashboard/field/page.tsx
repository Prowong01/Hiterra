import { FieldInterface } from "../../../constants/types";

import FieldList from "../../../components/field/FieldList";
import { getAllFields } from "../../../lib/actions/field.action";

export default async function FieldPage() {
    const field: FieldInterface[] = await getAllFields();
    return (
        <div>
            <h1> Field </h1>
            <FieldList />
        </div>
    );
}