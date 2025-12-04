'use client';

import { useState, useEffect } from 'react';
import { ListingDraft, AISuggestions } from '../NewListingFlow';

interface Step4DetailsProps {
  draft: ListingDraft;
  updateDraft: (updates: Partial<ListingDraft>) => void;
  aiSuggestions: AISuggestions;
}

export default function Step4Details({
  draft,
  updateDraft,
  aiSuggestions,
}: Step4DetailsProps) {
  const [showDraftBanner, setShowDraftBanner] = useState(true);

  // Pre-fill fields from AI suggestions
  useEffect(() => {
    if (aiSuggestions.coreDetails && !draft.coreDetails) {
      updateDraft({ coreDetails: aiSuggestions.coreDetails });
    }
    if (aiSuggestions.shippingDetails && !draft.shippingDetails) {
      updateDraft({ shippingDetails: aiSuggestions.shippingDetails });
    }
  }, [aiSuggestions]);

  return (
    <div className="py-6">
      {/* Draft Saved Banner */}
      {showDraftBanner && (
        <div className="bg-blue-600 text-white rounded-lg p-4 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-block bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Draft
              </div>
              <h3 className="font-semibold text-lg mb-1">
                We saved your listing as a draft.
              </h3>
              <p className="text-sm text-blue-100">
                We'll save your progress as you continue—you can find the draft in
                your listings manager.
              </p>
            </div>
            <button
              onClick={() => setShowDraftBanner(false)}
              className="text-white text-xl ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        We pre-filled some fields for you!
      </h2>
      <p className="text-gray-600 mb-6">
        We added some info based on what you've used in previous listings, but read
        through and make sure everything looks OK.
      </p>

      {/* Physical/Digital Item */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateDraft({ itemType: 'physical' })}
            className={`p-6 border-2 rounded-lg transition-all ${
              draft.itemType === 'physical' || !draft.itemType
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300'
            }`}
          >
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <div className="font-semibold text-center">Physical item</div>
            {(draft.itemType === 'physical' || !draft.itemType) && (
              <div className="text-center mt-2">
                <div className="inline-block w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </button>

          <button
            onClick={() => updateDraft({ itemType: 'digital' })}
            className={`p-6 border-2 rounded-lg transition-all ${
              draft.itemType === 'digital'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300'
            }`}
          >
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="font-semibold text-center">Digital item</div>
            {draft.itemType === 'digital' && (
              <div className="text-center mt-2">
                <div className="inline-block w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Core Details - Pre-filled */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Core details</span>
            <span className="text-xs text-red-600">*</span>
            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
              Pre-filled
            </span>
          </div>
          <button className="text-gray-600">✎</button>
        </div>
        <div className="text-gray-900 text-sm space-y-1">
          <div>Made by me</div>
          <div>Finished product</div>
          <div>Made between 2020 and 2025</div>
        </div>
      </div>

      {/* Additional Options */}
      <button className="w-full py-3 mb-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
        + Process & tools
      </button>

      <button className="w-full py-3 mb-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
        + Production partners
      </button>

      {/* Renewal Options - Pre-filled */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Renewal Options</span>
            <span className="text-xs text-red-600">*</span>
            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
              Pre-filled
            </span>
          </div>
          <button className="text-gray-600">✎</button>
        </div>
        <div className="text-gray-900">Auto-renews</div>
      </div>

      {/* Processing Profile - Pre-filled */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Processing profile</span>
            <span className="text-xs text-red-600">*</span>
            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
              Pre-filled
            </span>
          </div>
          <button className="text-gray-600">✎</button>
        </div>
        <div className="text-gray-900">3-5 days processing time</div>
      </div>

      {/* Shipping Details - Pre-filled */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Shipping details</span>
            <span className="text-xs text-red-600">*</span>
            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
              Pre-filled
            </span>
          </div>
          <button className="text-gray-600">✎</button>
        </div>
        <div className="text-gray-900 text-sm space-y-1">
          <div>letter mail</div>
          <div className="text-gray-600">12 Active listings</div>
          <div className="text-gray-600">from United States</div>
          <div className="font-semibold">Fixed prices</div>
        </div>
      </div>

      <button className="w-full py-3 mb-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
        + Item weight
      </button>

      <button className="w-full py-3 mb-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
        + Item size
      </button>

      {/* Return Policy - Pre-filled */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Return & exchange policy
            </span>
            <span className="text-xs text-red-600">*</span>
            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
              Pre-filled
            </span>
          </div>
          <button className="text-gray-600">✎</button>
        </div>
        <div className="text-gray-900 font-semibold mb-1">
          No returns or exchanges
        </div>
        <div className="text-sm text-gray-600">
          Buyer can contact seller about any issues with an order.
        </div>
      </div>

      <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-left px-4">
        + Shop section
      </button>
    </div>
  );
}
