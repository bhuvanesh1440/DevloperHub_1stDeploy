const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const DevUser = require('./devusermodel');
const Review = require('./reviewmodel');
const app = express();
const cors = require('cors');

// Body parser middleware
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
  origin: ["https://mern-deploy-frontend-inky.vercel.app"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://bhuvanesh1440:Bhuvi86400@cluster0.gc387f9.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { fullname, email, mobile, skill, password, confirmpassword } = req.body;
    const exist = await DevUser.findOne({ $or: [{ email }, { mobile }] });

    if (exist) {
      return res.status(400).send("User already registered");
    }

    if (password != confirmpassword) {
      return res.status(400).send("Password does not match");
    }

    const newUser = new DevUser({ fullname, email, mobile, skill, password, confirmpassword });
    await newUser.save();

    return res.status(200).send('User Registered Successfully');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await DevUser.findOne({ email });

    if (!exist) {
      return res.status(400).send("User not exist");
    }

    if (exist.password != password) {
      return res.status(400).send("Password Invalid");
    }

    const payload = { user: { id: exist.id } };
    jwt.sign(payload, 'jwtPassword', { expiresIn: '1h' }, (error, token) => {
      if (error) throw error;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

// Get all profiles endpoint
app.get("/allprofiles", middleware, async (req, res) => {
  try {
    const allprofiles = await DevUser.find();
    return res.status(200).json(allprofiles);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

// Get user's profile endpoint
app.get('/myprofile', middleware, async (req, res) => {
  try {
    const user = await DevUser.findById(req.user.id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

// Add review endpoint
app.post('/addreview', middleware, async (req, res) => {
  try {
    const { taskworker, ratings } = req.body;
    const exist = await DevUser.findById(req.user.id);
    const newreview = new Review({ taskprovider: exist.fullname, taskworker, ratings });
    await newreview.save();
    return res.status(200).send("Review updated successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

// Get user's reviews endpoint
app.get("/myreview", middleware, async (req, res) => {
  try {
    const allReviews = await Review.find({ taskworker: req.user.id });
    return res.status(200).json(allReviews);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
