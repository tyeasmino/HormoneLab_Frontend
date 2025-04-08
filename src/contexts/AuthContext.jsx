import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const [profileData, setProfileData] = useState(null); // ✅ holds profile image
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserDetails(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserDetails = async (token) => {
        try {
            const res = await axios.get('https://hormone-lab-backend.vercel.app/accounts/user_details/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            setUser(res.data);
            fetchProfileImage(res.data); // ✅ call to get image based on role
        } catch (error) {
            console.error('Error fetching user details: ', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchProfileImage = async (userData) => {
        try {
            let imageUrl = null;

            if (userData.me) {
                const res = await axios.get("https://hormone-lab-backend.vercel.app/executives/marketing-executive/",{
                    headers: { Authorization: `Token ${token}` },
                  });
                const meProfile = res.data.find(exec => exec.user === userData.user_id);
                imageUrl = meProfile?.image || null;
            } else if (userData.ha) {
                const res = await axios.get(`https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/${userData.ha}/`,{
                    headers: { Authorization: `Token ${token}` },
                  });
                imageUrl = res.data?.image || null;
            }

            setProfileData({ image: imageUrl });
        } catch (error) {
            console.error('Error fetching profile image: ', error);
            setProfileData(null);
        }
    };

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
            );

            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                fetchUserDetails(res.data.token);
                return true;
            }
        } catch (error) {
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setProfileData(null); // ✅ clear image
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, profileData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
