import React, { useEffect, useState } from "react";
import { callApi } from '../util';
import { useHistory } from 'react-router-dom';

const Admin = ({ token, allProducts }) => {
    const history = useHistory();
    const [adminUsers, setAdminUsers] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(Number);
    const [inStock, setInStock] = useState(0);
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
            console.log(error);
        };
    };

    const getAdminUsers = async () => {
        try {
            const response = await callApi({
                url: "users",
            })
            if (response) {
                setAdminUsers(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // const titleHandler = (event) => {
    //     setTitle(event.target.value);
    // }

    // const descriptionHandler = (event) => {
    //     setDescription(event.target.value);
    // };

    // const priceHandler = (event) => {
    //     setPrice(event.target.value);
    // }

    // const inStockHandler = (event) => {
    //     setInStock(event.target.value);
    // }
    // const categoryHandler = (event) => {
    //     setCategory(event.target.value);
    // }

    // const imgHandler = (event) => {
    //     setImgUrl(event.target.value);
    // }

    // const submitHandler = (event) => {
    //     event.preventDefault();

    //     postProduct();

    //     setTitle("");
    //     setDescription("");
    //     setPrice("")
    //     setInStock(false);
    //     setCategory("");
    //     setImgUrl("");
    // }

    useEffect(() => {
        if (token) {
            getAdminUsers();
        }
    }, []);

    return (
        <>
            <h3 style={{ color: "white" }}>Post a product</h3>
            <form className="submit-form" onSubmit={postProduct}>
                <input type="text" placeholder="title" value={name} onChange={(event) => setName(event.target.value)} />
                <input type="text" placeholder="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                <input type="text" placeholder="price" value={price} onChange={(event) => setPrice(event.target.value)} />
                <input type="text" placeholder="category" value={category} onChange={(event) => setCategory(event.target.value)} />
                <input type="text" placeholder="imgURL" value={imgURL} onChange={(event) => setImgURL(event.target.value)} />
                <fieldset>
                    <label>In stock: </label>
                    <select placeholder='no' onChange={(event) => {setInStock(event.target.value)}}>
                        <option value='false'>NO</option>
                        <option value='true'>YES</option>
                    </select>
                </fieldset>
                <button type='submit' disabled={!name || !description || !price || !category}>Submit</button>
            </form>
        </>
    );
};

export default Admin;