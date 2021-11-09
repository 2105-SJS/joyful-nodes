import React from 'react';
import { CartProduct } from '.';

const Cart = ({ cart }) => {
    const { products } = cart;
    if (products) {
        return <>
        {
         products.map(product => <CartProduct key={product.id} product={product}>

         </CartProduct>)
        }
        </>;
    } else {
        return null
    }
};

export default Cart;