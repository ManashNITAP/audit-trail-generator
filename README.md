# Mini Audit Trail Generator

A full-stack MERN (MongoDB, Express, React, Node.js) web application that automatically generates a change-history audit trail every time text content is modified.

## Features

- ✨ Real-time text editing with version tracking
- 📊 Automatic detection of added and removed words
- 🕐 Timestamped version history
- 📈 Character length tracking
- 🗑️ Delete versions functionality
- 🎨 Modern, responsive UI built with React and Tailwind CSS
- 🏗️ Clean MVC architecture

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Custom word diff algorithm

## Project Structure

```
Assignment/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Content.jsx
│   │   │   └── Versions.jsx
│   │   ├── pages/         # Page components
│   │   │   └── Home.jsx
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
│
└── server/                # Express backend (MVC)
    ├── config/           # Configuration
    │   └── database.js
    ├── controllers/      # Route controllers
    │   └── versionController.js
    ├── models/           # MongoDB models
    │   └── Version.js
    ├── routes/           # API routes
    │   └── versionRoutes.js
    ├── utils/            # Utility functions
    │   └── wordDiff.js
    ├── server.js         # Main server file
    └── package.json
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/audit-trail
NODE_ENV=development
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/audit-trail
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `client` directory (optional for development):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:3000`

## API Endpoints

### POST `/api/save-version`
Save a new version of the content.

**Request Body:**
```json
{
  "content": "Your text content here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Version saved successfully",
  "data": {
    "id": "uuid",
    "timestamp": "2025-01-26 13:40",
    "addedWords": ["adoption", "dashboard"],
    "removedWords": ["pilot"],
    "oldLength": 43,
    "newLength": 51
  }
}
```

### GET `/api/versions`
Get all saved versions.

**Response:**
```json
{
  "success": true,
  "message": "Versions retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "timestamp": "2025-01-26 13:40",
      "addedWords": ["adoption", "dashboard"],
      "removedWords": ["pilot"],
      "oldLength": 43,
      "newLength": 51
    }
  ],
  "count": 1
}
```

### DELETE `/api/versions/:id`
Delete a version by ID.

**Response:**
```json
{
  "success": true,
  "message": "Version deleted successfully",
  "data": {
    "id": "uuid"
  }
}
```

## How It Works

1. **Word Detection Algorithm**: The custom `wordDiff.js` utility tokenizes text into words, counts occurrences, and compares two versions to detect:
   - Added words (words that appear in the new version but not the old)
   - Removed words (words that appear in the old version but not the new)

2. **Version Storage**: Each version is stored in MongoDB with:
   - Unique ID (UUID)
   - Timestamp in "YYYY-MM-DD HH:MM" format
   - Arrays of added/removed words
   - Character length of old and new text

3. **State Management**: React state manages:
   - Current text content
   - List of all versions
   - Loading and error states

## Deployment

### Backend Deployment (Railway / Render)

1. Set environment variables:
   - `PORT` (automatically set by platform)
   - `MONGODB_URI` (your MongoDB connection string)
   - `NODE_ENV=production`

2. Set start command: `npm start`

### Frontend Deployment (Vercel)

1. Set environment variable:
   - `VITE_API_URL` (your backend API URL)

2. Build command: `npm run build`
3. Output directory: `dist`

### MongoDB Setup

- Option 1: Use MongoDB Atlas (cloud)
- Option 2: Use Railway/Render MongoDB addon
- Option 3: Use local MongoDB for development

## Usage

1. Open the application in your browser
2. Type or edit text in the "Content Editor" textarea
3. Click "Save Version" to create an audit trail entry
4. View all saved versions in the "Version History" panel
5. Click the delete icon (🗑️) to remove a version
6. Each version shows:
   - Timestamp
   - Added words (highlighted in green)
   - Removed words (highlighted in red)
   - Character length changes

## License

ISC

## Author

Built following MVC architecture principles with clean, readable code.
