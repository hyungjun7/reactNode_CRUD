import React, {useState} from 'react';
import {IsLoggedIn} from './context';


const LoginState = ({children}) => {
    
    const loginSuccess = () => {
        setLoggedIn(prevState=>{
            return {
                ...prevState,
                loggedIn: prevState = true,
            }
        });
    }

    const logout = () => {
        setLoggedIn(prevState=>{
            return {
                ...prevState,
                loggedIn: prevState = false,
            }
        });
    }

    const initState = {
        loggedIn: false,
        loginSuccess,
        logout
    };

    const [loggedIn, setLoggedIn] = useState(initState);

    return (
        <IsLoggedIn.Provider value={loggedIn}>
            {children}
        </IsLoggedIn.Provider>
    );
};

export default LoginState;