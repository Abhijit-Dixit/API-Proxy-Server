const express = require('express');
const cors = require('cors');
// CORS stands for cross origin resource sharing.
// It helps us with allowing and restricting requested resource on web server based on where the HTTP request was initiated.
// There is an HTTP header called origin in each HTTP request. It defines from where the domain request has originated. We can use header information to restrict or allow resources from our web server to protect them.
// By default requests from any other origins will be restricted by the browser.
// For example, while you are still in the development stage - if you are using a frontend library such as React, your front end application will be served on http://localhost:3000. Meanwhile, your Express server might be running on a different port such as http://localhost:2020.
require("dotenv").config();
// Module that loads environment variables from a .env file into process.env.
const router = require('./routes/index');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT||8000;
app.use(cors());

// How does this middleware keep count of api calls
// How does he knows me aka 'caller'
// Rate Limiting works even when caller is getting back cached response.
const limiter = rateLimit({
    windowMs:10*60*1000,
    max:5
})

app.use(limiter);
//By enabling the "trust proxy" setting via app.enable('trust proxy'), Express will have knowledge that it's sitting behind a proxy and that the X-Forwarded-* header fields may be trusted, which otherwise may be easily spoofed.
app.set('trust proxy',1)

// all routes that start with '/api' use router to get their 
app.use('/api',router)



app.listen(PORT,()=>{console.log(`Server running on ${PORT}`)})