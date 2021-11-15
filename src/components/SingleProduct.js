import React, { useState } from "react";
import { callApi } from "../util";

const SingleProduct = ({ cart, children, prodClass, getCart, product, token }) => {
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
            console.error(error);
        };
    };

    return product 
        ? <>
            <div className={prodClass}>
                <img className='prodIMG' src={product.imgURL} alt={product.name} width='128' height='128' />
                <h3 className='prod-title'>{product.name}</h3>
                <br />
                <p>{product.category}</p>
                <br />
                <p><b>Price:</b> ${product.price}</p>
                <br />
                <p className='stock'><b>In stock: {product.inStock ? <span className='yes-stock'>yes</span> : <span className='no-stock'>no</span>}</b></p>
                <br />
                {!foundProd && token && <button onClick={handleAddtoCart}>Add to cart</button>}
                {foundProd && token && <span class='alert'>Already in your cart!</span>}
                <br />
                {message && <div>{message}</div>}
                {children}

            </div>
        </>
        : 'loading...'
}

export default SingleProduct;