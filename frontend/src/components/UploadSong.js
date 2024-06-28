// UploadSong.js (Frontend component to upload songs)
import React, { useState } from 'react';
import axios from 'axios';

const UploadSong = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!title || !artist || !audioFile) {
        alert('Please fill in all fields and select an audio file.');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('audio', audioFile);

      const response = await axios.post('http://localhost:5000/api/songRoutes/upload-audio', formData, {
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      console.log('Song uploaded:', response.data);
      // You can reset the form fields or provide user feedback here.
    } catch (error) {
      console.error('Error uploading song:', error);
      // Handle the error and provide user feedback.
    }
  };

  return (
    <div>
      <h2>Upload a Song</h2>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>Artist:</label>
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <br />
      <label>Audio File:</label>
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadSong;