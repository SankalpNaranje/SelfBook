import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactAudioPlayer from 'react-audio-player';

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState('');

  useEffect(() => {
    // Fetch all songs when the component mounts
    axios
      .get("http://localhost:5000/api/songRoutes/all-songs") // Replace with your server URL
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  }, []);

  const playSong = (audioFilePath) => {
    // Remove "src/components" from the path
    const formattedPath = audioFilePath.replace('src/components/', '');

    // Set the selectedSong to the formatted path
    setSelectedSong(formattedPath);
  };

  return (
    <div>
      <h2>All Songs</h2>
      <ul>
        {songs.map((song) => (
          <li key={song._id}>
            <button onClick={() => playSong(song.audio)}>Play</button>
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
  
      {/* Display the audio player only when selectedSong is truthy */}
      {selectedSong && (
        <div>
          <h3>Now Playing: {selectedSong}</h3>
          <ReactAudioPlayer
            src={selectedSong} // Use selectedSong here
            autoPlay
            controls
            onPlay={() => console.log("Audio is playing")}
            onPause={() => console.log("Audio is paused")}
            onEnded={() => console.log("Audio playback ended")}
            onError={(e) => console.error("Audio error:", e)}
          />
        </div>
      )}
    </div>
  );
};

export default AllSongs;





