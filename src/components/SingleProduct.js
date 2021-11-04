import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../util";

const handleAddtoCart = async (event) => {
    try {
        
    } catch (error) {
        console.error (error);
    };
};

const SingleProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const singleProduct = async () => {
            try {
                const response = await callApi({
                    url: `/products/${productId}`
                })
                if (response) {
                    setProduct(response);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        singleProduct();
    }, [productId]);

    return (
        <div className='product'>
            <img src={product.imgURL} alt={product.name} width='128' height='128'/>                
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p><b>Price:</b> ${product.price}</p>
        </div>
    )
}

export default SingleProduct;