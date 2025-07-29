var express = require('express');
var cors = require('cors');
var multer = require('multer'); // Add multer for file handling
require('dotenv').config();

var app = express();

// Configure multer for file uploads
var upload = multer({ dest: 'uploads/' }); // Stores files temporarily

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// File upload endpoint
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Return file metadata
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
