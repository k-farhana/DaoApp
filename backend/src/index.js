const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const cors = require('cors');
const File = require('../database/models/File');
const Project = require("../database/models/Project");

// Connection to DataBase 
require('../database/DBconnect');

//express server
const app = express();
app.use(express.json());
app.use(cors());
  // Set up file upload storage
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  
  app.post('/upload', upload.single('file'), async (req, res) => {
    const { originalname, mimetype, buffer } = req.file;
    const hash = crypto.createHash('sha256');
    hash.update(buffer);
    const fileHash = hash.digest('hex');
  
    const file = new File({
      name: originalname,
      type: mimetype,
      data: buffer,
      hash:fileHash,
    });
  
    try {
      await file.save();
      res.status(201).json({fileHash});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to upload file' });
    }
  });
  
  app.get('/files/:hash', async (req, res) => {
    
    try {
      const hash = req.params.hash;
      const files = await File.find({hash});
      if(files.length === 0) {
        
        res.status(404).json({error: "Unable to find File, Make sure Hash is Valid!"});
      }
      else {
        res.status(201).json(files);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to retrieve files' });
    }
  });
  


// Start the server
app.listen(5000, () => console.log('Server listening on port 5000'));





