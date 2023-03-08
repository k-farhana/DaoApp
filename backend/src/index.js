const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const cors = require('cors');
// const File = require('../database/models/File');
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
  
  app.post('/upload',  async (req, res) => {
    const { title, description, summary } = req.body;
    const buffer = `${title} ${description} ${summary}`;
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    const project = new Project({
      title,
      description,
      summary,
      hash,
    });
  
    try {
      await project.save();
      res.status(201).json({hash});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to Post , Project might already exists' });
    }
  });
  
  app.get('/project/:hash', async (req, res) => {
  
    
    try {
      const hash = req.params.hash;
      const projects = await Project.find({hash});
      if(projects.length === 0) {
        
        res.status(404).json({error: "Unable to find Project, Make sure Hash is Valid!"});
        console.log(error);
      }
      else {
        res.status(201).json(projects);
        console.log("sucess")
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to retrieve project' });
      console.log(error)
    }
  });
  


// Start the server
app.listen(5001, () => console.log('Server listening on port 5001'));





