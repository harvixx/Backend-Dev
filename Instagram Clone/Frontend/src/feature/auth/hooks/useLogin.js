import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/auth.api";
import { useState } from "react";
export function useLogin() {
    const navigate = useNavigate();
    const { setuser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function login(formData) {
        try {
            setLoading(true)
            setError(null)
            const data = await loginUser(formData);
            setuser(data.user)
            navigate("/")
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Server not reachable");
            }
        } finally {
            setLoading(false)
        }
    }
    return ({login, loading, error})
}