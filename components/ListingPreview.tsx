'use client';

import { Listing } from '@/app/page';

interface ListingPreviewProps {
  listing: Listing;
  onClose: () => void;
}

export default function ListingPreview({ listing, onClose }: ListingPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          {listing.imageUrl && (
            <div className="mb-4 rounded-xl overflow-hidden">
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Price */}
          <div className="mb-4">
            <p className="text-3xl font-bold text-gray-900">${listing.price}</p>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3">{listing.title}</h3>

          {/* Tags */}
          {listing.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {listing.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
