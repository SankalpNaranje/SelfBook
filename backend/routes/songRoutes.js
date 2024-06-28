const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
// const Addteam = require("../models/Teaminfo");
const multer = require('multer');
const fs = require('fs');
const Song = require('../models/Songs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/components/Audio');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "_" + file.originalname); // Add the uniqueSuffix before the filename
    }
});

const upload = multer({ storage: storage });

router.post('/upload-audio', upload.single('audio'), async (req, res) => {
    try {
      const { title, artist } = req.body;
      const audio = req.file.path;
  
      const newSong = new Song({
        title,
        artist,
        audio,
      });
  
      const savedSong = await newSong.save();
  
      res.json(savedSong);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/all-songs', async (req, res) => {
    try {
      const songs = await Song.find();
      res.json(songs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/play/:songId', async (req, res) => {
    const songId = req.params.songId;
  
    try {
      const song = await Song.findById(songId);
  
      if (!song) {
        return res.status(404).json({ error: 'Song not found' });
      }
  
      // Get the audio file path from the song document
      const audioFilePath = song.audio;
  
      // Send the audio file path in the response
      res.json({ audioFilePath });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  module.exports = router;