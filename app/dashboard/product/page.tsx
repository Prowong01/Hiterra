import ProductList from "../../../components/product/ProductList";
import { ProductInterface } from "../../../constants/types";

import { createProduct } from "../../../lib/actions/product.action";
import CreateNewProductButton from "../../../components/product/CreateNewProductButton";

// This would typically come from a database or API
const fetchData = async (): Promise<ProductInterface[]> => {
    // Replace this with your actual data fetching logic
    return [
        {
            _id: "1",
            name: "Smartphone X",
            price: 699.99,
            description: "Latest model with advanced features and long battery life.",
            category: "Electronics",
            photo: ["https://example.com/smartphone-x-1.jpg", "https://example.com/smartphone-x-2.jpg"]
        },
        {
            _id: "2",
            name: "Leather Jacket",
            price: 199.99,
            description: "Classic style leather jacket, perfect for all seasons.",
            category: "Clothing",
            photo: ["https://example.com/leather-jacket-1.jpg"]
        },
        {
            _id: "3",
            name: "Stainless Steel Water Bottle",
            price: 24.99,
            category: "Home & Kitchen",
            photo: ["https://example.com/water-bottle-1.jpg", "https://example.com/water-bottle-2.jpg"]
        },
        {
            _id: "4",
            name: "Wireless Earbuds",
            price: 129.99,
            description: "High-quality sound with noise cancellation.",
            category: "Electronics",
            photo: ["https://example.com/earbuds-1.jpg", "https://example.com/earbuds-2.jpg"]
        },
        {
            _id: "5",
            name: "Yoga Mat",
            price: 39.99,
            description: "Non-slip, eco-friendly yoga mat.",
            category: "Sports & Outdoors",
            photo: ["https://example.com/yoga-mat-1.jpg"]
        },
    ];
};

export default async function ProductPage() {
    const product = await fetchData();
    return (
        <div>
            <CreateNewProductButton />
            {/* <ProductList initialData={product} /> */}
        </div>
    );
}