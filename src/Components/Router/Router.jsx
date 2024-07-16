import { Route, Routes } from 'react-router-dom'
import Home from '../Home'
import React from 'react'


const Router = () => {
    return (
        <>

            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>

        </>
    )
}

export default Router