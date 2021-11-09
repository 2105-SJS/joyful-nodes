import React from "react";

const Home = ({ token, userData }) => {
    if (userData && token) {
        return <>
            <div>
                Welcome back, { userData.firstName }!         
            </div>
        </>
    } else return <>
        <div>
            <h1>Welcome to Awesome Shoe Store Name!</h1>
        </div>
    </>
}

export default Home;