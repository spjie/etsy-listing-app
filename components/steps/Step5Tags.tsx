'use client';

import { useState } from 'react';
import { ListingDraft, AISuggestions } from '../NewListingFlow';

interface Step5TagsProps {
  draft: ListingDraft;
  updateDraft: (updates: Partial<ListingDraft>) => void;
  aiSuggestions: AISuggestions;
}

export default function Step5Tags({
  draft,
  updateDraft,
  aiSuggestions,
}: Step5TagsProps) {
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(
    !!aiSuggestions.tags && aiSuggestions.tags.length > 0
  );
  const [showAttributesExpanded, setShowAttributesExpanded] = useState(true);

  const handleAddTag = () => {
    if (tagInput.trim() && draft.tags.length < 13) {
      updateDraft({ tags: [...draft.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = draft.tags.filter((_, i) => i !== index);
    updateDraft({ tags: newTags });
  };

  const handleAcceptTags = () => {
    if (aiSuggestions.tags) {
      updateDraft({ tags: [...draft.tags, ...aiSuggestions.tags].slice(0, 13) });
      setShowTagSuggestions(false);
    }
  };

  const handleRejectTags = () => {
    setShowTagSuggestions(false);
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Add details to help buyers find your item
      </h2>
      <p className="text-gray-600 mb-6">
        Make sure you show up in relevant searches by adding key info.
      </p>

      {/* Tags */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Tags</label>

        {/* AI Suggested Tags */}
        {showTagSuggestions && aiSuggestions.tags && aiSuggestions.tags.length > 0 && (
          <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50 mb-3">
            <div className="text-xs font-medium text-blue-700 mb-2">AI SUGGESTED TAGS</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {aiSuggestions.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white border border-blue-300 text-gray-900 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAcceptTags}
                className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectTags}
                className="flex-1 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {/* Current Tags */}
        {draft.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {draft.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-900 text-sm rounded-full flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Add Tag Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            placeholder="Add a tag"
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={draft.tags.length >= 13}
          />
          <button
            onClick={handleAddTag}
            disabled={!tagInput.trim() || draft.tags.length >= 13}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {draft.tags.length}/13 tags used
        </div>
      </div>

      {/* Materials */}
      <button className="w-full py-3 mb-4 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
        + Materials
      </button>

      {/* Attributes */}
      <div className="border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
        <button
          onClick={() => setShowAttributesExpanded(!showAttributesExpanded)}
          className="w-full py-3 px-4 bg-white text-gray-900 font-semibold text-left flex items-center justify-between hover:bg-gray-50"
        >
          <span>Attributes</span>
          <span className="text-xl">{showAttributesExpanded ? '↑' : '↓'}</span>
        </button>

        {showAttributesExpanded && (
          <div className="p-4 bg-white space-y-3">
            <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
              + Craft type
            </button>
            <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
              + Material
            </button>
            <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
              + Primary color
            </button>
            <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
              + Secondary color
            </button>
            <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
              + Width
            </button>
            <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
              + Height
            </button>
            <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
              + Set
            </button>
            <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
              + Occasion
            </button>
            <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
              + Holiday
            </button>
            <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
              + Theme
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
