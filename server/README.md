# Audit Trail Server

Backend server for the Mini Audit Trail Generator application.

## Architecture

This server follows the **MVC (Model-View-Controller)** pattern:

- **Models** (`/models`): MongoDB schemas and models
- **Controllers** (`/controllers`): Business logic and request handlers
- **Routes** (`/routes`): API endpoint definitions
- **Utils** (`/utils`): Helper functions (word diff algorithm)
- **Config** (`/config`): Database and application configuration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/audit-trail
NODE_ENV=development
```

3. Start server:
```bash
npm start
```

Or for development:
```bash
npm run dev
```

## API Endpoints

- `POST /api/save-version` - Save a new version
- `GET /api/versions` - Get all versions
- `GET /health` - Health check

## Custom Word Diff Algorithm

The `utils/wordDiff.js` file contains custom logic to:
- Tokenize text into words
- Count word occurrences
- Detect added words
- Detect removed words

This is a custom implementation, not copied from online sources.

