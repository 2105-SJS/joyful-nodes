import React, { useEffect, useState } from "react";
import { callApi } from '../util';
import { useHistory, Link } from 'react-router-dom';

const Admin = ({ token, allProducts }) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [inStock, setInStock] = useState(false);
    const [category, setCategory] = useState('');
    const [imgURL, setImgURL] = useState('');

    const postProduct = async () => {
        try {
            const response = await callApi({
                url: 'products',
                method: 'POST',
                body: {
                    name,
                    description,
                    price,
                    inStock,
                    category,
                    imgURL
                }
            })
            if (response) {
                await allProducts();
                setName('');
                setDescription('');
                setPrice(0);
                setInStock(false);
                setCategory('');
                setImgURL('');
                history.push('/admin');
            };
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <>
            <Link className='users-link' style={{color: "white", fontSize: "30px"}} to="/users">View Users</Link>
            <h2 className='component-title'>Post a product</h2>
            <form className="submit-form" onSubmit={postProduct}>
                <input type="text" placeholder="title" value={name} onChange={(event) => setName(event.target.value)} />
                <input type="text" placeholder="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                <fieldset>
                    $<input type="text" placeholder="price" value={price} onChange={(event) => setPrice(event.target.value)} />
                </fieldset>
                <input type="text" placeholder="category" value={category} onChange={(event) => setCategory(event.target.value)} />
                <input type="text" placeholder="imgURL" value={imgURL} onChange={(event) => setImgURL(event.target.value)} />
                <br />
                <fieldset>
                    <label>In stock: </label>
                    <select placeholder='no' onChange={(event) => { setInStock(event.target.value) }}>
                        <option value='false'>NO</option>
                        <option value='true'>YES</option>
                    </select>
                </fieldset>
                <br />
                <button type='submit' disabled={!name || !description || !price || !category || !imgURL}>Submit</button>
                <br />
                <span><i>All fields must be completed</i></span>
            </form>
        </>
    );
};

export default Admin;