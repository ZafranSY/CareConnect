// C:\Users\user\Documents\GitHub\CareConnect\server\functions\index.js
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors'); // Ensure 'cors' is installed in functions/package.json
const admin = require('firebase-admin'); // If your functions need Firestore/Auth access
const axios = require('axios'); // Add this line to import axios

// Initialize Firebase Admin SDK (do this only once)
admin.initializeApp();

const app = express(); // Initialize express app FIRST

// Use CORS middleware:
// For development, origin: true allows all. For production, restrict to your Firebase Hosting URL.
app.use(cors({ origin: true }));
// Middleware to parse JSON request bodies (add this if you handle JSON POST requests)
app.use(express.json());

app.get('/api/mental-health', async (req, res) => {
  try {
    const response = await axios.get('https://ghoapi.azureedge.net/api/Indicator?$filter=contains(IndicatorName, \'Mental health\')');
    res.json(response.data);
  } catch (error) {
    console.error("Error retrieving mental health data:", error); // More descriptive logging
    res.status(500).send("Error retrieving data");
  }
});

// Expose the Express app as a single Cloud Function named 'app'
// This is the function name referenced in firebase.json rewrites.
exports.app = functions.https.onRequest(app);