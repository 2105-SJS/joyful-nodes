import React from 'react';
import { CartProduct } from '.';

const Cart = ({ cart }) => {
    const { products } = cart;
    if (products) {
        return <div className='cart-list'>
        {
         products.map(product => <CartProduct key={product.id} product={product}>
             {
              <div>Quantity: {product.quantity}</div>
             }
         </CartProduct>)
        }
        </div>;
    } else {
        return null
    }
};

export default Cart;