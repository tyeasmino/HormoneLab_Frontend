import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const HospitalAuthorityProfile = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const [profileData, setProfileData] = useState({
    image: '',
    phone: '',
    hospital_name: '',
    user: '',
    location: ''
  });

  const [locations, setLocations] = useState([]);
  const [isLocationSet, setIsLocationSet] = useState(false);

  useEffect(() => {
    fetchLocations();
    if (user?.ha) fetchProfile();
  }, [user?.ha]);

  const fetchLocations = async () => {
    try {
      const res = await axios.get('https://hormone-lab-backend.vercel.app/clients/all_locations/');
      setLocations(res.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/${user.ha}/`,
        { headers: { Authorization: `Token ${token}` } }
      );
      if (res.data) {
        setProfileData(prev => ({ ...prev, ...res.data }));
        if (res.data.location) setIsLocationSet(true);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0] && name === 'image') {
      openCloudinaryWidget('image');
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const openCloudinaryWidget = (resourceType) => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dxcwijywg',
        uploadPreset: 'HormoneLab',
        resourceType,
        sources: ['local'],
        multiple: false,
        maxFiles: 1,
        folder: 'profile_uploads',
        clientAllowedFormats: resourceType === 'raw' ? ['pdf'] : ['jpg', 'jpeg', 'png'],
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
        } else if (result.event === 'success') {
          const fileUrl = result.info.secure_url;
          setProfileData(prev => ({
            ...prev,
            image: fileUrl,
          }));
        }
      }
    );
    widget.open();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      ...profileData,
      location: isLocationSet ? profileData.location : profileData.location, // Just for clarity
    };

    try {
      const res = await axios.put(
        `https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/${user.ha}/`,
        updatedProfile,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success('Profile updated successfully!');
        setProfileData(res.data);
      } else {
        toast.error('Profile update failed!');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Something went wrong while updating.');
    }
  };

  return (
    <section className="w-[500px] m-auto shadow p-5">
      <div className="flex flex-col gap-5 relative">
        <div>
          <h2 className="md:text-3xl font-bold text-center">Update Your Profile</h2>
          <p className="text-center">Ensure your profile is updated to get orders</p>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <section className="flex gap-5">
            <div className="w-2/3">
              {/* Location */}
              <div className="flex flex-col mb-5">
                <label className="font-semibold text-sm" htmlFor="location">Location</label>
                <select
                  name="location"
                  value={profileData.location ?? ""}
                  onChange={handleChange}
                  disabled={isLocationSet}
                  className="block w-full p-2 text-sm text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-heading disabled:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:disabled:bg-gray-700"
                >
                  <option value="" disabled>Select a Location</option>
                  {locations.map((loc) => (
                    <option
                      key={loc.id}
                      value={loc.id}
                      style={{ color: 'black' }} // This forces dropdown text to be black
                    >
                      {loc.location_name}
                    </option>
                  ))}
                </select>

                {isLocationSet && (
                  <p className="mt-2 text-sm text-gray-500">Location cannot be changed.</p>
                )}
              </div>


              {/* Hospital Name */}
              <div className="flex flex-col mb-5">
                <label className="font-semibold text-sm" htmlFor="hospital_name">Hospital Name</label>
                <input
                  type="text"
                  name="hospital_name"
                  value={profileData.hospital_name}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col mb-5">
                <label className="font-semibold text-sm" htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300"
                />
              </div>
            </div>

            {/* Profile image */}
            <div className="w-1/3">
              <button type="button" className="bg-bg-dark text-sm px-3 py-1 rounded-md text-white" onClick={() => openCloudinaryWidget('image')}>
                Upload Image
              </button>
              {profileData.image && (
                <img src={profileData.image} alt="Profile" className="w-20 h-20 mt-2 rounded-xl" />
              )}
            </div>
          </section>

          <div className="flex justify-center mt-5">
            <button type="submit" className="bg-heading bg-bg-dark px-5 py-2 text-sm text-white rounded">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HospitalAuthorityProfile;
