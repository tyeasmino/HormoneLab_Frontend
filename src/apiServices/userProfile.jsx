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

    // 🔹 Handle Input Changes (Including Image Upload)
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === 'file' && files[0]) {
            uploadImage(files[0]);  // Automatically upload the image
        } else {
            setProfileData(prev => ({ ...prev, [name]: value }));
        }
    };

    // 🔹 Upload Image to Cloudinary
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset
        formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.secure_url) {
                setProfileData(prev => ({ ...prev, image: data.secure_url })); // Store Cloudinary URL
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // 🔹 Fetch User Profile
    const fetchProfile = async () => {
        try {
            const endpoint = type === 'me' ? `executives/marketing-executive` : 'fitFinders/fit-finder';
            const res = await axios.get(
                `https://hormone-lab-backend.vercel.app/${endpoint}/${userId}/`,
                { headers: { Authorization: `Token ${token}` } }
            );

            if (res.data) {
                setProfileData(prev => ({ ...prev, ...res.data }));
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    // 🔹 Update Profile (Including Image URL)
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!token) {
            alert('You are not logged in.');
            return;
        }

        const endpoint = type === 'me' ? `executives/marketing-executive` : 'fitFinders/fit-finder';

        try {
            const res = await axios.put(
                `https://hormone-lab-backend.vercel.app/${endpoint}/${userId}/`,
                profileData,
                { headers: { Authorization: `Token ${token}` } }
            );

            if (res.status === 200) {
                alert("Profile updated successfully.");
            } else {
                console.error('Profile update failed.');
            }
        } catch (error) {
            console.error('Error during profile update:', error);
        }
    };

    // 🔹 Fetch Locations
    const fetchLocations = async () => {
        try {
            const res = await axios.get('https://hormone-lab-backend.vercel.app/clients/locations/');
            setLocations(res.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    useEffect(() => {
        fetchLocations();
        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    return {
        profileData,
        setProfileData,  // Ensure setProfileData is returned
        handleChange,
        locations,
        handleUpdateProfile,
    };
};

export default useProfile;
