import React, { useState } from "react";
import { callApi } from "../util";

const SingleProduct = ({ cart, children, getCart, product, token }) => {
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    
    const handleAddtoCart = async (event) => {
        event.preventDefault();
        try {
            if (cart && product) {
                const prodId = Number(product.id)
                const response = await callApi({
                    url: `orders/${cart.id}/products`,
                    method: 'POST',
                    token,
                    body: { quantity, productId: prodId }            
                });
                if (response) {
                    setMessage(`${quantity} items were added to the cart!`)
                    await getCart();
                    setQuantity(1);
                    return response;
                };    
            };            
        } catch (error) {
            console.error (error);
        };
    };

    return product 
        ? <>
            <div className='product'>
                <img className='prodIMG' src={product.imgURL} alt={product.name} width='128' height='128'/>                
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p><b>Price:</b> ${product.price}</p>
                <form className='submit-form' onSubmit={handleAddtoCart}>
                    <fieldset>
                        <label>Quantity: </label>
                        <input type='number' value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                        <button type='submit'>Add to cart</button>
                    </fieldset>
                    <div>{message}</div>
                </form>
                <br />

                { children }

            </div>
        </> 
        : 'loading...'
}

export default SingleProduct;