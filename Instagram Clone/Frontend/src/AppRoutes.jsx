import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './feature/auth/pages/login';
import Register from './feature/auth/pages/register';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes