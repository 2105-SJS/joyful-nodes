import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {

    return (
        <>
            <h2>Products</h2><br />
            <div className='products-list'>
            {
                products.map(product => (
                    <div key={product.id} className='product'>
                        <img src={product.imgURL} alt={product.name} width='128' height='128'/>       
                        <h4>{product.name}</h4>
                        <p>{product.category}</p>
                        <p>{product.description}</p>
                        <p><b>Price:</b> ${product.price}</p>
                        <Link to={`/products/${product.id}`}>single view</Link>
                    </div>
                ))
            }
            </div>
        </>
    );
};

export default Products;