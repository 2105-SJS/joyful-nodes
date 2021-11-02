import React from "react";
import { SingleProduct } from ".";

const Products = ({ products }) => {

    return (
        <>
            <h2>Products</h2><br />
            {
                products.map(product => <SingleProduct key={product.id} product={product} />)
            }
        </>
    )
}

export default Products;