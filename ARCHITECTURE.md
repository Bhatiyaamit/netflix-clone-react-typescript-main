# Netflix Clone - Architecture & Authentication System

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       NETFLIX CLONE APPLICATION                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │            FRONTEND (React + TypeScript)               │   │
│  │           http://localhost:5173                         │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │           AuthProvider Context                  │  │   │
│  │  │  - Manages global auth state                    │  │   │
│  │  │  - Provides useAuth() hook                      │  │   │
│  │  │  - Persists token to localStorage              │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │                       │                                  │   │
│  │                       ↓                                  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │          Router & Protected Routes              │  │   │
│  │  │                                                  │  │   │
│  │  │  Public Routes:                                 │  │   │
│  │  │  - / (Landing)                                  │  │   │
│  │  │  - /signin (Sign In)                            │  │   │
│  │  │  - /signup (Sign Up) [NEW]                     │  │   │
│  │  │                                                  │  │   │
│  │  │  Protected Routes:                              │  │   │
│  │  │  - /browse (Home)                               │  │   │
│  │  │  - /watch/:id                                   │  │   │
│  │  │  - /shows, /movies, /genre, etc                │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │                       │                                  │   │
│  │                       ↓                                  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │         Component Tree                          │  │   │
│  │  │                                                  │  │   │
│  │  │  SignInPage          SignUpPage [NEW]          │  │   │
│  │  │  - Form validation   - Form validation         │  │   │
│  │  │  - Backend login     - Backend signup          │  │   │
│  │  │  - Google OAuth      - Success redirect        │  │   │
│  │  │                                                  │  │   │
│  │  │  HomePage, ShowsPage, MoviesPage, etc.         │  │   │
│  │  │  - All protected by ProtectedRoute             │  │   │
│  │  │                                                  │  │   │
│  │  │  MainHeader                                    │  │   │
│  │  │  - User menu with Logout                       │  │   │
│  │  │  - Uses Auth Context                           │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │                       │                                  │   │
│  │                       ↓                                  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │         API Service Layer (authAPI.ts)          │  │   │
│  │  │                                                  │  │   │
│  │  │  - signup(name, email, password)               │  │   │
│  │  │  - login(email, password)                      │  │   │
│  │  │  - logout()                                    │  │   │
│  │  │  - Token management                           │  │   │
│  │  │  - User data persistence                      │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │                       │                                  │   │
│  └───────────────────────┼──────────────────────────────────┘   │
│                          │                                       │
│                          │ HTTP Requests                         │
│                          ↓                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            BACKEND (Node.js + Express)             │   │
│  │           http://localhost:4000                     │   │
│  │                                                      │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │          CORS Middleware                     │  │   │
│  │  │  - Allows requests from origin               │  │   │
│  │  │  - Supports credentials (cookies, tokens)   │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                       │                             │   │
│  │                       ↓                             │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │          Router                              │  │   │
│  │  │                                              │  │   │
│  │  │  POST /api/v1/signup                        │  │   │
│  │  │  POST /api/v1/login                         │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                       │                             │   │
│  │                       ↓                             │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │          Controllers                         │  │   │
│  │  │                                              │  │   │
│  │  │  exports.signup()                           │  │   │
│  │  │  - Validate input                          │  │   │
│  │  │  - Check existing user                     │  │   │
│  │  │  - Hash password with bcrypt              │  │   │
│  │  │  - Create user in DB                      │  │   │
│  │  │  - Generate JWT token                     │  │   │
│  │  │  - Return token + user data               │  │   │
│  │  │                                              │  │   │
│  │  │  exports.login()                            │  │   │
│  │  │  - Validate email                          │  │   │
│  │  │  - Find user in DB                         │  │   │
│  │  │  - Compare password                        │  │   │
│  │  │  - Generate JWT token                      │  │   │
│  │  │  - Return token + user data                │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                       │                             │   │
│  │                       ↓                             │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │      Authentication Middleware               │  │   │
│  │  │                                              │  │   │
│  │  │  exports.auth(req, res, next)               │  │   │
│  │  │  - Extract token from headers/cookies      │  │   │
│  │  │  - Verify JWT signature                    │  │   │
│  │  │  - Decode token and set req.user           │  │   │
│  │  │  - Call next() or return 401               │  │   │
│  │  │                                              │  │   │
│  │  │  exports.isStudent(req, res, next)          │  │   │
│  │  │  exports.isAdmin(req, res, next)            │  │   │
│  │  │  - Check user role                         │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                       │                             │   │
│  │                       ↓                             │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │           Data Models                        │  │   │
│  │  │                                              │  │   │
│  │  │  User Schema:                               │  │   │
│  │  │  - _id (MongoDB ObjectId)                  │  │   │
│  │  │  - name (String)                           │  │   │
│  │  │  - email (String, unique)                  │  │   │
│  │  │  - password (String, hashed)               │  │   │
│  │  │  - role (String: 'Admin', 'Student', etc) │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                       │                             │   │
│  │                       ↓                             │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │         Database (MongoDB)                   │  │   │
│  │  │                                              │  │   │
│  │  │  Connection: process.env.DATABASE_URL      │  │   │
│  │  │  Collections:                               │  │   │
│  │  │  - users (stores user accounts)            │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Authentication Flow Diagram

### Sign Up Flow
```
User Visits /signup
        ↓
User Fills Form (name, email, password, confirmPassword)
        ↓
User Clicks "Sign Up"
        ↓
Frontend Validates Form
├─ Check name not empty
├─ Check email format valid
├─ Check password length >= 6
└─ Check passwords match
        ↓
POST /api/v1/signup {name, email, password, role}
        ↓
Backend - Auth Controller (signup)
├─ Validate input
├─ Check if user exists
├─ Hash password (bcrypt 10 rounds)
├─ Create user document
├─ Generate JWT token
└─ Return {success, token, user}
        ↓
Frontend Receives Response
├─ Save token to localStorage
├─ Save user data to localStorage
└─ Save userName to localStorage
        ↓
Show Success Message
        ↓
Redirect to /browse (after 2 seconds)
```

### Sign In Flow
```
User Visits /signin
        ↓
User Enters Email & Password
        ↓
User Clicks "Sign In"
        ↓
Frontend Validates Form
└─ Check email and password not empty
        ↓
POST /api/v1/login {email, password}
        ↓
Backend - Auth Controller (login)
├─ Find user by email
├─ Compare password (bcrypt.compare)
├─ Generate JWT token
└─ Return {success, token, user} or error
        ↓
Frontend Receives Response
├─ Check response.success
├─ If success:
│  ├─ Save token
│  ├─ Save user data
│  └─ Redirect to /browse
└─ If error:
   └─ Display error message
```

### Protected Route Access
```
User Visits /browse (Protected)
        ↓
React Router loads ProtectedRoute component
        ↓
ProtectedRoute uses useAuth()
        ↓
Check isAuthenticated = !!token
        ↓
If Loading:
├─ Show MainLoadingScreen
        ↓
If Authenticated:
├─ Render <Outlet /> (show page content)
        ↓
If Not Authenticated:
└─ <Navigate to=/signin replace />
```

### Logout Flow
```
User Clicks Profile Menu → Select Logout
        ↓
MainHeader calls auth.logout()
        ↓
AuthProvider.logout()
├─ Clear token from localStorage
├─ Clear user data from localStorage
├─ Clear userName from localStorage
└─ Set token and user to null
        ↓
Components re-render with new auth state
        ↓
Navigate to /signin
```

## State Management

### Global Auth Context
```
AuthContext {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login(email, password)
  signup(name, email, password)
  logout()
}
```

### Local Storage
```
localStorage {
  token: "jwt_token_here"
  user: JSON.stringify({_id, name, email, role})
  userName: "user name"
  userPicture: "google profile picture url"
}
```

## Security Considerations

### Current Implementation
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT tokens with 2-hour expiration
- ✅ CORS protection
- ✅ Form validation on frontend
- ✅ Input validation on backend
- ✅ Protected routes

### Future Enhancements
- 🔄 Refresh tokens for longer sessions
- 🔄 HTTP-only secure cookies for tokens
- 🔄 HTTPS in production
- 🔄 Rate limiting on auth endpoints
- 🔄 Account lockout after failed attempts
- 🔄 Email verification for signup
- 🔄 Password reset via email
- 🔄  2-factor authentication

## API Response Format

### Success Response
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Visitor"
  },
  "message": "User created successfully"
}
```

### Error Response
```json
{
  "success": false,
  "message": "User already exists",
  "status": 400
}
```

## Environment Variables

### Backend (.env)
```env
PORT=4000
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/db-name
JWT_SECRET=your-very-secret-key-change-in-production
```

### Frontend (.env)
```env
VITE_BACKEND_API_URL=http://localhost:4000/api/v1
VITE_APP_API_ENDPOINT_URL=https://api.themoviedb.org/3
VITE_APP_TMDB_V3_API_KEY=your_tmdb_key
VITE_FIREBASE_API_KEY=your_firebase_key
```

## File Structure

```
Root/
├── server/
│   ├── Controller/
│   │   └── Auth.js (signup, login)
│   ├── Models/
│   │   └── User.js (user schema)
│   ├── middleware/
│   │   └── auth.js (JWT verification)
│   ├── routes/
│   │   └── user.js (POST /signup, POST /login)
│   ├── config/
│   │   └── database.js (MongoDB connection)
│   ├── index.js (Express app setup)
│   ├── package.json
│   └── .env
│
├── client/
│   ├── src/
│   │   ├── services/
│   │   │   └── authAPI.ts (API communication)
│   │   ├── providers/
│   │   │   └── AuthProvider.tsx (global state)
│   │   ├── pages/
│   │   │   ├── SignInPage.tsx (login)
│   │   │   ├── SignUpPage.tsx (register)
│   │   │   └── ... (other pages)
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── layouts/
│   │   │       └── MainHeader.tsx
│   │   ├── routes/
│   │   │   └── index.tsx (routing config)
│   │   ├── constant/
│   │   │   └── index.ts (app constants)
│   │   └── main.tsx (app entry point)
│   ├── .env
│   └── package.json
│
├── QUICK_START.md
├── AUTHENTICATION_SETUP.md
├── IMPLEMENTATION_SUMMARY.md
└── ARCHITECTURE.md (this file)
```

---

**This architecture provides a secure, scalable foundation for user authentication in the Netflix Clone application.**
