import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { SingleProduct, ProductReviews } from '.';
import { callApi } from '../util';

const ProductView = ({ reviews, setReviews, cart, getCart, token, userData }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [stars, setStars] = useState('');
    const userId = userData.id;

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
                const id = parseInt(productId, 10);
                const response = await callApi({
                    url: `reviews/product/${id}`,
                    token        
                });
                if (response) {
                    setReviews(response);
                };              
        } catch (error) {
            console.error (error);
        };
    };

    useEffect(() => {
        getSingleProd();
       productReviews();
    }, [productId, reviews]);

    return <>
    <SingleProduct key={product.id} product={product} cart={cart} getCart={getCart} token={token}>
        { <p>{product.description}</p> }
        { <br /> }
        <h2>Write a review</h2>
        <form className='user-form' onSubmit={ async (event) => {
            event.preventDefault();
            try {
                const response = await callApi({
                  url: 'reviews',
                  method: 'POST',
                  body: {
                          title,
                          content,
                          stars,
                          userId,
                          productId
                  }
                });
                if (response) {
                  console.log("[][][]", response)
                  setTitle('');
                  setContent('');
                  setStars('');
                };
              } catch (error) {
                console.error(error);
              };
            }}>
            <input type ="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
            <br />
            <input type ="text" placeholder="Content" value={content} onChange={(event) => setContent(event.target.value)}></input>
            <br />
            <input type ="text" placeholder="Stars" value={stars} onChange={(event) => setStars(event.target.value)}></input>
            <br />
            <button type="submit">Submit</button>
            <br />
          </form>
        <br />
        { reviews.length > 0 ? <h3>Reviews: </h3> : null }
        { reviews.map(review => <ProductReviews key={review.id} title={review.title} rId={review.id} content={review.content} stars={review.stars} authorId={review.userId} userId={userId} productId={productId}>
        </ProductReviews>)}
        { <Link to='/products'>Go back</Link>}

    </SingleProduct>
    </>
};

export default ProductView;