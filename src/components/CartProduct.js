import React from 'react';

const CartProduct = ({ product, children }) => {
    return (
        <div className='product'>
            <img src={product.imgURL} alt={product.name} width='128' height='128'/>                
            <h3>{product.name}</h3>
            <p><b>Price:</b> ${product.price}</p>
            { children }
        </div>
    )
}

export default CartProduct;