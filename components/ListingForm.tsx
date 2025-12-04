'use client';

import { useState, useRef } from 'react';
import { Listing } from '@/app/page';

interface ListingFormProps {
  onSave: (listing: Listing) => void;
  previousListings: Listing[];
  onPreview: (listing: Listing) => void;
}

export default function ListingForm({ onSave, previousListings, onPreview }: ListingFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAISuggestions = async () => {
    setAiLoading(true);
    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentTitle: title,
          currentDescription: description,
          currentTags: tags,
          imageUrl,
          previousListings: previousListings.slice(-5),
        }),
      });

      if (!response.ok) throw new Error('Failed to get suggestions');

      const suggestions = await response.json();

      if (suggestions.title && !title) setTitle(suggestions.title);
      if (suggestions.description && !description) setDescription(suggestions.description);
      if (suggestions.tags && suggestions.tags.length > 0) {
        const newTags = [...new Set([...tags, ...suggestions.tags])];
        setTags(newTags.slice(0, 13));
      }
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      alert('Failed to get AI suggestions. Please check your API key.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listing: Listing = {
      id: Date.now().toString(),
      title,
      description,
      tags,
      price,
      imageUrl,
      createdAt: new Date().toISOString(),
    };
    onSave(listing);

    // Reset form
    setTitle('');
    setDescription('');
    setTags([]);
    setPrice('');
    setImageUrl('');
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePreview = () => {
    const listing: Listing = {
      id: 'preview',
      title,
      description,
      tags,
      price,
      imageUrl,
      createdAt: new Date().toISOString(),
    };
    onPreview(listing);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Product Photo
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
        >
          {imageUrl ? (
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Tap to upload photo</p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* AI Suggestions Button */}
      <button
        type="button"
        onClick={handleAISuggestions}
        disabled={aiLoading || (!imageUrl && !title && !description)}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {aiLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating suggestions...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get AI Suggestions
          </>
        )}
      </button>

      {/* Title */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Handmade ceramic mug"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          required
        />
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your product..."
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
          required
        />
      </div>

      {/* Tags */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tags (up to 13)
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add a tag"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            disabled={tags.length >= 13}
          />
          <button
            type="button"
            onClick={addTag}
            disabled={tags.length >= 13}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-orange-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Price
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            required
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 sticky bottom-4">
        <button
          type="button"
          onClick={handlePreview}
          disabled={!title || !description}
          className="flex-1 bg-white border-2 border-orange-500 text-orange-500 font-semibold py-4 px-6 rounded-xl shadow-md hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Preview
        </button>
        <button
          type="submit"
          className="flex-1 bg-orange-500 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:bg-orange-600 hover:shadow-lg transition-all"
        >
          Save Listing
        </button>
      </div>
    </form>
  );
}
