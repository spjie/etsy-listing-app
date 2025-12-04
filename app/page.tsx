'use client';

import { useState, useEffect } from 'react';
import ListingForm from '@/components/ListingForm';
import ListingPreview from '@/components/ListingPreview';

export interface Listing {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: string;
  imageUrl?: string;
  createdAt: string;
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentListing, setCurrentListing] = useState<Listing | null>(null);

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Mobile App Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-orange-600">ListIt</h1>
          <div className="text-sm text-gray-600">
            {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 pb-20">
        <ListingForm
          onSave={saveListing}
          previousListings={listings}
          onPreview={setCurrentListing}
        />
      </main>

      {/* Preview Modal */}
      {currentListing && (
        <ListingPreview
          listing={currentListing}
          onClose={() => setCurrentListing(null)}
        />
      )}
    </div>
  );
}
