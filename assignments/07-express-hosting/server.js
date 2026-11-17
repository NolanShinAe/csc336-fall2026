import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get('/about', (req, res) => {
  res.send('The goal of this assignment is to serve a previous assignment on our own Express server on Render. I chose to use assignment 5: inventory tool.');
})

app.listen(port);
