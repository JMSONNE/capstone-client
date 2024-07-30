import { Route, Routes } from 'react-router-dom'
import Home from '../Home'
import React from 'react'
import Cart from '../Cart'
import Profile from '../Profile'
import Login from '../Login'
import Register from '../Register'


const Router = () => {
    return (
        <>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

        </>
    )
}

export default Router