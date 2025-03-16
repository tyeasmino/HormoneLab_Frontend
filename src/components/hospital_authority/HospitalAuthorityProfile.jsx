import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

const HospitalAuthorityProfile = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const [profileData, setProfileData] = useState({
    image: "",
    phone: "",
    hospital_name: "",
    user: "",
    location: ""
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (e.target.multiple) {
      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
      setProfileData({
        ...profileData,
        [name]: selectedValues,
      });
    } else if (files && files[0]) {
      const file = files[0];

      if (name === "image") {
        openCloudinaryWidget(file);
      }
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


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/${user.ha}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (res.data) {
          setProfileData((prevData) => ({
            ...prevData,
            ...res.data,
          }));
        }
      } catch (error) {
        console.error("Error fetching profile: ", error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      alert("You are not logged in.");
      return;
    }


    let profileImageUrl = profileData.image;
    if (profileData.image instanceof File) {
      profileImageUrl = await uploadToCloudinary(profileData.image);
    }

    const updatedProfileData = {
      ...profileData,
      image: profileImageUrl || profileData.image,
    };

    try {
      const res = await axios.put(
        `https://hormone-lab-backend.vercel.app/hospitals/hospital_authorities/${user.ha}/`,
        updatedProfileData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (res.status === 200) {
        alert("Profile updated successfully.");
        setProfileData((prevData) => ({
          ...prevData,
          ...updatedProfileData,
        }));
      } else {
        console.log("Profile update failed.");
      }
    } catch (error) {
      console.error("Error during the profile update:", error);
    }
  };

  
  const [locations, setLocations] = useState([]);
  const [isLocationSet, setIsLocationSet] = useState(false);

  // 🔹 Fetch Locations
  const fetchLocations = async () => {
    try {
      // const endpoint = profileData.location ?
      //   'https://hormone-lab-backend.vercel.app/clients/all_locations/' :
      //   'https://hormone-lab-backend.vercel.app/clients/locations/';

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

        // Check if location is already set
        if (res.data.location) {
          setIsLocationSet(true);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
    if (user.ha) {
      fetchProfile();
    }
  }, [user.ha, profileData.location]);


  return (
    <section className='w-[500px] m-auto shadow p-5'>
      <div className='flex flex-col gap-5 relative'>
        <div>
          <h2 className='md:text-3xl font-bold text-center'>Update Your Profile</h2>
          <p className=' text-center'>Ensure your profile is updated to get orders</p>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <section className='flex gap-5'>
            <div className='w-2/3'>
              {/* Location Field */}
              <div className='flex flex-col mb-5'>
                <label className='font-semibold text-sm' htmlFor="location">Location</label>
                <select
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  disabled={isLocationSet}  // ✅ Disable if location is already set
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer"
                >
                  <option value="" disabled>Select a Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.location_name}
                    </option>
                  ))}
                </select>

                {isLocationSet && (
                  <p className="mt-2 text-sm text-gray-400">Location cannot be changed.</p>
                )}


              </div>


              {/* Hospital Name Field */}
              <div className='flex w-full flex-col mb-5'>
                <label className='font-semibold text-sm' htmlFor="hospital_name">Hospital Name</label>
                <input
                  type="text"
                  name="hospital_name"
                  value={profileData.hospital_name}
                  onChange={handleChange}
                  placeholder="Hospital Name"
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                />
              </div>

              {/* Phone Field */}
              <div className='flex w-full flex-col mb-5'>
                <label className='font-semibold text-sm' htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                />
              </div>
            </div>

            <div className='w-1/3'>
              {/* Profile Image Upload */}
              <div className="mb-4">

                <button type="button" className='bg-bg-dark text-sm px-3 py-1 rounded-md text-white' onClick={() => openCloudinaryWidget('image')}> Upload Image </button>
                {profileData.image && <img src={profileData.image} alt="Profile" className="w-20 h-20 mt-2 rounded-xl" />}
              </div>

              {/* Curriculum Vitae Upload */}
              {/* <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700">Curriculum Vitae (CV)</label>
                  <button type="button" className='btn' onClick={() => openCloudinaryWidget('raw')}> Upload CV </button>
                  {profileData.curriculum_vitae && (
                    <a href={profileData.curriculum_vitae} target="_blank" rel="noopener noreferrer" className='btn btn-secondary'> Download CV </a>
                  )}
                </div> */}
            </div>
          </section>

          {/* Submit Button */}
          <div className='flex text-center md:items-end justify-center mx-5'>
            <button className='bg-heading px-5 py-2 bg-bg-dark text-sm text-white rounded' type="submit">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default HospitalAuthorityProfile