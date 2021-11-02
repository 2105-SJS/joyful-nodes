import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {

    return (
        <>
            <h2>Products</h2><br />
            {
                products.map(product => (
                    <div key={product.id}>
                        <h4>{product.name}</h4>
                        <p>{product.category}</p>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <Link to={`/products/${product.id}`}>single view</Link>
                    </div>
                ))
            }
        </>
    )
}

export default Products;