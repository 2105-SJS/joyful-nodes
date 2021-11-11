import React from 'react';
import { CartProduct } from '.';

const Cart = ({ cart, getCart, token }) => {
    const { products } = cart;
    
    if (products) {
        return <div className='cart-list'>
        {
         products.map(product => <CartProduct key={product.id} cart={cart} getCart={getCart} product={product} token={token}>
             {
              <div>Quantity: {product.quantity}</div>
             }
         </CartProduct>)
        }
        {
        products.length === 0 && <div className='cart-message'>Your cart is empty</div>
        }
        </div>;
    } else {
        return null
    }
};

export default Cart;