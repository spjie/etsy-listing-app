'use client';

import { useState } from 'react';
import { ListingDraft, AISuggestions } from '../NewListingFlow';

interface Step3BasicInfoProps {
  draft: ListingDraft;
  updateDraft: (updates: Partial<ListingDraft>) => void;
  aiSuggestions: AISuggestions;
}

export default function Step3BasicInfo({
  draft,
  updateDraft,
  aiSuggestions,
}: Step3BasicInfoProps) {
  const [showTitleSuggestion, setShowTitleSuggestion] = useState(
    !!aiSuggestions.title
  );
  const [titleInput, setTitleInput] = useState(draft.title);

  const handleAcceptTitle = () => {
    if (aiSuggestions.title) {
      setTitleInput(aiSuggestions.title);
      updateDraft({ title: aiSuggestions.title });
      setShowTitleSuggestion(false);
    }
  };

  const handleRejectTitle = () => {
    setShowTitleSuggestion(false);
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Add a title, price, and other key info
      </h2>
      <p className="text-gray-600 mb-6">
        You can set up variations in a later step.
      </p>

      {/* Title */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <span className="text-sm text-gray-500">Required</span>
        </div>

        {showTitleSuggestion && aiSuggestions.title ? (
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 mb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="text-xs font-medium text-gray-600 mb-1">
                  SUGGESTED
                </div>
                <div className="text-gray-900">{aiSuggestions.title}</div>
              </div>
              <div className="flex gap-2 ml-2">
                <button
                  onClick={handleAcceptTitle}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  title="Accept"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={handleRejectTitle}
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
        ) : null}

        <input
          type="text"
          value={titleInput}
          onChange={(e) => {
            setTitleInput(e.target.value);
            updateDraft({ title: e.target.value });
          }}
          placeholder="Add a title"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Price</label>
          <span className="text-sm text-gray-500">Required</span>
        </div>
        <div className="relative">
          <span className="absolute left-4 top-3 text-gray-500 text-lg">$</span>
          <input
            type="number"
            step="0.01"
            value={draft.price}
            onChange={(e) => updateDraft({ price: e.target.value })}
            placeholder="0.00"
            className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Quantity</label>
          <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600">✎</span>
          </button>
        </div>
        <input
          type="number"
          value={draft.quantity}
          onChange={(e) => updateDraft({ quantity: parseInt(e.target.value) || 1 })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* SKU */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">SKU</label>
        <input
          type="text"
          value={draft.sku || ''}
          onChange={(e) => updateDraft({ sku: e.target.value })}
          placeholder="Add SKU"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Personalization */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Personalization
        </label>
        <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
          + Personalization
        </button>
      </div>
    </div>
  );
}
