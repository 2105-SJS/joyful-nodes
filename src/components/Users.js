import React, { useEffect, useState } from "react";
import { callApi } from "../util";

const Users = ({token}) => {
    const [adminUsers, setAdminUsers] = useState([]);

    const adminGetUsers = async () => {
        try {
            const response = await callApi({
                url: "users",
                token
            });
            console.log(response);
            if (response) {
                setAdminUsers(response);
            };
        } catch (error) {
            console.error (error);
        };
    };

    useEffect(() => {
        adminGetUsers();
    }, [])

    return (
        <>
            {
                adminUsers.map((user) => (
                    <div key={user.id} style={{color: "white"}}>
                        <h3>{user.firstName} {user.lastName}</h3>
                        <h4>{user.email}</h4>
                    </div>
                ))
            }
        </>
    )
}

export default Users;