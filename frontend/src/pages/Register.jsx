import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
    const navigate = useNavigate()
    const [formData, setformData] = useState({
        name: "",
        phoneNo: "",
        password: ""
    })
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        const res = await fetch('http://localhost:3000/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const result = await res.json()
        if (result.success) {
            navigate("/login")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            {/* Logo */}
            <div className="mb-10 flex mt-8 flex-col items-center">
                <div ><svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-droplets text-primary-500 text-2xl mr-3 h-20 w-12" data-replit-metadata="client/src/components/layout/header.tsx:26:14" data-component-name="Droplets"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path></svg></div>
                <h1 className="text-3xl font-bold mb-2 text-gray-900">Sewage Management System</h1>
                <p className="text-gray-700">Create your account</p>
            </div>

            {/* Form Card */}
            <div className="w-full border-[1.5px] mb-14 border-gray-200 max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Register</h2>
                <p className="text-gray-500 mb-6">Create a new account to submit and track complaints</p>

                <form onSubmit={handlesubmit}>
                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                        <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            value={formData.name}
                            name='name'
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Phone No</label>
                        <input
                            onChange={(e) => handleChange(e)}
                            value={formData.phoneNo}
                            type="number"
                            name='phoneNo'
                            placeholder="Enter your phone no"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            onChange={(e) => handleChange(e)}
                            value={formData.password}
                            type="password"
                            name='password'
                            placeholder="Create a password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-sky-500 text-white py-2 rounded-lg transition-all duration-300 hover:bg-sky-700 "
                    >
                        Create Account
                    </button>
                </form>

                {/* Sign-in Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-black hover:underline font-medium">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register
