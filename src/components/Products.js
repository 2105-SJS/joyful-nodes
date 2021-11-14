import React, { useState } from "react";
import { Search, SingleProduct } from ".";
import { Link } from "react-router-dom";

const Products = ({ cart, getCart, products, token,reviews }) => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <>            
            <h2 className='component-title'>Products</h2><br />
            <input className='search' type='text' placeholder='search' onChange={(event) => setSearchTerm(event.target.value)} />
            <div className='products-list'>
            {
            products 
                ? products.filter((val) => {
                    if (searchTerm == '') {
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                    }).map(product => <SingleProduct key={product.id} product={product} cart={cart} getCart={getCart} token={token}>
                {
                <Link to={`/products/${product.id}`}>More details...</Link>
                }
                { <br /> }
                </SingleProduct>)
                : null
            }
            </div>
        </>
    );
};

export default Products;

