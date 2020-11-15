import React from 'react';

export const IsLoggedIn = React.createContext({
    loggedIn: false,
    login: () => {},
    logout: () => {},
});