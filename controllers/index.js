const API_KEY_VALUE= process.env.API_KEY_VALUE;
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const fetch = require('node-fetch');

const handleRequest = async (req,res) =>{
    try{
        console.log("I ran");
        const params=new URLSearchParams({
            //ES6 code to set JS object key by variable
            [API_KEY_NAME] : `${API_KEY_VALUE}`,
            //spreads the contents of the object req.query as members of current object.
            ...req.query
        })

        const openWeatherURL=`${API_BASE_URL}?${params}`;
        apiRes= await fetch(openWeatherURL);
        if(process.env.NODE_ENV!='production')console.log(openWeatherURL);

        // fetch's methods like .text() / .json() require await because the payload/data is returned inform of stream,
        // they loop through, collecting all the bytes and then return the entire payload.
        const data = await apiRes.json();
        res.status(200).json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).send("<h1>Internal Server Error</h1>");
    }
}

module.exports={handleRequest}