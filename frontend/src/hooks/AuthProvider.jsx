import React from 'react'
import { useEffect, useState, createContext, useContext } from 'react'
const authcontext = createContext()

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null)

    const getToken = () => {
        const stored = localStorage.getItem('token')
        if (stored) {
            setToken(stored)
        }
    }

    useEffect(() => {
        getToken()
    }, [])

    const login = (e) => {
        localStorage.setItem("token", e)
        getToken()
    }

    const logout=()=>{
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <authcontext.Provider value={{token,login,logout}}>
            {children}
        </authcontext.Provider>
    )
}

export const useAuth=()=>useContext(authcontext)
