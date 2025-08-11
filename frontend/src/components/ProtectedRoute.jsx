import React from 'react'
import { useState,useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const token=localStorage.getItem('token')
    console.log(token)
        return token ? <Outlet/> : <Navigate to="/login" replace />
}

export default ProtectedRoute
