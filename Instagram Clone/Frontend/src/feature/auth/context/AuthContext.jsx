import { getMe } from "../services/auth.api";

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [user, setuser] = useState(null);
    const [authloading, setauthloading] = useState(true);

    useEffect(() => {
        async function checkUser() {
            try {
                const data = await getMe();
                setuser(data.user)
            } catch (error) {
                setuser(null)
                console.log(error)
            }
            finally {
                setauthloading(false)
            }
        }
        checkUser();
    }, [])

    return (<AuthContext.Provider value={{ user, setuser, authloading }}>
        {children}
    </AuthContext.Provider>)
}

export function useAuth() {
    return useContext(AuthContext);
}