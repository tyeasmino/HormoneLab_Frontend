import axios from "axios";
import { useEffect, useState } from "react";

const useProfile = (type, userId, token) => {
    const [profileData, setProfileData] = useState({
        user: '',
        image: '',
        due: '',
        extra_paid: '',
        phone: '',
        location: '',
    });

    const [locations, setLocations] = useState([]);
    
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setProfileData({ ...profileData, [name]: files[0] });
        } else {
            setProfileData({ ...profileData, [name]: value });
        }
    };

    const fetchProfile = async () => {
        try {
            const endpoint = type === 'me' ? `executives/marketing-executive` : 'fitFinders/fit-finder';
            const res = await axios.get(
                `https://hormone-lab-backend.vercel.app/${endpoint}/${userId}/`,
                { headers: { Authorization: `Token ${token}` } }
            );

            if (res.data) {
                setProfileData({
                    ...profileData,
                    ...res.data,
                });
            }
        } catch (error) {
            console.log('Error fetching profile:', error);
        }
    };

    // Upload image function for profile image
    const uploadImage = async (image) => {
    };
    
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!token) {
            alert('You are not logged in.');
            return;
        }

        const updatedProfileData = { ...profileData };
        const profileImageUrl = await uploadImage(profileData.image);

        updatedProfileData.image = profileImageUrl || profileData.image;

        const endpoint = type === 'me' ? `executives/marketing-executive` : 'fitFinders/fit-finder';
        try {
            const res = await axios.put(
                `https://hormone-lab-backend.vercel.app/${endpoint}/${userId}/`,
                updatedProfileData,
                { headers: { Authorization: `Token ${token}` } }
            );

            if (res.status === 200) {
                setProfileData(updatedProfileData);
            } else {
                console.log('Profile update failed.');
            }
        } catch (error) {
            console.log('Error during the profile update:', error);
        }
    };

        // Fetching locations
        const fetchLocations = async () => {
            try {
                const res = await axios.get('https://hormone-lab-backend.vercel.app/clients/locations/');
                setLocations(res.data); // Set the locations state with the response data
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };



    useEffect(() => {
        fetchLocations(); // Fetch locations on component mount
        if (userId) {
            fetchProfile(); // Fetch the profile if userId exists
        }
    }, [userId]);

    return {
        profileData,
        handleChange,
        locations, // Return locations to use in the component
        handleUpdateProfile,
    };
};

export default useProfile;