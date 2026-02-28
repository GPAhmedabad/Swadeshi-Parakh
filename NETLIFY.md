# Deploying to Netlify

This guide will walk you through deploying your Next.js application to Netlify.

## Step 1: Connect Your Repository

1.  Log in to your Netlify account.
2.  Click on **"Add new site"** and choose **"Import an existing project"**.
3.  Connect to your Git provider (GitHub, GitLab, etc.) and select the repository for this project.

## Step 2: Configure Build Settings

Netlify should automatically detect that you're deploying a Next.js app and configure most settings for you. Ensure they match the following:

-   **Build command:** `npm run build`
-   **Publish directory:** `.next`

## Step 3: Add Environment Variables

This is the most important step for making sure your application works correctly. You need to add the secret keys for Firebase and Google AI to your Netlify site.

1.  In your site's dashboard on Netlify, go to **"Site configuration"** > **"Environment variables"**.
2.  Click **"Add a variable"** and add each of the following variables one by one. Use the `.env.example` file in this project as a reference for the keys you need.

### Required Variables:

-   `NEXT_PUBLIC_FIREBASE_API_KEY`
-   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
-   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
-   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
-   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
-   `NEXT_PUBLIC_FIREBASE_APP_ID`
-   `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
-   `GEMINI_API_KEY`

**Where to find your keys:**

-   **Firebase:** Go to your Firebase project -> Project Settings (click the gear icon) -> General tab. Scroll down to "Your apps" and select your web app to find the configuration values.
-   **Google AI (Gemini):** Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to create and copy your API key.

## Step 4: Deploy

Once your build settings and environment variables are configured, trigger a deploy from the "Deploys" tab in Netlify by clicking **"Trigger deploy"** > **"Deploy site"**.

Your application should now be live!
