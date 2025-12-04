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
  const [attributeModal, setAttributeModal] = useState<string | null>(null);
  const [attributeValue, setAttributeValue] = useState('');

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

  const openAttributeModal = (attr: string) => {
    setAttributeModal(attr);
    const currentValue = draft.attributes?.[attr] || '';
    setAttributeValue(currentValue);
  };

  const handleSaveAttribute = () => {
    if (attributeModal && attributeValue) {
      updateDraft({
        attributes: { ...draft.attributes, [attributeModal]: attributeValue },
      });
    }
    setAttributeModal(null);
    setAttributeValue('');
  };

  const handleAcceptAttributeSuggestion = (attr: string) => {
    const suggestion = aiSuggestions.attributes?.[attr];
    if (suggestion) {
      setAttributeValue(suggestion);
      updateDraft({
        attributes: { ...draft.attributes, [attr]: suggestion },
      });
      setAttributeModal(null);
    }
  };

  const getAttributeLabel = (attr: string) => {
    const labels: Record<string, string> = {
      craftType: 'Craft type',
      primaryColor: 'Primary color',
      secondaryColor: 'Secondary color',
      occasion: 'Occasion',
      holiday: 'Holiday',
      theme: 'Theme',
    };
    return labels[attr] || attr;
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
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-gray-600">SUGGESTED TAGS</div>
              <div className="flex gap-2">
                <button
                  onClick={handleAcceptTags}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  title="Accept All"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={handleRejectTags}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  title="Reject All"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {aiSuggestions.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-full flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => {
                      if (draft.tags.length < 13) {
                        updateDraft({ tags: [...draft.tags, tag] });
                      }
                    }}
                    className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    title="Add this tag"
                  >
                    <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </span>
              ))}
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
            {['craftType', 'primaryColor', 'secondaryColor', 'occasion', 'holiday', 'theme'].map(
              (attr) => (
                <button
                  key={attr}
                  onClick={() => openAttributeModal(attr)}
                  className={`w-full py-3 border-2 ${
                    draft.attributes?.[attr]
                      ? 'border-gray-400 bg-gray-50'
                      : 'border-gray-300'
                  } text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4`}
                >
                  {draft.attributes?.[attr] ? (
                    <span>{draft.attributes[attr]}</span>
                  ) : (
                    <span>+ {getAttributeLabel(attr)}</span>
                  )}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Attribute Modal */}
      {attributeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md max-h-[70vh] flex flex-col rounded-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <button
                onClick={() => setAttributeModal(null)}
                className="text-gray-900 text-2xl"
              >
                ✕
              </button>
              <h2 className="text-lg font-semibold text-gray-900">
                {getAttributeLabel(attributeModal)}
              </h2>
              <button
                onClick={handleSaveAttribute}
                className="px-4 py-2 bg-gray-600 text-white font-medium rounded-full hover:bg-gray-700"
              >
                Save
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              {/* AI Suggested Attribute */}
              {aiSuggestions.attributes?.[attributeModal] && (
                <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-600 mb-2">
                        SUGGESTED
                      </div>
                      <p className="text-gray-900">
                        {aiSuggestions.attributes[attributeModal]}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => handleAcceptAttributeSuggestion(attributeModal)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        title="Accept"
                      >
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setAttributeModal(null)}
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

              <input
                type="text"
                value={attributeValue}
                onChange={(e) => setAttributeValue(e.target.value)}
                placeholder={`Add ${getAttributeLabel(attributeModal).toLowerCase()}`}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
