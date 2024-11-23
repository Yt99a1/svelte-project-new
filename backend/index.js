const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Ensure the images/img directory exists
const dir = path.join(__dirname, 'images', 'img');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir); // Set the destination to the images/img directory
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueFilename); // Set a unique filename
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1000000 // Limit file size to 1MB
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

mongoose.connect(`mongodb://localhost:27017/helloahmad`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Mongo Connected Successfully");
});

// User Schema and Model
const Schema = mongoose.Schema;

const userSchema = new Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }, // Changed from country to description
    htmlContent: { type: String, required: true }  // New field for htmlContent
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema); // Corrected model name

// Route for new user
app.post('/users', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const user = new User({
        image: `/images/img/${req.file.filename}`, // Store the image file path
        name: req.body.name,
        description: req.body.description, // Changed from country to description
        htmlContent: req.body.htmlContent // New field
    });

    user.save()
        .then((user) => res.json(user))
        .catch((err) => {
            res.status(400).json('Error: ' + err);
        });
});

// Get all users
app.get('/users', (req, res) => {
    User.find().sort({ createdAt: 'desc' })
        .then((users) => res.json(users))
        .catch((err) => {
            console.log(err);
        });
});

// Delete user
app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User  Deleted'))
        .catch((err) => {
            console.log(err);
        });
});

// Update user
app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
        });
});

// Error handling for multer
function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        });
    } else {
        next(err); // Pass the error to the next middleware
    }
}
app.use(errHandler);

// Get user by ID
app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send('User  not found');
            }
            res.json(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Server error');
        });
});


app.listen(5000, () => {
    console.log("App is working on port 5000");
});