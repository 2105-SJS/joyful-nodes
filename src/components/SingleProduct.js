import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../util";

const SingleProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const singleProduct = async () => {
            try {
                const response = await callApi({
                    url: `/products/${productId}`
                })
                console.log(response);
                if (response) {
                    setProduct(response);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        singleProduct();
    }, [productId]);

    return (
        <>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
        </>
    )
}

export default SingleProduct;