'use client';

import { ListingDraft } from '../NewListingFlow';

interface Step7PreviewProps {
  draft: ListingDraft;
}

export default function Step7Preview({ draft }: Step7PreviewProps) {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        How shoppers will see your listing in search results
      </h2>

      {/* Preview Card */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        {/* Main Photo */}
        {draft.photos.length > 0 && (
          <img
            src={draft.photos[0]}
            alt={draft.title || 'Product'}
            className="w-full h-64 object-cover"
          />
        )}

        {/* Listing Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            {draft.title || 'Title'}
          </h3>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-gray-900">
              ${draft.price || '0.00'}
            </span>
          </div>

          {draft.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {draft.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
              {draft.tags.length > 5 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{draft.tags.length - 5} more
                </span>
              )}
            </div>
          )}

          {draft.description && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-700 text-sm whitespace-pre-wrap line-clamp-4">
                {draft.description}
              </p>
            </div>
          )}

          {/* Additional Details */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="font-semibold text-gray-900 mb-2">Details</h4>
            <div className="space-y-1 text-sm text-gray-600">
              {draft.category && (
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="text-gray-900">{draft.category}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span className="text-gray-900">{draft.quantity}</span>
              </div>
              {draft.itemType && (
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="text-gray-900 capitalize">{draft.itemType}</span>
                </div>
              )}
              {draft.materials && draft.materials.length > 0 && (
                <div className="flex justify-between">
                  <span>Materials:</span>
                  <span className="text-gray-900">{draft.materials.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {draft.photos.length > 1 && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="grid grid-cols-5 gap-2">
                {draft.photos.slice(0, 5).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-16 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          This is how buyers will see your listing when they search on the marketplace.
          Review all the details before publishing.
        </p>
      </div>
    </div>
  );
}
