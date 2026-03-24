import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../feature/auth/pages/login';
import Register from '../feature/auth/pages/register';
import Home from '../../src/feature/Home/pages/Home';
import { useAuth } from '../feature/auth/context/AuthContext';
import { ProtectedRoutes } from './ProtectedRoutes';
import CreatePost from '../feature/post/pages/createPost';
import Profile from '../feature/profile/pages/Profile';

export function AppRoutes() {
    const { user, authLoading } = useAuth();
    if (authLoading) {
        return <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
            <p className="text-white">Loading...</p>
        </div>
    }
    return (
        <Routes>
            {/* Public routes — logged in hai toh home pe bhejo */}
            <Route path="/login"
                element={user ? <Navigate to="/home" /> : <Login />}
            />
            <Route path="/register"
                element={user ? <Navigate to="/home" /> : <Register />}
            />

            {/* Protected routes — login nahi toh login pe bhejo */}
            <Route path="/home"
                element={
                    <ProtectedRoutes>
                        <Home />
                    </ProtectedRoutes>
                }
            />
            <Route path='/create-post'
            element={<CreatePost/>}
            />
            <Route path='/profile'
            element={<Profile/>}
            />
            {/* Default */}
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}

