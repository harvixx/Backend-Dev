// features/auth/hooks/useLogout.js
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { logout } from '../services/auth.api'

export function useLogout() {
    const { setuser } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    async function logoutUser() {
        try {
            setLoading(true)
            await logout()
        } catch (error) {
            console.error(error)
        }
        // try/catch ke baad — hamesha chalega
        setuser(null)
        navigate("/login")
        setLoading(false)
    }

    return { logoutUser, loading }
}