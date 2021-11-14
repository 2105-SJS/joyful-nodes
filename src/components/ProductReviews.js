import React from 'react';
import { useHistory } from 'react-router-dom'
import { callApi } from '../util';

const ProductReviews = ({ title, content, stars, authorId, userId, productId, token, rId }) => {
    const history = useHistory();

    const addStars = (stars) => {
        try {
                return <p>{"★".repeat(stars)}{"☆".repeat(5 - stars)}</p>;

        } catch (error) {
            console.error (error);
        };
    };

    const handleDelete = async (event) => {
        try {
            event.preventDefault();
            await callApi({
                url: `reviews/${rId}`,
                method: 'DELETE',
                token
              });
        } catch (error) {
            console.error (error);
        };
    };

    return (
        <div className='review'>
            <h4>{title}</h4>
            <br />
            <p>{content}</p>
            <br />
            <h4>Rating: </h4>
            {addStars(stars)}
            { authorId === userId ? <button onClick={handleDelete} >Delete</button> : null }
            <br />
        </div>
    )
}

export default ProductReviews;