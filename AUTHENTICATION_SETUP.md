# Netflix Clone - Backend & Frontend Authentication Setup

## Overview
This document outlines the changes made to integrate backend authentication with the Netflix Clone application. The app now supports user registration and login using email/password through a Node.js/Express backend.

## What's New

### Backend Changes

#### 1. **Routes File** (`server/routes/user.js`)
- Created Express routes for user authentication
- Endpoints: `POST /api/v1/signup` and `POST /api/v1/login`

#### 2. **CORS Configuration** (`server/index.js`)
- Added CORS middleware to allow frontend-backend communication
- Configured to allow requests from `http://localhost:5173` (Vite development server) and `http://localhost:3000`

#### 3. **Dependencies** (`server/package.json`)
- Added `cors` package for cross-origin requests
- Added npm scripts: `start` and `dev` (for nodemon watch mode)

### Frontend Changes

#### 1. **Authentication API Service** (`client/src/services/authAPI.ts`)
- Centralized API calls for authentication
- Methods: `signup()`, `login()`, `logout()`, token management
- Uses environment variable for backend URL

#### 2. **Auth Context Provider** (`client/src/providers/AuthProvider.tsx`)
- Manages global authentication state
- Provides `useAuth()` hook for accessing auth functions
- Handles token and user data persistence
- Includes loading state management

#### 3. **Sign Up Page** (`client/src/pages/SignUpPage.tsx`)
- New page for user registration
- Similar design to Sign In page
- Form validation for name, email, and password
- Error and success messaging
- Password confirmation field

#### 4. **Updated Sign In Page** (`client/src/pages/SignInPage.tsx`)
- Integrated with new Auth Context
- Added form validation
- Error handling and loading states
- Links to Sign Up page

#### 5. **Protected Route Component** (`client/src/components/ProtectedRoute.tsx`)
- Updated to use Auth Context instead of localStorage
- Includes loading state handling

#### 6. **Main Header Component** (`client/src/components/layouts/MainHeader.tsx`)
- Integrated logout with new Auth Context
- Properly clears all authentication state

#### 7. **Routing** (`client/src/routes/index.tsx`)
- Added signup route: `/signup`

#### 8. **Constants** (`client/src/constant/index.ts`)
- Added signup path constant

#### 9. **Main App Entry** (`client/src/main.tsx`)
- Wrapped app with `AuthProvider` for global auth state

#### 10. **Environment Configuration** (`client/.env`)
- Added `VITE_BACKEND_API_URL=http://localhost:4000/api/v1`

## Running the Application

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Instructions

#### 1. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create/update .env file with:
PORT=4000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Start the server
npm run dev  # For development with auto-reload
# or
npm start    # For production
```

The backend will run on `http://localhost:4000`

#### 2. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# The .env file already has the backend URL configured
# If your backend runs on a different port, update:
VITE_BACKEND_API_URL=http://localhost:YOUR_PORT/api/v1

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Authentication Flow

### Sign Up
1. User navigates to `/signup`
2. Fills name, email, password, and confirm password
3. Frontend validates the form
4. Sends POST request to `/api/v1/signup`
5. Backend hashes password and creates user in MongoDB
6. Returns JWT token and user data
7. Token is stored in localStorage
8. User is redirected to browse page (`/browse`)

### Sign In
1. User navigates to `/signin`
2. Enters email and password
3. Frontend validates input
4. Sends POST request to `/api/v1/login`
5. Backend verifies credentials and returns JWT token
6. Token is stored in localStorage
7. User is redirected to browse page

### Protected Routes
- All routes except `/`, `/signin`, and `/signup` require authentication
- ProtectedRoute component checks for valid token
- Unauthenticated users are redirected to sign-in page

### Logout
- Clears token from localStorage
- Clears user data from localStorage
- Redirects to sign-in page

## API Endpoints

### POST `/api/v1/signup`
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Visitor"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User Created Successfully",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Visitor"
  }
}
```

### POST `/api/v1/login`
**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Visitor"
  }
}
```

## Key Features

✅ User Registration with validation
✅ Secure password hashing with bcrypt
✅ JWT token-based authentication
✅ Google OAuth integration (still works)
✅ Protected routes
✅ Global auth state management
✅ Loading states
✅ Error handling
✅ Responsive design
✅ Multi-language support

## Troubleshooting

### CORS Errors
- Ensure backend is running on port 4000
- Check `VITE_BACKEND_API_URL` in frontend .env
- Verify CORS configuration in `server/index.js`

### Database Connection Issues
- Verify MongoDB connection string in backend .env
- Ensure MongoDB is running
- Check network access in MongoDB Atlas

### Token Not Being Saved
- Check browser localStorage (DevTools > Application > Storage)
- Verify authAPI.ts is saving tokens correctly
- Check network tab for successful API responses

### Logout Not Working
- Ensure MainHeader component has useAuth hook
- Verify logout clears all localStorage items
- Check browser console for errors

## Security Notes

⚠️ **Important for Production:**
1. Change `JWT_SECRET` to a strong, random value
2. Use HTTPS instead of HTTP
3. Set secure CORS origins
4. Add rate limiting
5. Implement refresh token rotation
6. Use httpOnly cookies for token storage
7. Add input validation and sanitization
8. Implement account lockout after failed attempts

## Next Steps

1. Add password reset functionality
2. Implement email verification
3. Add user profile management
4. Implement refresh tokens
5. Add social login integrations
6. Implement 2FA
7. Add user activity logging

## File Structure Summary

```
server/
├── routes/
│   └── user.js                (NEW)
├── Controller/
│   └── Auth.js               (Updated)
├── middleware/
│   └── auth.js
├── Models/
│   └── User.js
├── config/
│   └── database.js
├── index.js                  (Updated)
├── package.json              (Updated)
└── .env

client/
├── src/
│   ├── services/
│   │   └── authAPI.ts        (NEW)
│   ├── providers/
│   │   └── AuthProvider.tsx  (NEW)
│   ├── pages/
│   │   ├── SignInPage.tsx    (Updated)
│   │   └── SignUpPage.tsx    (NEW)
│   ├── components/
│   │   ├── ProtectedRoute.tsx (Updated)
│   │   └── layouts/
│   │       └── MainHeader.tsx (Updated)
│   ├── routes/
│   │   └── index.tsx         (Updated)
│   ├── constant/
│   │   └── index.ts          (Updated)
│   └── main.tsx              (Updated)
└── .env                      (Updated)
```

## Support

For issues or questions, check the error messages in:
- Browser console (Frontend errors)
- Server terminal (Backend errors)
- Network tab (API communication issues)
