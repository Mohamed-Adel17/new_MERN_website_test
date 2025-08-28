# 🚀 Free MERN Website Deployment Guide

## **Backend Deployment (Render.com)**

### **Step 1: Deploy Backend to Render**
1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** `mern-website-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run prod`
   - **Plan:** `Free`

### **Step 2: Set Environment Variables**
In Render dashboard, go to "Environment" tab and add:
- `NODE_ENV`: `production`
- `MONGO_URI`: `your-mongodb-atlas-connection-string`
- `JWT_SECRET`: `your-secret-key`
- `PORT`: `10000`

### **Step 3: Deploy**
Click "Create Web Service" and wait for deployment.

## **Frontend Deployment (Vercel.com)**

### **Step 1: Deploy Frontend to Vercel**
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### **Step 2: Set Environment Variables**
In Vercel dashboard, go to "Settings" → "Environment Variables":
- `VITE_API_URL`: `https://your-backend-url.onrender.com`

### **Step 3: Deploy**
Click "Deploy" and wait for completion.

## **Database Setup (MongoDB Atlas)**

### **Step 1: Create Cluster**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Set up database access (username/password)
4. Set up network access (allow from anywhere: 0.0.0.0/0)

### **Step 2: Get Connection String**
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Add this to Render environment variables

## **Final Steps**

### **Step 1: Update Frontend Environment**
After backend deploys, update `frontend/env.production`:
```
VITE_API_URL=https://your-actual-backend-url.onrender.com
```

### **Step 2: Re-deploy Frontend**
Push changes to GitHub, Vercel will auto-deploy.

### **Step 3: Import Demo Data**
In Render dashboard, go to "Shell" and run:
```bash
npm run data:import
```

## **Your Website URLs**
- **Frontend:** `https://your-project.vercel.app`
- **Backend:** `https://your-backend.onrender.com`

## **Share with Friends! 🌐**
Send them the Vercel frontend URL - they can access your website from anywhere in the world!

## **Troubleshooting**
- **CORS errors:** Check backend CORS settings
- **Database connection:** Verify MongoDB Atlas connection string
- **Build errors:** Check package.json scripts and dependencies
