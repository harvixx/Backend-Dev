// features/auth/hooks/useRegister.js
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/auth.api'

export function useRegister() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function register(formData) {
        try {
            setLoading(true)
            setError(null)
            await registerUser(formData)
            navigate("/login")
        } catch (error) {
            if (error.response) {
                const data = error.response.data

                // ValidationError — array aata hai
                if (data.errors) {
                    setError(data.errors.join(", "))  // array ko string mein convert
                } else {
                    setError(data.message)  // normal error
                }
            }
        }
        finally {
            setLoading(false)
        }
    }

    return { register, loading, error }
}
