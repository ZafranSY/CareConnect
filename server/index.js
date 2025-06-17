// server.js
const express = require('express');
const axios = require('axios');  // Add this line to import axios

const cors = require('cors');  // Import cors

const app = express();
const port = 3000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());
app.get('/api/mental-health', async(req,res)=>{
    try {
        const response = await axios.get('https://ghoapi.azureedge.net/api/Indicator?$filter=contains(IndicatorName, \'Mental health\')');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving data")
    }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
