//--------------------------------------------------------------
// Required code to run Node.js
const express = require("express"); // Runs HTTP Server
const cors = require("cors");
const mongoose = require("mongoose"); // Helps connect MongoDB 

const app = express();
require("dotenv").config(); // Allows us to use .env file

//Adds additional functionality to application
app.use(express.json());
app.use(cors({ origin: true })); // Gives us ability to call server from any other origin

app.post("/authenticate", async (req, res) => { // Create a POST endpoint for auth
  const { username } = req.body; // Takes username from request body
  return res.json({ username: username, secret: "sha256..."}); // Returns fake username with password
});

//Configure port (DEFAULT: 5000)
const port = process.env.PORT || 5000;

//Retreive connection URI from .env file
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) =>{ //Run server on port
  console.log(`Server is running on ${port}`);
});

//Create connection to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connection Established......")).catch((error) => console.log("MongoDB Connection Failed: ", error.message));