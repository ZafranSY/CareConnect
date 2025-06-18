

# CareConnect - Full-Stack Deployment Guide (Vue.js + Express.js on Firebase Free Tier)

https://careconnect-34acb.web.app/feedback

This `README.md` provides a step-by-step guide to deploy the CareConnect project, consisting of a Vue.js frontend and an Express.js backend (running as Firebase Cloud Functions), entirely on Firebase's free "Spark" plan.

## Project Structure Overview

  * `webapp/`: Contains the Vue.js frontend application.
  * `server/functions/`: Contains the Express.js backend code adapted for Firebase Cloud Functions.
  * `firebase.json`: Main Firebase configuration file at the project root.
  * `.firebaserc`: Firebase project alias configuration.

-----

## Prerequisites

Before you begin, ensure you have the following installed:

  * **Node.js and npm:** Download from [nodejs.org](https://nodejs.org/).
  * **Firebase CLI:** Install globally using npm:
    ```bash
    npm install -g firebase-tools
    ```
  * **Google Account:** Required to create a Firebase project.
  * **Firebase Project:** You should have an existing Firebase project (e.g., `careconnect-34acb`) setup in your Firebase console.

-----

## Deployment Steps

Follow these steps precisely from your main project root: `C:\Users\user\Documents\GitHub\CareConnect`

### Step 0: Initial Cleanup & Correct Firebase CLI Setup (CRITICAL for Free Tier\!)

The previous attempts might have left behind `firebase.json` and `.firebaserc` files that incorrectly configured "App Hosting." We need to ensure a clean slate and select the correct features in `firebase init`.

1.  **Delete existing Firebase configuration files and the extra `functions` directory (if they exist directly at the root, not the one inside `server/`):**

    ```bash
    cd C:\Users\user\Documents\GitHub\CareConnect
    del firebase.json .firebaserc # For Windows. Use 'rm firebase.json .firebaserc' for macOS/Linux.

    # If a 'functions' directory was created directly at the root by Firebase CLI, delete it:
    rmdir /s /q functions # For Windows. Use 'rm -rf functions' for macOS/Linux.
    ```

2.  **Run `firebase init` at the project root (pay close attention to prompts\!):**
    This is the most critical step to ensure you stay within the free tier for hosting.

    ```bash
    cd C:\Users\user\Documents\GitHub\CareConnect
    firebase init
    ```

    Follow the prompts as described below:

      * `"Are you ready to proceed?"`: Type `Y` and press Enter.
      * `"Which Firebase features do you want to set up for this directory?"`:
        **CRUCIAL STEP:** Use the **Spacebar** to select **ONLY** these two features:
          * `Functions: Configure and deploy Cloud Functions`
          * `Hosting: Configure and deploy Firebase Hosting sites`
            **DO NOT select `App Hosting: Enable web app deployments with App Hosting.`** This is the one that triggers billing requirements.
            Once Functions and Hosting are selected (and only those two), press Enter to confirm your choices.
      * `"Please select a Firebase project for this directory:"`: Choose your existing `careconnect-34acb` (CareConnect) project.
      * `"What language would you like to use to write Cloud Functions?"`: Select `JavaScript`.
      * `"Do you want to use ESLint to catch probable bugs and enforce style?"`: Type `Y` (Yes, recommended).
      * `"Do you want to install dependencies with npm now?"`: Type `Y` (Yes).
      * `"What do you want to use as your public directory? (public)"`: Type `webapp/dist`. Press Enter.
      * `"Configure as a single-page app (rewrite all URLs to /index.html)?"`: Type `Y` (Yes, this is essential for client-side routing in Vue.js applications). Press Enter.
      * `"Set up automatic deploys with GitHub?"`: Type `N` for now. Press Enter.
      * `"File webapp/dist/index.html already exists. Overwrite?"`: Type `N` (No, you do not want to overwrite your built Vue app's `index.html`). Press Enter.

    After this, you will have a clean `firebase.json` and `.firebaserc` at your project root (`C:\Users\user\Documents\GitHub\CareConnect`). The `functions` directory it just created at the root (`C:\Users\user\Documents\GitHub\CareConnect\functions`) is still empty and can be ignored, as your actual functions code is in `server/functions`.

### Step 1: Prepare Your Backend (Express.js as Cloud Functions)

Your Express app currently resides in `server/index.js`. We need to ensure it's correctly moved into `server/functions/` and adapted for Cloud Functions.

1.  **Move `index.js` and `package.json` into `server/functions/`:**
    Make sure you are at the project root (`C:\Users\user\Documents\GitHub\CareConnect`) for these commands.

    ```bash
    # Ensure you are at the project root: C:\Users\user\Documents\GitHub\CareConnect

    # Delete the default functions files if they were created inside server/functions by a previous 'firebase init functions'
    del server\functions\index.js server\functions\package.json # Use 'rm' for macOS/Linux

    # Move your main Express app's index.js and package.json into the designated functions folder
    move server\index.js server\functions\index.js # Use 'mv' for macOS/Linux
    move server\package.json server\functions\package.json # Use 'mv' for macOS/Linux
    ```

2.  **Adapt `server/functions/index.js` for Cloud Functions:**
    Open `C:\Users\user\Documents\GitHub\CareConnect\server\functions\index.js`.
    Modify its content to the following. This sets up your Express app to be exposed as a single Cloud Function, correctly handles CORS, and integrates Firebase Admin SDK.

    ```javascript
    // C:\Users\user\Documents\GitHub\CareConnect\server\functions\index.js
    const functions = require('firebase-functions');
    const express = require('express');
    const cors = require('cors');
    const admin = require('firebase-admin');
    const axios = require('axios');

    // Initialize Firebase Admin SDK (do this only once)
    // It's safe to call initializeApp multiple times, it will just return the existing app.
    // functions.config().firebase is automatically available in Cloud Functions.
    admin.initializeApp();

    const app = express(); // Initialize express app FIRST

    // Use CORS middleware:
    // For development, origin: true allows all. For production, restrict to your Firebase Hosting URL.
    app.use(cors({ origin: true }));
    // Middleware to parse JSON request bodies (add this if you handle JSON POST requests)
    app.use(express.json());

    // --- Define your Express routes here ---
    // Example: A simple GET endpoint to fetch mental health data
    app.get('/api/mental-health', async (req, res) => {
      try {
        const response = await axios.get('https://ghoapi.azureedge.net/api/Indicator?$filter=contains(IndicatorName, \'Mental health\')');
        res.json(response.data);
      } catch (error) {
        functions.logger.error("Error retrieving mental health data:", error); // Log to Cloud Functions logs
        res.status(500).send("Error retrieving data");
      }
    });

    // Example: A POST endpoint to interact with Firestore (requires firebase-admin)
    // (Add your existing Express routes here, adapting them if they rely on local server features)
    app.post('/api/submit-feeling', async (req, res) => {
      try {
        const db = admin.firestore();
        const { message, type } = req.body;

        if (!message || !type) {
          return res.status(400).json({ error: 'Message and type are required.' });
        }

        await db.collection('sharefeeling').add({
          message: message,
          type: type,
          timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        functions.logger.info("Feeling submitted to Firestore!", { message, type });
        res.status(200).json({ message: 'Feeling received and saved to Firestore!' });
      } catch (error) {
        functions.logger.error("Error submitting feeling:", error);
        res.status(500).json({ error: error.message || 'Failed to submit feeling.' });
      }
    });

    // Expose the Express app as a single Cloud Function named 'app'
    // This is the function name referenced in firebase.json rewrites.
    exports.app = functions.https.onRequest(app);
    ```

3.  **Update `server/functions/package.json` & Install Dependencies:**
    Open `C:\Users\user\Documents\GitHub\CareConnect\server\functions\package.json`.
    Ensure it includes `firebase-functions`, `express`, `cors`, `axios`, and `firebase-admin` (if you use Firestore/Auth within your functions) in its dependencies. Pay attention to the `engines.node` version.

    ```json
    {
      "name": "functions",
      "description": "Cloud Functions for Firebase for CareConnect",
      "scripts": {
        "lint": "eslint .",
        "serve": "firebase emulators:start --only functions",
        "shell": "firebase functions:shell",
        "start": "npm run shell",
        "deploy": "firebase deploy --only functions",
        "logs": "firebase functions:log"
      },
      "engines": {
        "node": "18"
      },
      "main": "index.js",
      "dependencies": {
        "axios": "^1.6.0",
        "firebase-admin": "^11.8.0",
        "firebase-functions": "^4.3.0",
        "express": "^4.18.2",
        "cors": "^2.8.5"
      },
      "devDependencies": {
        "eslint": "^8.9.0",
        "eslint-config-google": "^0.14.0",
        "firebase-functions-test": "^3.1.0"
      },
      "private": true
    }
    ```

    Then, install these dependencies for your functions:

    ```bash
    cd C:\Users\user\Documents\GitHub\CareConnect\server\functions
    npm install
    ```

### Step 2: Configure the Main `firebase.json` (at Project Root)

This file, located at `C:\Users\user\Documents\GitHub\CareConnect\firebase.json`, tells Firebase how to deploy both your hosting and functions.

Open this file and ensure its content is precisely as follows:

```json
{
  "hosting": {
    "public": "webapp/dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/api/**",
        "function": "app" // This routes requests starting with /api/ to your 'app' Cloud Function
      },
      {
        "source": "**",
        "destination": "/index.html" // This is crucial for your Vue.js single-page application routing
      }
    ]
  },
  "functions": {
    "source": "server/functions" // This tells Firebase where to find your Cloud Functions code
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```

**Double-check:**

  * `"hosting.public"` points to `"webapp/dist"`.
  * `"functions.source"` points to `"server/functions"`.
  * The rewrite rule's `"function"` name (`"app"`) exactly matches the `exports.app` in your `server/functions/index.js`.

### Step 3: Build Your Frontend (Vue.js)

Your Vue.js frontend needs to be compiled into static HTML, CSS, and JavaScript files for production before it can be deployed to Firebase Hosting.

```bash
cd C:\Users\user\Documents\GitHub\CareConnect\webapp
npm run build
```

This command will create or update the `dist` folder inside your `webapp/` directory with the optimized production-ready files. You might see warnings about asset sizes; these are performance recommendations, not errors, and do not prevent deployment.

### Step 4: Final Deployment

Now that your project is correctly configured and your frontend is built, you can deploy everything to Firebase using the command from your project root.

```bash
cd C:\Users\user\Documents\GitHub\CareConnect
firebase deploy
```

This single command will perform the following actions, all utilizing the Firebase Spark Plan (free tier) for the specified limits:

  * Deploy your Vue.js frontend (from `webapp/dist`) to Firebase Hosting.
  * Deploy your Express.js backend (from `server/functions`) as a Firebase Cloud Function.
  * Deploy your Firestore security rules (if `firestore.rules` exists at the root) to Cloud Firestore.

Once the deployment is complete, the Firebase CLI will provide you with the public Hosting URL for your application. You can then access your frontend at that URL, and any API calls from your frontend to `/api/` will be correctly routed to your deployed Express backend running as a Cloud Function.

-----

## Important Notes & Troubleshooting

  * **Free Tier (Spark Plan):** Firebase's Spark Plan offers generous free usage limits for Hosting, Cloud Functions, and Firestore. Monitor your usage in the Firebase console to stay within these limits if you anticipate high traffic.
  * **CORS Configuration:** In `server/functions/index.js`, `app.use(cors({ origin: true }));` allows all origins. For production, it's highly recommended to restrict this to your specific Firebase Hosting URL (e.g., `app.use(cors({ origin: 'https://your-project-id.web.app' }));`) for security.
  * **Firestore Rules/Indexes:** If your application interacts with Firestore, ensure your `firestore.rules` file (at the project root) is correctly configured for security and your `firestore.indexes.json` (if any custom indexes are needed) is also present.
  * **Node.js Version:** The `engines.node` field in `server/functions/package.json` specifies the Node.js runtime for your functions. Always use a version supported by Firebase Functions (e.g., `18` or `20`). Check Firebase documentation for the latest supported runtimes.
  * **Local Testing (Emulators):** For local development and testing before deploying, you can use the Firebase Emulators:
    ```bash
    cd C:\Users\user\Documents\GitHub\CareConnect
    firebase emulators:start
    ```
    This will spin up local servers for Hosting, Functions, and other Firebase services, allowing you to test your integration without deploying.
  * **Checking Function Logs:** If your backend isn't working as expected after deployment, check the Cloud Functions logs in your Firebase project console. Your `functions.logger.info()` and `functions.logger.error()` calls will appear there.
  * **File Paths:** Always double-check your file paths, especially `public` for hosting and `source` for functions in `firebase.json`. A common mistake is misaligning these paths.
