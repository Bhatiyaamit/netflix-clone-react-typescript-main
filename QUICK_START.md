# Quick Start Guide - Netflix Clone with Backend Auth

## ⚡ Quick Start (5 minutes)

### Step 1: Start the Backend Server

```bash
cd server
npm run dev
```
✅ Backend will run on `http://localhost:4000`

### Step 2: Start the Frontend Server

```bash
cd client
npm run dev
```
✅ Frontend will run on `http://localhost:5173`

### Step 3: Test Authentication

1. **Sign Up**: Visit `http://localhost:5173/signup`
   - Create a new account with your email
   - Feel the magic ✨

2. **Sign In**: Visit `http://localhost:5173/signin`
   - Use your credentials to login
   - You'll be redirected to the browse page

3. **Browse**: Enjoy the Netflix clone
   - All protected routes work now!
   - Use the profile menu to logout

## 📋 What Changed?

### Backend
- ✅ New routing system (`/api/v1/signup`, `/api/v1/login`)
- ✅ CORS enabled for frontend communication
- ✅ MongoDB integration working

### Frontend
- ✅ New **Sign Up** page at `/signup`
- ✅ Updated **Sign In** page with backend integration
- ✅ **Auth Context** for global state management
- ✅ Protected routes with proper auth checks
- ✅ Better error handling and loading states

## 🔐 Authentication Methods

### Email/Password (NEW!)
Register and login with email and password through your backend.

### Google OAuth (Still Works!)
Sign in with Google account as before.

## 🐛 Troubleshooting

**Backend won't start?**
- Check if port 4000 is available
- Verify MongoDB connection in `.env`
- Run `npm install` in server folder

**Frontend can't connect to backend?**
- Ensure backend is running on port 4000
- Check `VITE_BACKEND_API_URL` in `client/.env`
- Review browser console for errors

**Sign up not working?**
- Verify MongoDB is connected
- Check network tab in DevTools
- Look at server terminal for error messages

## 📱 Key Pages

| Page | URL | Status |
|------|-----|--------|
| Home | `/` | Public |
| Sign In | `/signin` | Public |
| Sign Up | `/signup` | **NEW** |
| Browse | `/browse` | Protected |
| Watch | `/watch` | Protected |
| Shows | `/shows` | Protected |
| Movies | `/movies` | Protected |

## 🙌 Features

- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Protected routes
- ✅ Session persistence
- ✅ Logout functionality
- ✅ Error messages
- ✅ Loading states
- ✅ Responsive design

## 📖 Full Documentation

For detailed information, see [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md)

## 🚀 Next Steps

1. Deploy backend (Railway, Heroku, Replit)
2. Update frontend API URL for production
3. Add more features (reset password, email verification)
4. Implement refresh tokens
5. Add social login integrations

## 💡 Tips

- Use DevTools > Network tab to debug API calls
- Check localStorage in DevTools > Application > Storage
- Server logs will show all requests and errors
- Frontend console shows validation and runtime errors

---

**Happy coding! 🎬**

Need help? Check AUTHENTICATION_SETUP.md for detailed documentation.
