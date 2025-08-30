# Framer Custom Auth – Backend

This is a simple **Node.js + Express + MongoDB backend** for handling **authentication with cookies**.  
It is designed to be used with **Framer code components**, but can work with any frontend that supports cookie-based auth.

---

## 🚀 Features
- User registration, login, update, and deletion  
- Cookie-based authentication (`httpOnly` JWT cookies)  
- Middleware for protecting routes  
- Works in both **development (localhost)** and **production (Framer / deployed)** environments  

---

## 📦 Endpoints

**Base URL**  

- **Development** → `http://localhost:3000/api/v1/user`  
- **Production** → `(your-deployed-url)/api/v1/user`  

---

### 1. Register
**`POST /register`**  
Create a new user.  

**Body:**
```json
{
  "userName": "John Doe",
  "emailId": "john@example.com",
  "password": "password123"
}

```

### 2. Login
**`POST /login`**  
Log in a user and receive an auth cookie.

**Body:**
```json
{
  "emailId": "john@example.com",
  "password": "password123"
}

```

### 3. Logout
**`POST /logout`**  
Clears the authentication cookie.
- No body required.

### 4. Delete User 
**`POST /delete`**  
Delete the authenticated user.

**Body:**
```json
{
  "password": "password123"
}

```

### 5. Update User
**`PUT /update`**  
Update name or password.

**Body:**
```json
{
  "userName": "New Name",
  "originalPassword": "oldpassword123",
  "password": "newpassword456"
}

```

### 6. Get User (Me)
**`GET /me`**  
Fetch details of the currently authenticated user.
- No body required.  

**Body:**
```json
{
  "userName": "John Doe",
  "emailId": "john@example.com",
  "password": "password123"
}

```

## ⚙️ Setup

### 1. Clone the repo and install dependencies:
```bash
npm install

```

### 2. Run in development mode:
```bash
npm run dev

```
### 3. Deploy to your preferred hosting provider (Render, Vercel, Railway, etc.):
- Update your Framer frontend to point to your deployed API URL

### 4: Database connection

- production
DATABASE_URL = mongodb://production.database.url/framer-auth
- development
DATABASE_URL = mongodb://localhost:27017/framer-auth

### 5: Server port
```bash
PORT = 3000

```

### 6: JWT secret key

```bash
JWT_KEY = your@jwt.secret

```


### 7: Environment (development | production)
```bash
NODE_ENV=production

```


## 🔒 Authentication
- This backend uses JWT stored in an httpOnly cookie (token).
- Cookies are configured as:
  - httpOnly: true → cannot be accessed via JavaScript.
  - secure: true in production (requires HTTPS).
  - sameSite: "none" in production (for cross-site requests like Framer).


  