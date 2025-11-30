import { v4 as uuidv4 } from 'uuid';

/**
 * Word Diff Utility
 * Custom logic to detect added and removed words between two text versions
 */

/**
 * Normalize and tokenize text into words
 * @param {string} text - Input text
 * @returns {Array<string>} Array of normalized words
 */
function tokenizeWords(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  // Convert to lowercase, split by whitespace and punctuation
  // Keep only alphanumeric sequences (words)
  return text
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.replace(/[^\w]/g, ''))
    .filter(word => word.length > 0);
}

/**
 * Count word occurrences in an array
 * @param {Array<string>} words - Array of words
 * @returns {Object} Object with word counts
 */
function countWords(words) {
  const counts = {};
  words.forEach(word => {
    counts[word] = (counts[word] || 0) + 1;
  });
  return counts;
}

/**
 * Detect added and removed words between two text versions
 * @param {string} oldText - Previous version of text
 * @param {string} newText - New version of text
 * @returns {Object} Object containing addedWords and removedWords arrays
 */
export function detectWordChanges(oldText, newText) {
  // Normalize inputs
  const oldTextNormalized = oldText || '';
  const newTextNormalized = newText || '';

  // Tokenize both texts into word arrays
  const oldWords = tokenizeWords(oldTextNormalized);
  const newWords = tokenizeWords(newTextNormalized);

  // Count word occurrences in each version
  const oldWordCounts = countWords(oldWords);
  const newWordCounts = countWords(newWords);

  // Find added words (words that appear in new but not in old)
  const addedWordsSet = new Set();
  
  Object.keys(newWordCounts).forEach(word => {
    const oldCount = oldWordCounts[word] || 0;
    
    // Word is considered added if it wasn't in old text
    if (oldCount === 0) {
      addedWordsSet.add(word);
    }
  });

  // Find removed words (words that appear in old but not in new)
  const removedWordsSet = new Set();
  
  Object.keys(oldWordCounts).forEach(word => {
    const newCount = newWordCounts[word] || 0;
    
    // Word is considered removed if it's not in new text
    if (newCount === 0) {
      removedWordsSet.add(word);
    }
  });

  // Convert sets to sorted arrays
  const addedWords = Array.from(addedWordsSet).sort();
  const removedWords = Array.from(removedWordsSet).sort();

  return {
    addedWords,
    removedWords,
  };
}

/**
 * Format timestamp in the required format: "YYYY-MM-DD HH:MM"
 * @param {Date} date - Date object (defaults to now)
 * @returns {string} Formatted timestamp
 */
export function formatTimestamp(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * Generate a unique ID using UUID v4
 * @returns {string} UUID string
 */
export function generateId() {
  return uuidv4();
}

