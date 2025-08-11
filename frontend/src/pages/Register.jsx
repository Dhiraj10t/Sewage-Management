import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        name: "",
        phoneNo: "",
        password: ""
    });

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const result = await res.json();
        if (result.success) {
            navigate("/login");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: `url("images/login-bg.jpg")` }}
        >
            {/* Dark overlay for better contrast */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Motion card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/20"
            >
                {/* Logo and Heading */}
                <div className="mb-6 text-center">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-droplets text-sky-400 mx-auto mb-2">
                            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                        </svg>
                        <h1 className="text-2xl font-bold text-white">Sewage Management System</h1>
                        <p className="text-gray-300">Create your account</p>
                    </motion.div>
                </div>

                {/* Form */}
                <form onSubmit={handlesubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-200 font-medium mb-1">Full Name</label>
                        <input
                            onChange={handleChange}
                            value={formData.name}
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2 bg-white/20 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-200 font-medium mb-1">Phone No</label>
                        <input
                            onChange={handleChange}
                            value={formData.phoneNo}
                            name="phoneNo"
                            type="number"
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-2 bg-white/20 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-300"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-200 font-medium mb-1">Password</label>
                        <input
                            onChange={handleChange}
                            value={formData.password}
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-2 bg-white/20 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-300"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full bg-sky-500 text-white py-2 rounded-lg transition-all duration-300 hover:bg-sky-600"
                    >
                        Create Account
                    </motion.button>
                </form>

                {/* Link */}
                <p className="text-center text-sm text-gray-300 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-sky-400 hover:underline font-medium">
                        Sign in here
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
