import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { SingleProduct } from '.';
import { callApi } from '../util';

const ProductView = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([])

    const singleProduct = async () => {
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

    useEffect(() => {
        singleProduct();
    }, [productId]);

    return <>
        <SingleProduct product={product}>

        </SingleProduct>
    </>
};

export default ProductView;