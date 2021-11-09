import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../util";

const SingleProduct = ({ cart, getCart, product, token }) => {
    const { productId } = useParams();
    // const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    
    const handleAddtoCart = async (event) => {
        event.preventDefault();
        try {
            if (cart) {
                const prodId = Number(productId)
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

    // useEffect(() => {
    //     getCart();
    //     const singleProduct = async () => {
    //         try {
    //             const response = await callApi({
    //                 url: `products/${productId}`
    //             })
    //             if (response) {
    //                 setProduct(response);
    //             }
    //         }
    //         catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     singleProduct();
    // }, [productId]);

    return (
        <div className='product'>
            <img src={product.imgURL} alt={product.name} width='128' height='128'/>                
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p><b>Price:</b> ${product.price}</p>
            <form onSubmit={handleAddtoCart}>
                <fieldset>
                    <label>Quantity: </label>
                    <input type='number' value={quantity} onChange={(event) => setQuantity(event.target.value)} placeHolder='1' />
                    <button type='submit'>Add to cart</button>
                </fieldset>
                <div>{message}</div>
            </form>
        </div>
    )
}

export default SingleProduct;