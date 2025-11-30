import Version from '../models/Version.js';
import { detectWordChanges, formatTimestamp, generateId } from '../utils/wordDiff.js';

/**
 * Version Controller
 * Handles all version-related operations following MVC pattern
 */

/**
 * Save a new version entry
 * POST /save-version
 */
export const saveVersion = async (req, res) => {
  try {
    const { content } = req.body;

    if (content === undefined || content === null) {
      return res.status(400).json({
        success: false,
        message: 'Content is required',
      });
    }

    // Get the previous version to compare
    const previousVersion = await Version.findOne()
      .sort({ createdAt: -1 })
      .exec();

    const oldText = previousVersion?.content || '';
    const newText = String(content);

    // Detect word changes using custom logic
    const { addedWords, removedWords } = detectWordChanges(oldText, newText);

    // Create new version entry
    const versionData = {
      id: generateId(),
      timestamp: formatTimestamp(),
      addedWords,
      removedWords,
      oldLength: oldText.length,
      newLength: newText.length,
      content: newText,
    };

    // Save to database
    const version = new Version(versionData);
    await version.save();

    // Return created version (without content for efficiency)
    const { content: _, ...versionResponse } = version.toObject();

    res.status(201).json({
      success: true,
      message: 'Version saved successfully',
      data: versionResponse,
    });
  } catch (error) {
    console.error('Error saving version:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving version',
      error: error.message,
    });
  }
};

/**
 * Get all versions
 * GET /versions
 */
export const getVersions = async (req, res) => {
  try {
    // Fetch all versions, sorted by creation time (newest first)
    const versions = await Version.find()
      .select('-content') // Exclude content field for efficiency
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({
      success: true,
      message: 'Versions retrieved successfully',
      data: versions,
      count: versions.length,
    });
  } catch (error) {
    console.error('Error fetching versions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching versions',
      error: error.message,
    });
  }
};

/**
 * Delete a version by ID
 * DELETE /versions/:id
 */
export const deleteVersion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Version ID is required',
      });
    }

    // Find and delete the version
    const deletedVersion = await Version.findOneAndDelete({ id });

    if (!deletedVersion) {
      return res.status(404).json({
        success: false,
        message: 'Version not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Version deleted successfully',
      data: { id: deletedVersion.id },
    });
  } catch (error) {
    console.error('Error deleting version:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting version',
      error: error.message,
    });
  }
};

