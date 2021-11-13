import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { callApi } from '../util';

const CartProduct = ({ cart, getCart, product, token, children }) => {
    const history = useHistory();
    const [quantity, setQuantity] = useState(1);
    

    const handleRemoveFromCart = async () => {
        try {
            const orderProd = await callApi ({ url: `orders/${cart.id}/${product.id}`, token });
            const response = await callApi ({ url: `order_products/${orderProd.id}`, method: 'DELETE', token})
            if (response) {
                await getCart();
                history.push('/cart')
            }
        } catch (error) {
            console.error (error);
        };
    };

    useEffect(() => {
        setQuantity(product.quantity)
      }, [quantity]);

    return (
        <div className='cart-product'>
            <img className='prodIMG' src={product.imgURL} alt={product.name} width='48' height='48'/>                
            <h3>{product.name}</h3>
            <p><b>Price:</b> ${product.price}</p><div>Quantity: <input className='cart-quant' type='number' onChange={(event) => setQuantity(event.target.value)} min='1' placeholder={quantity} /></div>
            <button onClick={handleRemoveFromCart}>Remove</button>
        </div>
    )
}

export default CartProduct;