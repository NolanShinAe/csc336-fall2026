//Importing Express.js framework into the file
import express from 'express';





//Creating a new Express application and storing it in a variable
const app = express();

//Creating a variable that stores the server's port, using the PORT environment variable or 3000 
const port = process.env.PORT || 3000;

//Creating a variable that stores current date and time
const now = new Date();





//Express application publicly serves the static files stored in "public" folder
app.use(express.static("public"));

//Express application listens for visits to the url '/about' and sends the message back to the browser
app.get('/about', (req, res) => {
  res.send("The goal of this assignment is to serve a previous assignment on our own Express server on Render. I chose to use assignment 5: inventory tool.");
});

//Express application listens for visits to the url '/time' and sends the server's current time to the browser
app.get('/time', (req, res) => {
  res.send("The server's time is " + now.toString());
});





//Starts the server and listens for requests on the PORT or 3000
app.listen(port);
