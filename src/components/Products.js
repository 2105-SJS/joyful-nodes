import React from "react";
import { SingleProduct } from ".";
import { Link } from "react-router-dom";

const Products = ({ products }) => {

    return (
        <>
            <h2 className='component-title'>Products</h2><br />
            <div className='products-list'>
            {
                products.map(product => <SingleProduct key={product.id} product={product}>
                {
                <Link to={`/products/${product.id}`}>More details...</Link>
                }
                </SingleProduct>)
            }
            </div>
        </>
    );
};

export default Products;