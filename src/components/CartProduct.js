import React from 'react';
import { callApi } from '../util';

const CartProduct = ({ cart, product, children }) => {
    console.log(cart)
    const handleRemoveFromCart = async () => {
        try {
            const response = await callApi ({ url: ''})
        } catch (error) {
            console.error (error);
        };
    };

    return (
        <div className='cart-product'>
            <img className='prodIMG' src={product.imgURL} alt={product.name} width='48' height='48'/>                
            <h3>{product.name}</h3>
            <p><b>Price:</b> ${product.price}</p>
            { children }
        </div>
    )
}

export default CartProduct;