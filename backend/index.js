//--------------------------------------------------------------
// Required code to run Node.js
const express = require("express"); // Runs HTTP Server
const cors = require("cors"); 

const app = express();
app.use(express.json());
app.use(cors({ origin: true })); // Gives us ability to call server from any other origin

app.post("/authenticate", async (req, res) => { // Create a POST endpoint for auth
  const { username } = req.body; // Takes username from request body
  return res.json({ username: username, secret: "sha256..."}); // Returns fake username with password
});

app.listen(3001); // Run app on port 3001
//-------------------------------------------------------------