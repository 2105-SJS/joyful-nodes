import React, { useState } from "react";
import { callApi } from "../util";

const SingleProduct = ({ cart, children, getCart, product, token }) => {
    const [message, setMessage] = useState('');
    let foundProd;
    if (cart.products) {
        foundProd = cart.products.find(prod => prod.id === product.id);
    };
    
    const handleAddtoCart = async (event) => {
        event.preventDefault();
        try {
            if (cart && product) {
                const prodId = Number(product.id);
                const { id } = cart;
                if (id) {
                    const response = await callApi({
                        url: `orders/${id}/products`,
                        method: 'POST',
                        token,
                        body: { quantity: 1, productId: prodId }            
                    });
                    if (response) {
                        setMessage(`Item was added to the cart!`)
                        await getCart();
                        return response;
                    };   
                };
            };
        } catch (error) {
            console.error (error);
        };
    };

    const productReviews = async () => {
        try {
            if (product) {
                const prodId = Number(product.id)
                const response = await callApi({
                    url: `reviews/product/${prodId}`         
                });
                if (response) {
                    return response;
                };    
            };            
        } catch (error) {
            console.error (error);
        };
    };

   //const reviews = await productReviews();

    return product 
        ? <>
            <div className='product'>
                <img className='prodIMG' src={product.imgURL} alt={product.name} width='128' height='128'/>                
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p><b>Price:</b> ${product.price}</p>
                { !foundProd && <button onClick={handleAddtoCart}>Add to cart</button> }
                <br />
                { message && <div>{message}</div> }
                { children }
      
            </div>
        </> 
        : 'loading...'
}

export default SingleProduct;