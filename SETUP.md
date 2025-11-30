# Quick Setup Guide

## Prerequisites

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Choose one:
   - MongoDB Community Edition (local) - [Download](https://www.mongodb.com/try/download/community)
   - MongoDB Atlas (cloud) - [Sign up](https://www.mongodb.com/cloud/atlas) (Free tier available)

## Step-by-Step Setup

### 1. Clone/Navigate to Project

```bash
cd Assignment
```

### 2. Setup Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

**For Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/audit-trail
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/audit-trail
NODE_ENV=development
```

Start the backend:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server should start on `http://localhost:5000`

### 3. Setup Frontend (Client)

Open a new terminal window:

```bash
cd client
npm install
```

Start the frontend:
```bash
npm run dev
```

The client should start on `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Testing the Application

1. Type some text in the "Content Editor" textarea
2. Click "Save Version"
3. Edit the text (add or remove words)
4. Click "Save Version" again
5. View the version history with added/removed words highlighted

## Troubleshooting

### MongoDB Connection Error

- **Local MongoDB**: Make sure MongoDB is running on your system
  - Windows: Check MongoDB service in Services
  - Mac/Linux: `sudo systemctl start mongod` or `brew services start mongodb-community`
  
- **MongoDB Atlas**: 
  - Check your connection string
  - Make sure your IP is whitelisted in Atlas Network Access
  - Verify your username and password

### Port Already in Use

- Backend (5000): Change `PORT` in `server/.env`
- Frontend (3000): Change port in `client/vite.config.js` or use `npm run dev -- --port 3001`

### CORS Errors

- Make sure the backend is running
- Check that `VITE_API_URL` in client matches your backend URL

## Production Deployment

### Backend (Railway/Render)

1. Connect your GitHub repository
2. Set environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
3. Build command: `npm install`
4. Start command: `npm start`

### Frontend (Vercel)

1. Import your project
2. Set root directory to `client`
3. Set environment variable:
   - `VITE_API_URL` (your backend URL)
4. Build command: `npm run build`
5. Output directory: `dist`

