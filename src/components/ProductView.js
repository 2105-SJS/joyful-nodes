import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { SingleProduct } from '.';
import { callApi } from '../util';

const ProductView = ({ cart, getCart, token }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);

    const getSingleProd = async () => {
        try {
            const response = await callApi({
                url: `products/${productId}`
            })
            if (response) {
                setProduct(response);
            };
        } catch (error) {
            console.error(error);
        };
    };

    const productReviews = async () => {
        try {
                const response = await callApi({
                    url: `reviews/product/${productId}`        
                });
                if (response) {
                    //console.log("@@!!$$", response);
                    setReviews(response);
                };              
        } catch (error) {
            console.error (error);
        };
    };

    useEffect(() => {
        getSingleProd();
        productReviews();
    }, [productId]);

    return <SingleProduct key={product.id} product={product} cart={cart} getCart={getCart} token={token}>
        { <p>{product.description}</p> }
        { <Link to='/products'>Go back</Link>}
    </SingleProduct>
};

export default ProductView;