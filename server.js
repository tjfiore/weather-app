const request = require("request");
const express = require("express");

const app = express(); //create instance of express
const PORT = 3070;

const API_KEY = 'af1530eee59ce29b15ef8e96c88383e1';

request.get(`https://api.darksky.net/forecast/${API_KEY}/42.3601,-71.0589`, ( err, req, res, body, next) => {
  if(err){return next(err);}
  body;
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.info(`>>> 🌎 Open http://localhost:${PORT}/ in your browser.`);
});