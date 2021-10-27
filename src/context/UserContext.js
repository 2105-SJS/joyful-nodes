import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    // global variables/state go here

    return (
        <UserContext.Provider
            value={{
                // global values to be passed down
            }}
        >{children}</UserContext.Provider>
    )
}

export {
    UserContext,
    UserProvider
}