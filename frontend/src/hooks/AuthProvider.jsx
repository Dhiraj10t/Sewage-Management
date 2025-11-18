import React from 'react'
import { useEffect, useState, createContext, useContext } from 'react'
const authcontext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState({})

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
        fetchComplaints()
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("adminToken")
        setToken(null)
    }
    const fetchComplaints = async () => {
        try {
            const res = await fetch("http://localhost:3000/issue/getuser", { headers: { "authorization": `Bearer ${localStorage.getItem('token')}` } })
            const result = await res.json()
            console.log(result)
            setUser(result.user[0] || [])
        } catch (error) {
            console.error("Error fetching user:", error)
        }
    }

    useEffect(() => {
        fetchComplaints()
    }, [])
    return (
        <authcontext.Provider value={{ token, login, logout, user }}>
            {children}
        </authcontext.Provider>
    )
}

export const useAuth = () => useContext(authcontext)
