import React from "react";

const Home = ({ token, userData }) => {
    if (userData && token) {
        return <>
            <div>
                <h2 className='component-title'>Welcome back, { userData.firstName }!</h2>         
            </div>
        </>
    } else {return <>
        <div>
            <h2 className='component-title'>Welcome to Awesome Shoe Store Name!</h2>
        </div> 
    </>}
};

export default Home;