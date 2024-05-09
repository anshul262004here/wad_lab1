const express = require('express');
const abc = express();
const path = require('path');
const PORT = 8000;

// Serving static files from the 'public' folder
// abc.use(express.static('public/display.html'));
abc.use(express.static(path.join(__dirname, 'public')));

// Handling the root URL
abc.get('/', function(req, res) {
    res.send('Hello World   dd');
});

// Starting the server
abc.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
});
