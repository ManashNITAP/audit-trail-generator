import React from 'react';

/**
 * Versions Component
 * Displays the version history audit trail
 */
const Versions = ({ versions = [], isLoading = false, onDelete }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Version History</h2>
        <div className="text-center py-8 text-gray-500">Loading versions...</div>
      </div>
    );
  }

  if (!versions || versions.length === 0) {
    return (
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Version History</h2>
        <div className="text-center py-8 text-gray-500">
          No versions saved yet. Edit the content and click "Save Version" to create your first audit trail entry.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Version History</h2>
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {versions.map((version, index) => (
          <div
            key={version.id || index}
            className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-gray-800">Version #{versions.length - index}</p>
                <p className="text-sm text-gray-500">{version.timestamp}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right text-sm text-gray-600">
                  <p>Length: {version.oldLength} → {version.newLength}</p>
                  <p className="text-xs text-gray-400">ID: {version.id?.substring(0, 8)}...</p>
                </div>
                {onDelete && (
                  <button
                    onClick={() => onDelete(version.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete version"
                    aria-label="Delete version"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {version.addedWords && version.addedWords.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <p className="text-sm font-semibold text-green-800 mb-1">
                    Added Words ({version.addedWords.length}):
                  </p>
                  <p className="text-sm text-green-700">
                    {version.addedWords.join(', ') || 'None'}
                  </p>
                </div>
              )}
              
              {version.removedWords && version.removedWords.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-sm font-semibold text-red-800 mb-1">
                    Removed Words ({version.removedWords.length}):
                  </p>
                  <p className="text-sm text-red-700">
                    {version.removedWords.join(', ') || 'None'}
                  </p>
                </div>
              )}
              
              {(!version.addedWords || version.addedWords.length === 0) &&
               (!version.removedWords || version.removedWords.length === 0) && (
                <div className="bg-gray-50 border border-gray-200 rounded p-3 col-span-2">
                  <p className="text-sm text-gray-600">No word changes detected</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        Total versions: {versions.length}
      </p>
    </div>
  );
};

export default Versions;
