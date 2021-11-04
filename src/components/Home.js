import React from "react";

const Home = ({ user }) => {
    return <>
        { 
        user.firstName
            ? <div>
                Welcome back, { user.firstName }!         
              </div>
            : <div className="App">
                <h1>Welcome to Awesome Shoe Store Name!</h1>
              </div>
        }
    </>
}

export default Home;