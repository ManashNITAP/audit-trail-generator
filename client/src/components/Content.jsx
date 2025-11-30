import React, { useState } from 'react';
import { saveVersion } from '../services/api';

/**
 * Content Component
 * Handles text editing and saving versions
 */
const Content = ({ onVersionSaved }) => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Handle save version button click
   */
  const handleSaveVersion = async () => {
    if (isSaving) return;

    setError(null);
    setSuccess(null);
    setIsSaving(true);

    try {
      const response = await saveVersion(content);
      
      if (response.success) {
        setSuccess('Version saved successfully!');
        
        // Notify parent component to refresh versions
        if (onVersionSaved) {
          onVersionSaved();
        }
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to save version. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-2xl  p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Content Editor</h2>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your text here..."
        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-y min-h-[200px] text-gray-700"
        rows="10"
      />
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex-1">
          {error && (
            <p className="text-red-600 text-sm mb-2">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm mb-2">{success}</p>
          )}
        </div>
        <button
          onClick={handleSaveVersion}
          disabled={isSaving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isSaving ? 'Saving...' : 'Save Version'}
        </button>
      </div>
      
      <p className="text-sm text-gray-500 mt-2">
        Character count: {content.length}
      </p>
    </div>
  );
};

export default Content;
