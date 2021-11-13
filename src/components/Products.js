import React from "react";
import { SingleProduct } from ".";
import { Link } from "react-router-dom";

const Products = ({ cart, getCart, products, token }) => {

    return (
        <>
            <h2 className='component-title'>Products</h2><br />
            <div className='products-list'>
            {
                products.map(product => <SingleProduct key={product.id} product={product} cart={cart} getCart={getCart} token={token}>
                {
                <Link to={`/products/${product.id}`}>More details...</Link>
                }
                <h3>Reviews:</h3>
                <p>&#9733; &#9733; &#9733; &#9734; &#9734;</p>
                </SingleProduct>)
            }
            </div>
        </>
    );
};

export default Products;