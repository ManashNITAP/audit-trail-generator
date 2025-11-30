import express from 'express';
import { saveVersion, getVersions } from '../controllers/versionController.js';

const router = express.Router();

/**
 * Version Routes
 * Defines API endpoints for version management
 */

// POST /save-version - Save a new version
router.post('/save-version', saveVersion);

// GET /versions - Get all versions
router.get('/versions', getVersions);

export default router;

