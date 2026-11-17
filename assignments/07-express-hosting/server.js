//Importing Express.js framework into the file
import express from 'express';

//Initializing a new Express application into a variable
const app = express();
//Render tells the server to use an assigned PORT variable or port 3000 to listen on
const port = process.env.PORT || 3000;

//Express application publicly serves the static files stored in "public"
app.use(express.static("public"));

//Express application listens for when user visits the url '/about' and sends the message back to the browser
app.get('/about', (req, res) => {
  res.send('The goal of this assignment is to serve a previous assignment on our own Express server on Render. I chose to use assignment 5: inventory tool.');
})

//Starts the server and listens for requests on the PORT or 3000
app.listen(port);
