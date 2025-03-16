import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import useProfile from '../../apiServices/userProfile';
import axios from 'axios';

const MarketingExecutiveProfile = () => {
  const { user } = useContext(AuthContext);
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
        uploadPreset: 'SkillCrafterCVs',
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
          `https://hormone-lab-backend.vercel.app/executives/marketing-executive/${user.me}`,
          { headers: { Authorization: `Token ${token}` } }
        );
        if (res.data) {
          setProfileData(prev => ({ ...prev, ...res.data }));
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
    try {
      const res = await axios.put(
        `https://hormone-lab-backend.vercel.app/executives/marketing-executive/${user.me}/`,
        profileData,
        { headers: { Authorization: `Token ${token}` } }
      );
      if (res.status === 200) {
        alert("Profile updated successfully.");
      } else {
        console.log("Profile update failed.");
      }
    } catch (error) {
      console.error("Error during the profile update:", error);
    }
  };

  const { locations } = useProfile('me', user.me, localStorage.getItem('token'));


  return (
    <section className='max-w-screen-lg m-auto shadow p-5'>
      <div className='flex flex-col gap-5 relative'>
        <div>
          <h2 className='md:text-3xl font-bold text-gray-800 text-center'>Update Your Profile</h2>
          <p className=' text-center'>Ensure your profile is updated to get orders</p>
        </div>

        {/* <form onSubmit={handleUpdateProfile}>
          <div className='flex flex-col md:flex-row gap-5'>
            <div className='m-5 w-full'>
              <input
                type="text" name="user" id="user" hidden
                value={profileData.user} onChange={handleChange}
              />

              <h6 className='text-[20px] font-bold text-heading'>Shop Details</h6>

              <div className='flex flex-col mb-5'>
                <label className='font-semibold text-sm' htmlFor="shop_address">Location</label>
                <select
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer"
                >
                  <option value="" disabled>Select a Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.location_name}
                    </option>
                  ))}
                </select>
              </div>















              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                  Curriculum Vitae ( CV )
                </label>

                <button type="button" className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer' onClick={() => openCloudinaryWidget()}> Upload CV (PDF) </button>

                {profileData.curriculum_vitae && profileData.curriculum_vitae instanceof File && (
                  <p className="text-xs text-[#425BF5] mt-1">New Image Uploaded</p>
                )}
                {profileData.curriculum_vitae && !(profileData.curriculum_vitae instanceof File) && (
                  <Link to={profileData.curriculum_vitae} target='blank' className='block rounded-lg py-2.5 px-5 w-fit my-2 text-sm text-[#F4F5F7] bg-[#141A34]  appearance-none  focus:outline-none focus:ring-0 focus:border-[#F4F5F7] peer' >  Download CV </Link>
                )}

              </div>






              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                  Profile Image
                </label>

                <input type="file" name="image" onChange={handleChange}
                  className=" file-input file-input-bordered w-full " />
                {profileData.image && profileData.image instanceof File && (
                  <p className="text-xs text-[#425BF5] mt-1">New Image Uploaded</p>
                )}
                {profileData.image && !(profileData.image instanceof File) && (
                  <img src={profileData.image} alt="Attachment Preview" className="w-[100px] h-[100px] mt-2 rounded-xl" />
                )}
              </div>

              <h6 className='text-[20px] font-bold text-heading'>Contact Details</h6>
              <div className='flex w-full flex-col'>
                <label className='font-semibold text-sm' htmlFor="phone">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer'
                />
              </div>
            </div>
          </div>

          <div className='flex text-center md:items-end justify-center md:justify-end mx-5'>
            <button className='bg-heading px-5 py-2 bg-bg-dark text-sm text-white rounded' type="submit">
              Update Profile
            </button>
          </div>
        </form> */}

<form onSubmit={handleUpdateProfile}>
          <div className='mb-4'>
            <label className="text-sm font-medium text-gray-700">Curriculum Vitae ( CV )</label>
            <button type="button" className='btn' onClick={() => openCloudinaryWidget('raw')}> Upload CV (PDF) </button>
            {profileData.curriculum_vitae && (
              <a href={profileData.curriculum_vitae} target="_blank" rel="noopener noreferrer" className='btn btn-secondary'> Download CV </a>
            )}
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Profile Image</label>
            <button type="button" className='btn' onClick={() => openCloudinaryWidget('image')}> Upload Image </button>
            {profileData.image && <img src={profileData.image} alt="Profile" className="w-20 h-20 mt-2 rounded-xl" />}
          </div>
          <button className='bg-blue-600 px-5 py-2 text-sm text-white rounded' type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
};

export default MarketingExecutiveProfile;
