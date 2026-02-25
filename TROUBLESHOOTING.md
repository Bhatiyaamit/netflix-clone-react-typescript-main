# Troubleshooting Guide - Netflix Clone Authentication

## Common Issues & Solutions

### Backend Issues

#### 1. Backend Won't Start
**Error:** `Port 4000 already in use` or server doesn't start

**Solutions:**
```bash
# Check if port 4000 is in use
lsof -i :4000

# Kill process on port 4000
kill -9 <PID>

# Or use a different port
PORT=5000 npm run dev
```

#### 2. MongoDB Connection Failed
**Error:** `Connection Issues with Database` or `MongooseError`

**Solutions:**
- Verify MongoDB connection string in `.env`
- Check MongoDB is running (local) or accessible (Atlas)
- Test connection string:
  ```bash
  mongosh "your_connection_string"
  ```
- Ensure IP whitelist includes your machine (MongoDB Atlas)
- Check username/password in connection string

#### 3. JWT_SECRET Not Set
**Error:** `Cannot read property 'sign' of undefined`

**Solution:**
```bash
# Add to server/.env
JWT_SECRET=your_secret_key_here
```

#### 4. CORS Errors
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**
- Verify frontend URL in `server/index.js` CORS config
- Check if both servers are running
- Frontend URL should be: `http://localhost:5173`
- Ensure credentials: true is set in CORS options

#### 5. Routes Not Found (404)
**Error:** `Cannot POST /api/v1/signup` or `/api/v1/login`

**Solutions:**
- Verify `routes/user.js` file exists
- Check routes are imported in `index.js`:
  ```javascript
  const user = require("./routes/user");
  app.use("/api/v1", user);
  ```
- Restart backend server

#### 6. Password Hashing Fails
**Error:** `Error in hashing password`

**Solution:**
```bash
# Reinstall bcrypt
npm uninstall bcrypt
npm install bcrypt
```

---

### Frontend Issues

#### 1. Frontend Won't Start
**Error:** `Cannot find module` or build errors

**Solutions:**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Clear cache
npm cache clean --force

# Restart dev server
npm run dev
```

#### 2. AuthProvider Not Found
**Error:** `Module not found: AuthProvider`

**Solutions:**
- Verify file exists: `client/src/providers/AuthProvider.tsx`
- Check import path in `main.tsx`:
  ```typescript
  import { AuthProvider } from "./providers/AuthProvider";
  ```
- Ensure file path matches exactly (case-sensitive on macOS/Linux)

#### 3. useAuth Hook Error
**Error:** `useAuth must be used within an AuthProvider`

**Solutions:**
- Ensure AuthProvider wraps the entire app in `main.tsx`
- Check AuthProvider is imported and used correctly
- Verify the component using useAuth is inside the provider

#### 4. Cannot Connect to Backend
**Error:** `Cannot POST http://localhost:4000/api/v1/signup` (ERR_CONNECTION_REFUSED)

**Solutions:**
- Start backend: `cd server && npm run dev`
- Verify backend runs on port 4000
- Check `VITE_BACKEND_API_URL` in `client/.env`:
  ```env
  VITE_BACKEND_API_URL=http://localhost:4000/api/v1
  ```
- Restart frontend after updating .env

#### 5. Sign Up/Login Not Working
**Error:** Request fails or no response

**Solutions:**
- Check browser DevTools Network tab:
  - See full request/response
  - Check response status code
  - Look for error messages
- Check frontend console for errors
- Check backend terminal for error logs
- Verify form data is being sent

**Common Response Errors:**
- `400`: Bad request - validate form data
- `401`: Unauthorized - credentials invalid
- `500`: Server error - check backend logs

#### 6. Token Not Being Saved
**Error:** Logged in but immediately redirected to signin

**Solutions:**
```bash
# Check localStorage in DevTools:
# Open DevTools > Application > Storage > Local Storage > http://localhost:5173

# Should contain:
# - token: "jwt_token_here"
# - user: "{...user data...}"
```

- Verify `authAPI.ts` is saving correctly:
  ```typescript
  setAuthData: (token: string, user: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  ```

#### 7. Page Keeps Redirecting to Signin
**Error:** Infinite redirect or can't access /browse

**Solutions:**
- Check if token exists in localStorage
- Verify token format is correct
- Check token hasn't expired (2 hour expiration)
- Check ProtectedRoute component logic
- Look at browser console for errors

#### 8. Google OAuth Not Working After Changes
**Error:** Google sign in fails

**Solutions:**
- Verify `googleLogin()` is still called correctly
- Check Google OAuth configuration
- Google sign in should work alongside email/password
- Ensure `@react-oauth/google` is installed

#### 9. Styling Issues
**Error:** Sign up page looks broken

**Solutions:**
- Clear build cache:
  ```bash
  rm -rf dist node_modules/.vite
  npm run dev
  ```
- Check MUI components are imported correctly
- Hard refresh browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

#### 10. Form Validation Not Working
**Error:** Can submit empty form or validation messages don't show

**Solutions:**
- Check validateForm function in SignUpPage
- Verify error state is being set
- Check error Alert component renders correctly
- Look for JavaScript errors in console

---

### Full Stack Issues

#### 1. Signup Succeeds but Can't Login
**Error:** Can create account but login fails

**Solutions:**
- Verify user was created in MongoDB:
  ```bash
  mongosh
  use netflix-clone
  db.users.find()
  ```
- Check password hashing is consistent
- Verify email/password are being sent correctly
- Check MongoDB has document with correct email

#### 2. Lost Connection After Page Refresh
**Error:** Logged in but lost token on refresh

**Solutions:**
- Check AuthProvider useEffect restores token:
  ```typescript
  useEffect(() => {
    const savedToken = authAPI.getToken();
    const savedUser = authAPI.getUser();
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
  }, [])
  ```
- Verify localStorage persistence
- Check browser allows localStorage

#### 3. Mixed Authentication Methods
**Error:** Google login works but email/password doesn't or vice versa

**Solutions:**
- Both methods should work independently
- Check conditional paths in SignInPage
- Verify different endpoints are called:
  - Google: Uses `localStorage.setItem("userPicture")`
  - Email/Password: Uses `authAPI.setAuthData()`
- Ensure both update localStorage consistently

---

### Network & API Issues

#### 1. CORS PreFlight Request Fails
**Error:** Preflight request (OPTIONS) returns 404

**Solutions:**
- Ensure CORS middleware is above routes in `server/index.js`:
  ```javascript
  app.use(cors({...}));
  app.use(express.json());
  const user = require("./routes/user");
  app.use("/api/v1", user);
  ```

#### 2. Network Timeout
**Error:** Request times out or takes very long

**Solutions:**
- Check MongoDB connection is fast
- Look at network latency
- Check backend server logs
- Verify no infinite loops in controller

#### 3. Duplicate Key Error
**Error:** `MongoError: E11000 duplicate key error`

**Solutions:**
- Email field might not be unique in existing data
- Drop collection and recreate:
  ```bash
  mongosh
  use netflix-clone
  db.users.drop()
  ```
- Or add unique index:
  ```javascript
  // In User.js schema
  email: { type: String, unique: true }
  ```

---

### Development Tools

#### Check Backend Status
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Check if running
curl http://localhost:4000

# Should return: <h1>Auth App</h1>
```

#### Check Frontend Status
```bash
# Terminal 2 - Frontend
cd client
npm run dev

# Should see: Local: http://localhost:5173
```

#### Debug Network Requests
1. Open DevTools (F12 or Cmd+Opt+I)
2. Go to Network tab
3. Sign up or login
4. Click request to /api/v1/signup or /login
5. Check Request/Response tabs
6. Look for errors or unexpected status codes

#### Debug State Management
```javascript
// In browser console, you can check:
localStorage.getItem('token')
localStorage.getItem('user')
localStorage.getItem('userName')
```

#### Check Database
```bash
mongosh
show dbs
use netflix-clone
db.users.find()
db.users.findOne({email: "test@example.com"})
```

---

### Quick Fixes

**"It's not working!"**
1. ✅ Restart both servers (backend and frontend)
2. ✅ Clear browser cache and localStorage
3. ✅ Check browser console for errors
4. ✅ Check server terminal for errors
5. ✅ Check Network tab in DevTools

**Still stuck?**
- Run: `npm install` in both directories
- Delete: `node_modules` and reinstall
- Check all files are created (see IMPLEMENTATION_SUMMARY.md)
- Review AUTHENTICATION_SETUP.md for configuration

---

### Error Monitoring Checklist

When troubleshooting, check these in order:

- [ ] Both backend and frontend servers running
- [ ] Backend running on port 4000
- [ ] Frontend running on port 5173
- [ ] MongoDB is accessible
- [ ] `.env` files configured correctly
- [ ] No port conflicts
- [ ] No TypeScript errors
- [ ] Network requests are working (DevTools)
- [ ] API responses are successful (status 200/201)
- [ ] Data is saved to localStorage
- [ ] Routes are accessible
- [ ] CORS headers are present
- [ ] JWT token format is correct

---

### Getting Help

If you still have issues:

1. **Check the logs:**
   - Backend: Look at terminal where `npm run dev` runs
   - Frontend: Open DevTools Console (F12)
   - Network: Open DevTools Network tab

2. **Review documentation:**
   - QUICK_START.md for quick setup
   - AUTHENTICATION_SETUP.md for detailed info
   - ARCHITECTURE.md for system design

3. **Verify configuration:**
   - Check all environment variables
   - Verify MongoDB connection
   - Confirm API endpoints match

4. **Test endpoints manually:**
   ```bash
   # Test signup
   curl -X POST http://localhost:4000/api/v1/signup \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123",
       "role": "Visitor"
     }'

   # Test login
   curl -X POST http://localhost:4000/api/v1/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

---

**Last Updated:** February 24, 2026
**Status:** ✅ Comprehensive Guide
