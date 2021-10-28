import React, { useEffect, useState } from "react";
import { callApi } from "../util";

const Products = () => {
    const [products, setProducts] = useState([]);

    const allProducts = async () => {
        try {
            const response = await callApi({
                url: "/products"
            })
            console.log(response);
            if (response) {
                setProducts(response);
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allProducts();
    }, [])

    return (
        <>
            {
                products.map(product => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        <p>{product.description}</p>
                    </div>
                ))
            }
        </>
    )
}

export default Products;