# User Management System

This project is a simple user management system built using React, Redux Toolkit, Node.js, Express.js, and MongoDB. It allows users to register, log in, and view a list of users with options to edit or delete users. The application performs CRUD operations on the user data stored in a MongoDB database.

## **Features**

-  User Registration and Login
-  Display a list of all users (name, email)
-  Edit user details
-  Delete user functionality
-  Protected routes for editing and deleting
-  State management using Redux Toolkit
-  API integration using Axios

---

## **Project Structure**

```bash
root
│
├── backend
│   ├── models         # Contains MongoDB models
│   ├── routes         # API routes for users
│   ├── controllers    # User CRUD operations
│   ├── index.js       # Express app
│
├── frontend
│   ├── public         # Static files
│   ├── src
│   │   ├── app        # Redux store setup
│   │   ├── components # React components
│   │   ├── slices     # Redux slices (reducers and actions)
│   │   ├── api         # API functions for CRUD operations
│   │   └── index.js   # Entry point for the React app
│   └── package.json   # Dependencies for the frontend
│
├── README.md          # Documentation


git clone https://github.com/rrahul1/user-management-system.git
cd user-management-system

cd backend
npm install


cd ../frontend
npm install


MONGO=your_mongo_url                      # MongoDB connection string
JWT_SECRET=your_jwt_secret                  # Secret key for JWT

**backend**
cd backend
nodemon index.js

**frontend**
cd frontend
npm run dev


## **Frontend**:
React.js
Redux Toolkit for state management
Axios for API calls

## **Backend**:
Node.js
Express.js
MongoDB
JWT for authentication
bcrypt for password hashing

```
