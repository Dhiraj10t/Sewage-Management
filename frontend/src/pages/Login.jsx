import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'
import { motion } from 'framer-motion'

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        phoneNo: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3000/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        const result = await res.json()
        if (result.success) {
            alert(result.message)
            login(result.token)
            navigate("/user")
        } else {
            alert(result.message)
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
            style={{
                backgroundImage: "url('images/sewage-bg.png')",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-8 z-10"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="flex justify-center mb-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px"
                        viewBox="0 0 24 24" fill="none" stroke="cyan"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-droplets">
                        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                    </svg>
                </motion.div>

                <h1 className="text-2xl font-bold text-white text-center">Sewage Management System</h1>
                <p className="text-gray-300 text-center mb-6">Sign in to your account</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-200 mb-1">Phone No</label>
                        <input
                            onChange={handleChange}
                            name="phoneNo"
                            type="text"
                            placeholder="Enter phone number"
                            className="w-full px-4 py-2 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-300"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-200 mb-1">Password</label>
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Enter password"
                            className="w-full px-4 py-2 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-300"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-lg shadow-lg"
                    >
                        Sign In
                    </motion.button>
                </form>

                <p className="text-center text-sm text-gray-300 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-cyan-300 hover:underline">
                        Register here
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}

export default Login
