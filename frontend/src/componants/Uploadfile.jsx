import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/UploadFile.css'; // Import your CSS file

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Check if selected file is a CSV file
    if (selectedFile && selectedFile.type !== 'text/csv') {
      setError('Please select a CSV file.');
      setFile(null);
    } else {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setShowProgress(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/file/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.log(percentCompleted);
          setProgress(percentCompleted);
        },
      });

      if (response.ok) {
        navigate('/data');
      } else {
        setError('Upload failed. Please try again.');
      }
    } catch (error) {
      setError('Error uploading file: ' + error.message);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-heading">Upload your file</div>
      <div className="upload-buttons">
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {showProgress && (
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
