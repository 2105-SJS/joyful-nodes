import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom'
import { SingleProduct, ProductReviews } from '.';
import { callApi } from '../util';

const ProductView = ({ reviews, setReviews, cart, getCart, token, userData }) => {
    const { productId } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [stars, setStars] = useState(5);
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
    }, [productId]);

    useEffect(() => {
        productReviews();
    }, []);

    return <>
    <SingleProduct prodClass='single-product' key={product.id} product={product} cart={cart} getCart={getCart} token={token}>
        <div className='description'>
            { <p>{product.description}</p> }
        </div>
        { <br /> }
        {
         token
            ? <form className='submit-form' onSubmit={ async (event) => {
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
                      setTitle('');
                      setContent('');
                      setStars('');
                      productReviews();
                      history.push(`/products/${productId}`);
                    };
                  } catch (error) {
                    console.error(error);
                  };
                }}>                
                <h2 className='review-title'>Write a review</h2>
                <br />
                <input type ="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <br />
                <input type ="text" className='content-field' placeholder="Content" value={content} onChange={(event) => setContent(event.target.value)}></input>
                <br />
                <fieldset>
                    <label><b>Rating: </b></label>
                    <select
                        className='star-select'
                        name='stars' 
                        placeholder={stars}
                        value={stars}                    
                        onChange={(e) => setStars(e.target.value)}>
                        <option value='5'>★★★★★</option>
                        <option value='4'>★★★★☆</option>
                        <option value='3'>★★★☆☆</option>
                        <option value='2'>★★☆☆☆</option>
                        <option value='1'>★☆☆☆☆</option>
                    </select>
                </fieldset>
                <br />
                <button type="submit">Submit</button>
                <br />
              </form>
              : null
        }
        <br />
        { reviews.length > 0 ? <h3 className='review-title'>Reviews: </h3> : null }
        <br />
        <div className='reviews'>
            { reviews.map(review => <ProductReviews key={review.id} title={review.title} rId={review.id} content={review.content} stars={review.stars} authorId={review.userId} userId={userId} productId={productId} productReviews={productReviews}>
            </ProductReviews>)}
        </div>
        { <Link to='/products' className='users-link'>Go back</Link>}

    </SingleProduct>
    </>
};

export default ProductView;