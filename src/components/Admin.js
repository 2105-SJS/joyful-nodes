import React, { useContext, useEffect, useState } from "react";
import { callApi } from '../util';

const Admin = () => {
    const [adminUsers, setAdminUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [inStock, setInStock] = useState("");
    const [category, setCategory] = useState("");
    const [imgURL, setImgUrl] = useState("");

    const postProduct = async () => {
        try {
            const response = await callApi({
                url: "/products",
                method: "POST",
                body: {
                    title,
                    description,
                    price,
                    inStock,
                    category,
                    imgURL
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    const getAdminUsers = async () => {
        try {
            const response = await callApi({
                url: "/users",
            })
            if (response) {
                setAdminUsers(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const titleHandler = (event) => {
        setTitle(event.target.value);
    }

    const descriptionHandler = (event) => {
        setDescription(event.target.value);
    };

    const priceHandler = (event) => {
        setPrice(event.target.value);
    }

    const inStockHandler = (event) => {
        setInStock(event.target.value);
    }
    const categoryHandler = (event) => {
        setCategory(event.target.value);
    }

    const imgHandler = (event) => {
        setImgUrl(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        postProduct();

        setTitle("");
        setDescription("");
        setPrice("")
        setInStock(false);
        setCategory("");
        setImgUrl("");
    }

    useEffect(() => {
        getAdminUsers();
    }, []);

    return (
        <>
            <h3 style={{ color: "white" }}>Post a product</h3>
            <form className="submit-form" onSubmit={submitHandler}>
                <input type="text" placeholder="title" value={title} onChange={titleHandler} />
                <input type="text" placeholder="description" value={description} onChange={descriptionHandler} />
                <input type="text" placeholder="price" value={price} onChange={priceHandler} />
                <input type="text" placeholder="category" value={category} onChange={categoryHandler} />
                <input type="text" placeholder="imgURL" value={imgURL} onChange={imgHandler} />
                <input type="text" placeholder="inStock? true or false" value={inStock} onChange={inStockHandler} />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Admin;