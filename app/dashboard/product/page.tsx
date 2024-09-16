import { ProductInterface } from "../../../constants/types";

import ProductList from "../../../components/product/ProductList";
import { getAllProduct } from "../../../lib/actions/product.action";

export default async function ProductPage() {
    const product: ProductInterface[] = await getAllProduct();
    return (
        <div>
            <ProductList initialData={product} />
        </div>
    );
}