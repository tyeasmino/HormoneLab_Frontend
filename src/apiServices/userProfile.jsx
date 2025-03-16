import axios from "axios";
import { useEffect, useState } from "react";

const useProfile = (type, userId, token) => {
    const [profileData, setProfileData] = useState({
        user: '',
        image: '',
        curriculum_vitae: '',
        phone: '',
        location: '',
    });

    const openCloudinaryWidget = (resourceType) => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'dxcwijywg',
                uploadPreset: 'HormoneLab',
                resourceType: resourceType,
                sources: ['local'],
                multiple: false,
                maxFiles: 1,
                folder: 'profile_uploads',
                clientAllowedFormats: resourceType === 'raw' ? ['pdf'] : ['jpg', 'jpeg', 'png'],
            },
            (error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                } else if (result.event === 'success') {
                    const fileUrl = result.info.secure_url;
                    setProfileData(prev => ({
                        ...prev,
                        [resourceType === 'raw' ? 'curriculum_vitae' : 'image']: fileUrl
                    }));
                }
            }
        );
        widget.open();
    };


    const [locations, setLocations] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file' && files[0]) {
            uploadImage(files[0]);  // Automatically upload the image
        } else {
            setProfileData(prev => ({ ...prev, [name]: value }));
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
