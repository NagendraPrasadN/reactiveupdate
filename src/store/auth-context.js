import React, { useCallback, useEffect, useState } from 'react';

const AuthContext = React.createContext({
    token: null,
    isLoggedIn: false,
    login: (token, expirationTime) => { },
    logout: () => { },
})

const checkTokenExpires = (expirationTime) => {
    const currentTime = new Date().getTime();
    const expTime = new Date(expirationTime).getTime();
    const remTime = expTime - currentTime;

    return remTime;
}
let logoutTimer;

const fetchToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');
    const remTime = checkTokenExpires(storedExpirationTime);

    if (remTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }
    return {
        token: storedToken,
        expTime: remTime
    }
}

export const AuthContextProvider = (props) => {
    const currItem = fetchToken();
    let loctoken;
    if (currItem) {
        loctoken = currItem.token;
    }
    const [token, setToken] = useState(loctoken);

    const isLogin = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }, [])

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        const remainTime = checkTokenExpires(expirationTime)

        logoutTimer = setTimeout(logoutHandler, remainTime);
    }

    useEffect(() => {
        if (currItem) {
            setTimeout(() => {
                logoutHandler();
            }, currItem.expTime);
        }
    }, [currItem, logoutHandler])



    const defaultvalue = {
        token: token,
        isLoggedIn: !!isLogin,
        login: loginHandler,
        logout: logoutHandler,
    };
    return (
        <AuthContext.Provider value={defaultvalue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;