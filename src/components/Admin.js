import React, { useContext, useEffect, useState } from "react";
import { callApi } from '../util';

const AdminUsers = ({ token }) => {
    const [adminUsers, setAdminUsers] = useState([]);

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

    useEffect(() => {
        getAdminUsers();
    }, []);

    return (
        <>
        {
            adminUsers.map(user => (
                <div key={user.id}>
                    <h3>{user.firstName}</h3>
                </div>
            ))
        }
        </>
    )
}

export default AdminUsers;