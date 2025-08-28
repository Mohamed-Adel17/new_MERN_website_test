# 🛍️ MERN E-Commerce Website

A full-stack e-commerce website built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## ✨ Features

- **User Authentication** - Login, Register, JWT tokens
- **Product Management** - Browse, search, filter by category
- **Shopping Cart** - Add/remove items, quantity management
- **Order Management** - Place orders, view order history
- **Admin Panel** - Manage products, users, and orders
- **Responsive Design** - Works on all devices
- **Image Upload** - Product image management

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File uploads

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📁 Project Structure

```
new_MERN_website_test/
├── backend/                 # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── data/              # Sample data
│   ├── middleware/        # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── seeder.js          # Data seeding script
├── frontend/               # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── slices/        # Redux slices
│   │   └── utils/         # Utility functions
│   └── package.json
└── package.json            # Root package.json
```

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd new_MERN_website_test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in the backend folder
   - Add your MongoDB connection string and JWT secret

4. **Import sample data**
   ```bash
   cd backend
   npm run data:import
   ```

5. **Start development servers**
   ```bash
   npm start
   ```

## 🌐 Deployment

### Backend (Render.com)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set environment variables
4. Deploy

### Frontend (Vercel.com)
1. Connect your GitHub repository to Vercel
2. Set environment variables
3. Deploy

## 📱 Demo Accounts

- **Admin:** admin@example.com / 123456
- **User:** john@example.com / 123456

## 🔧 Available Scripts

- `npm start` - Start both frontend and backend
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run data:import` - Import sample data
- `npm run data:destroy` - Clear sample data

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository.
