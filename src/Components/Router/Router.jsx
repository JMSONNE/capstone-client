import { Route, Routes } from 'react-router-dom'
import Home from '../Home'
import React from 'react'
import Cart from '../Cart'


const Router = () => {
    return (
        <>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>

        </>
    )
}

export default Router