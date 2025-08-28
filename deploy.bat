@echo off
echo 🚀 MERN Website Deployment Helper
echo ================================
echo.

echo 📋 Step 1: GitHub Repository Setup
echo ----------------------------------
echo 1. Go to https://github.com
echo 2. Create new repository: mern-ecommerce-website
echo 3. Copy the repository URL
echo.

echo 📋 Step 2: Connect Local Repository
echo -----------------------------------
echo After creating GitHub repo, run these commands:
echo git remote add origin YOUR_REPO_URL
echo git branch -M main
echo git push -u origin main
echo.

echo 📋 Step 3: Deploy Backend (Render.com)
echo --------------------------------------
echo 1. Go to https://render.com
echo 2. Sign up with GitHub
echo 3. Create new Web Service
echo 4. Connect your repository
echo 5. Set environment variables
echo 6. Deploy
echo.

echo 📋 Step 4: Deploy Frontend (Vercel.com)
echo ---------------------------------------
echo 1. Go to https://vercel.com
echo 2. Sign up with GitHub
echo 3. Import your repository
echo 4. Set VITE_API_URL environment variable
echo 5. Deploy
echo.

echo 📋 Step 5: Import Demo Data
echo ----------------------------
echo 1. Go to Render dashboard
echo 2. Open Shell for your backend
echo 3. Run: npm run data:import
echo.

echo 🌟 Your website will be live in about 20 minutes!
echo.
echo Press any key to open deployment guide...
pause >nul

echo Opening deployment guide...
start DEPLOYMENT_GUIDE.md
start GITHUB_SETUP.md

echo.
echo 🎯 Ready to deploy? Open the guides above and follow the steps!
echo.
pause
