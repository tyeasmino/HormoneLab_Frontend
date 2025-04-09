import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../components/common/Sidebar';

const ReportsManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a Word (.docx) file");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setIsUploading(true);
      const response = await axios.post('http://127.0.0.1:8000/clients/upload-report/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("File upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className='my-40'>
      <Sidebar />
      <div className="max-w-md mx-auto p-4 border rounded shadow-md bg-white">
        <Toaster />
        <h2 className="text-xl font-bold mb-4">Upload Word Report (.docx)</h2>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".docx"
            onChange={handleFileChange}
            className="mb-4 w-full"
          />
          <button
            type="submit"
            disabled={isUploading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReportsManagement;
