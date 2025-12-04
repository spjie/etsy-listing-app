'use client';

import { useState, useEffect } from 'react';
import NewListingFlow from '@/components/NewListingFlow';

export interface Listing {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: string;
  quantity: number;
  category?: string;
  photos: string[];
  video?: string;
  sku?: string;
  personalization?: string;
  itemType?: 'physical' | 'digital';
  coreDetails?: string[];
  shippingDetails?: string;
  materials?: string[];
  attributes?: Record<string, string>;
  createdAt: string;
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [showNewListing, setShowNewListing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('listings');
    if (saved) {
      setListings(JSON.parse(saved));
    }
  }, []);

  const saveListing = (listing: Listing) => {
    const updated = [...listings, listing];
    setListings(updated);
    localStorage.setItem('listings', JSON.stringify(updated));
    setShowNewListing(false);
  };

  const deleteListing = (id: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      const updated = listings.filter((l) => l.id !== id);
      setListings(updated);
      localStorage.setItem('listings', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!showNewListing ? (
        <>
          {/* Mobile App Header */}
          <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">Listings</h1>
              <div className="text-sm text-gray-600">
                {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-md mx-auto px-4 py-6">
            <button
              onClick={() => setShowNewListing(true)}
              className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              New listing
            </button>

            {/* Listings Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden relative"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteListing(listing.id)}
                    className="absolute top-2 right-2 z-10 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-md hover:bg-opacity-100"
                  >
                    <svg
                      className="w-4 h-4 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>

                  {listing.photos && listing.photos[0] && (
                    <img
                      src={listing.photos[0]}
                      alt={listing.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                      {listing.title}
                    </h3>
                    <p className="text-base font-bold text-gray-900 mt-1">
                      ${listing.price}
                    </p>
                    {listing.tags && listing.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {listing.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      ) : (
        <NewListingFlow
          onSave={saveListing}
          onClose={() => setShowNewListing(false)}
          previousListings={listings}
        />
      )}
    </div>
  );
}
