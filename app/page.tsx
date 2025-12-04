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
            <div className="mt-6 space-y-4">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-lg border border-gray-200 p-4"
                >
                  {listing.photos && listing.photos[0] && (
                    <img
                      src={listing.photos[0]}
                      alt={listing.title}
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                  <p className="text-lg font-bold text-gray-900 mt-1">${listing.price}</p>
                  {listing.tags && listing.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {listing.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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
