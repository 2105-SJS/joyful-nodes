import React from 'react';
import { CartProduct } from '.';

const Cart = ({ cart, getCart, token }) => {
    const { products } = cart;
    let cartTotal = 0;
    if (products) {
        for (let i = 0; i < products.length; i++) {
            const cartProd = products[i];
            cartTotal = Number(cartTotal) + Number(cartProd.price);
        }
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
            <br />
            <div className='cart-total'>
                <span><b>Total:</b> ${parseFloat(cartTotal).toFixed(2)}</span>
            </div>
        </div>;
    } else {
        return null
    }
};

export default Cart;