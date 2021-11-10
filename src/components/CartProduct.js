import React from 'react';

const CartProduct = ({ product, children }) => {
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