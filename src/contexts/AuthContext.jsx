import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            fetchUserDetails(token)
        }
    }, [])


    const fetchUserDetails = async (token) => {
        try {
            const res = await axios.get('https://hormone-lab-backend.vercel.app/accounts/user_details/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            })
            setUser(res.data)
        } catch {
            console.error('Error fetching user details: ', error);
        }
    }

    const login = async (formData) => {
        try {
            const res = await axios.post(
                "https://hormone-lab-backend.vercel.app/accounts/login/",
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            ) 

            if(res.status === 200) {
                localStorage.setItem('token', res.data.token)
                fetchUserDetails(res.data.token)
                return true
            }
        } catch (error) {
            return false 
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            { children }
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
