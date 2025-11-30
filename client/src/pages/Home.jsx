import React, { useState, useEffect } from 'react';
import Content from '../components/Content';
import Versions from '../components/Versions';
import { getVersions } from '../services/api';

/**
 * Home Page Component
 * Main page that manages state and coordinates Content and Versions components
 */
const Home = () => {
  const [versions, setVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch versions from the server
   */
  const fetchVersions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getVersions();
      if (response.success) {
        setVersions(response.data || []);
      } else {
        setError('Failed to load versions');
      }
    } catch (err) {
      console.error('Error fetching versions:', err);
      setError(err.message || 'Failed to load versions');
      setVersions([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle version saved event
   */
  const handleVersionSaved = () => {
    // Refresh versions list after saving
    fetchVersions();
  };

  // Load versions on component mount
  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Mini Audit Trail Generator
        </h1>
        
        {error && (
          <div className="max-w-2xl mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
            <button
              onClick={fetchVersions}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 w-full">
            <Content onVersionSaved={handleVersionSaved} versions={versions} />
          </div>

          <div className="flex-1 w-full">
            <Versions versions={versions} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
