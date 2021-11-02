import React from "react";
// import { useParams } from "react-router-dom";

const SingleProduct = ({ product }) => {

    return (
        <>
            <h4>{product.name}</h4>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
        </>
    )
}

export default SingleProduct;