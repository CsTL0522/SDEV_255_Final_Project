const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require("./Database/db.js");
const courseRoutes = require("./Database/courseRoutes")

app.use('/api', courseRoutes);
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes for handling form submissions and redirecting to static pages
app.post('/login', (req, res) => {
    const role = req.body.role;
    if (role === 'student') {
        res.redirect('/public/student.html');
    } else if (role === 'teacher') {
        res.redirect('/public/teacher.html');
    } else {
        res.send('Invalid role');
    }
});

// Serve other static HTML files
app.get('/add_courses.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add_courses.html'));
});

app.get('/create_courses.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'create_courses.html'));
});

app.get('/schedule.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'schedule.html'));
});

//app.listen(3000, () => {
  //  console.log('Server started on http://localhost:3000');
//});