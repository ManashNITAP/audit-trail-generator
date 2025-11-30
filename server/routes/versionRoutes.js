import express from 'express';
import { saveVersion, getVersions, deleteVersion } from '../controllers/versionController.js';

const router = express.Router();

/**
 * Version Routes
 * Defines API endpoints for version management
 */

// POST /save-version - Save a new version
router.post('/save-version', saveVersion);

// GET /versions - Get all versions
router.get('/versions', getVersions);

// DELETE /versions/:id - Delete a version by ID
router.delete('/versions/:id', deleteVersion);

export default router;

