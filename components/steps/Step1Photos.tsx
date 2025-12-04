'use client';

import { ListingDraft, AISuggestions } from '../NewListingFlow';
import { Listing } from '@/app/page';

interface Step1PhotosProps {
  draft: ListingDraft;
  updateDraft: (updates: Partial<ListingDraft>) => void;
  setAiSuggestions: (suggestions: AISuggestions) => void;
  setIsLoadingSuggestions: (loading: boolean) => void;
  previousListings: Listing[];
}

export default function Step1Photos({
  draft,
  updateDraft,
  setAiSuggestions,
  setIsLoadingSuggestions,
  previousListings,
}: Step1PhotosProps) {
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      await new Promise((resolve) => {
        reader.onloadend = () => {
          newPhotos.push(reader.result as string);
          resolve(null);
        };
        reader.readAsDataURL(file);
      });
    }

    const allPhotos = [...draft.photos, ...newPhotos];
    updateDraft({ photos: allPhotos });

    // Automatically trigger AI suggestions when photos are uploaded
    if (allPhotos.length > 0) {
      generateAISuggestions(allPhotos);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      updateDraft({ video: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const generateAISuggestions = async (photos: string[]) => {
    setIsLoadingSuggestions(true);
    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: photos[0],
          previousListings: previousListings.map((l) => ({
            title: l.title,
            description: l.description,
            tags: l.tags,
            category: l.category,
          })),
        }),
      });

      if (!response.ok) throw new Error('Failed to get suggestions');

      const suggestions = await response.json();
      setAiSuggestions({
        category: suggestions.category,
        title: suggestions.title,
        description: suggestions.description,
        tags: suggestions.tags,
        materials: suggestions.materials,
        coreDetails: suggestions.coreDetails,
        shippingDetails: suggestions.shippingDetails,
      });
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = draft.photos.filter((_, i) => i !== index);
    updateDraft({ photos: newPhotos });
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Add photos and video
      </h2>
      <p className="text-gray-600 mb-6">
        Your files will load while you fill out the form, and you can edit your
        photos in a later step.
      </p>

      {/* Photos Section */}
      <div className="border-2 border-gray-300 rounded-lg p-6 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Photos</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose up to 20 photos-- make sure to show off all of your items specific
          details.
        </p>

        {/* Photo Grid */}
        {draft.photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {draft.photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Product ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="flex items-center justify-center w-full py-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <span className="text-gray-700 font-medium">+ Add photos</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Video Section */}
      <div className="border-2 border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Video</h3>
        <p className="text-sm text-gray-600 mb-4">
          Add a 5 to 15 second video. Try sharing how you made your item, or how to
          use it.
        </p>

        {draft.video && (
          <div className="mb-4">
            <video src={draft.video} controls className="w-full rounded-md" />
            <button
              onClick={() => updateDraft({ video: undefined })}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Remove video
            </button>
          </div>
        )}

        <label className="flex items-center justify-center w-full py-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <span className="text-gray-700 font-medium">+ Add video</span>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
