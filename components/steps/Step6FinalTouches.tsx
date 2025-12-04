'use client';

import { useState } from 'react';
import { ListingDraft, AISuggestions } from '../NewListingFlow';

interface Step6FinalTouchesProps {
  draft: ListingDraft;
  updateDraft: (updates: Partial<ListingDraft>) => void;
  aiSuggestions: AISuggestions;
}

export default function Step6FinalTouches({
  draft,
  updateDraft,
  aiSuggestions,
}: Step6FinalTouchesProps) {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState(draft.description);
  const [showDescriptionSuggestion, setShowDescriptionSuggestion] = useState(
    !!aiSuggestions.description
  );

  const handleSaveDescription = () => {
    updateDraft({ description: descriptionInput });
    setShowDescriptionModal(false);
  };

  const handleAcceptDescription = () => {
    if (aiSuggestions.description) {
      setDescriptionInput(aiSuggestions.description);
      updateDraft({ description: aiSuggestions.description });
      setShowDescriptionSuggestion(false);
    }
  };

  const handleRejectDescription = () => {
    setShowDescriptionSuggestion(false);
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Almost done—just a few details left
      </h2>
      <p className="text-gray-600 mb-6">
        Edit your photos, then add a clear description and any variations for this
        listing.
      </p>

      {/* Photo and Video */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Photo and video<span className="text-red-600">*</span>
        </label>

        {/* Photo Thumbnails */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {draft.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Product ${index + 1}`}
              className="w-full h-20 object-cover rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Variations */}
      <button className="w-full py-3 mb-4 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
        + Variations
      </button>

      {/* Description */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <span className="text-sm text-gray-500">Required</span>
        </div>

        {draft.description ? (
          <div
            onClick={() => setShowDescriptionModal(true)}
            className="px-4 py-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 min-h-[100px]"
          >
            <p className="text-gray-900 whitespace-pre-wrap">{draft.description}</p>
          </div>
        ) : (
          <button
            onClick={() => setShowDescriptionModal(true)}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4"
          >
            + Description
          </button>
        )}
      </div>

      {/* Description Modal */}
      {showDescriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md max-h-[80vh] flex flex-col rounded-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <button
                onClick={() => setShowDescriptionModal(false)}
                className="text-gray-900 text-2xl"
              >
                ✕
              </button>
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
              <button
                onClick={handleSaveDescription}
                className="px-4 py-2 bg-gray-600 text-white font-medium rounded-full hover:bg-gray-700"
              >
                Save
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              {/* AI Suggested Description */}
              {showDescriptionSuggestion && aiSuggestions.description && (
                <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-600 mb-2">
                        SUGGESTED DESCRIPTION
                      </div>
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {aiSuggestions.description}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={handleAcceptDescription}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        title="Accept"
                      >
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleRejectDescription}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        title="Reject"
                      >
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <textarea
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                placeholder="Add description"
                className="w-full min-h-[250px] px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
