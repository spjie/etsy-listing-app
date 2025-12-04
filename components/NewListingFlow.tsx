'use client';

import { useState, useEffect } from 'react';
import { Listing } from '@/app/page';
import Step1Photos from './steps/Step1Photos';
import Step2Category from './steps/Step2Category';
import Step3BasicInfo from './steps/Step3BasicInfo';
import Step4Details from './steps/Step4Details';
import Step5Tags from './steps/Step5Tags';
import Step6FinalTouches from './steps/Step6FinalTouches';
import Step7Preview from './steps/Step7Preview';

interface NewListingFlowProps {
  onSave: (listing: Listing) => void;
  onClose: () => void;
  previousListings: Listing[];
}

export interface ListingDraft {
  photos: string[];
  video?: string;
  category?: string;
  title: string;
  price: string;
  quantity: number;
  sku?: string;
  personalization?: string;
  itemType?: 'physical' | 'digital';
  coreDetails?: string[];
  shippingDetails?: string;
  materials?: string[];
  tags: string[];
  attributes?: Record<string, string>;
  description: string;
}

export interface AISuggestions {
  category?: string;
  title?: string;
  description?: string;
  tags?: string[];
  materials?: string[];
  attributes?: Record<string, string>;
  coreDetails?: string[];
  shippingDetails?: string;
}

export default function NewListingFlow({
  onSave,
  onClose,
  previousListings,
}: NewListingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState<ListingDraft>({
    photos: [],
    title: '',
    price: '',
    quantity: 1,
    tags: [],
    description: '',
  });
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions>({});
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  // Auto-save draft to localStorage
  useEffect(() => {
    localStorage.setItem('currentDraft', JSON.stringify(draft));
  }, [draft]);

  // Load existing draft
  useEffect(() => {
    const savedDraft = localStorage.getItem('currentDraft');
    if (savedDraft) {
      try {
        setDraft(JSON.parse(savedDraft));
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, []);

  const updateDraft = (updates: Partial<ListingDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePublish = () => {
    const listing: Listing = {
      id: Date.now().toString(),
      title: draft.title,
      description: draft.description,
      tags: draft.tags,
      price: draft.price,
      quantity: draft.quantity,
      category: draft.category,
      photos: draft.photos,
      video: draft.video,
      sku: draft.sku,
      personalization: draft.personalization,
      itemType: draft.itemType,
      coreDetails: draft.coreDetails,
      shippingDetails: draft.shippingDetails,
      materials: draft.materials,
      attributes: draft.attributes,
      createdAt: new Date().toISOString(),
    };
    onSave(listing);
    localStorage.removeItem('currentDraft');
  };

  const steps = [
    { number: 1, title: 'Photos & videos', next: 'Add category' },
    { number: 2, title: 'Category', next: 'Add info like title and pricing' },
    { number: 3, title: 'Basic info', next: 'Core details, shipping, and more' },
    { number: 4, title: 'Details & shipping', next: 'Add tags and attributes' },
    { number: 5, title: 'Tags & Attributes', next: 'Last step—final touches!' },
    { number: 6, title: 'Final touches', next: 'Buyer Preview' },
    { number: 7, title: 'Buyer Preview', next: '' },
  ];

  const currentStepInfo = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-white">
      {/* Blue Banner - wraps header and step progress */}
      <div className="bg-blue-50 pb-4">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={onClose} className="text-gray-900 text-2xl">
              ✕
            </button>
            <h1 className="text-lg font-semibold text-gray-900">New listing</h1>
            <div className="w-6"></div>
          </div>
        </header>

        {/* Step Progress */}
        <div className="max-w-md mx-auto px-4 pt-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm text-gray-600">Step {currentStep} of 7</div>
                <div className="text-lg font-semibold text-gray-900">
                  {currentStepInfo.title}
                </div>
              </div>
              <div className="flex gap-2">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 border-2 border-gray-300 text-gray-900 rounded-full font-semibold hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                {currentStep < 7 && (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800"
                  >
                    Next
                  </button>
                )}
                {currentStep === 7 && (
                  <button
                    onClick={handlePublish}
                    className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800"
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
            {currentStepInfo.next && (
              <div className="text-sm text-gray-500 mb-2">
                Next: {currentStepInfo.next}
              </div>
            )}
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 7) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <main className="max-w-md mx-auto px-4 pb-20 bg-white">
        {currentStep === 1 && (
          <Step1Photos
            draft={draft}
            updateDraft={updateDraft}
            setAiSuggestions={setAiSuggestions}
            setIsLoadingSuggestions={setIsLoadingSuggestions}
            previousListings={previousListings}
          />
        )}
        {currentStep === 2 && (
          <Step2Category
            draft={draft}
            updateDraft={updateDraft}
            aiSuggestions={aiSuggestions}
          />
        )}
        {currentStep === 3 && (
          <Step3BasicInfo
            draft={draft}
            updateDraft={updateDraft}
            aiSuggestions={aiSuggestions}
          />
        )}
        {currentStep === 4 && (
          <Step4Details
            draft={draft}
            updateDraft={updateDraft}
            aiSuggestions={aiSuggestions}
          />
        )}
        {currentStep === 5 && (
          <Step5Tags
            draft={draft}
            updateDraft={updateDraft}
            aiSuggestions={aiSuggestions}
          />
        )}
        {currentStep === 6 && (
          <Step6FinalTouches
            draft={draft}
            updateDraft={updateDraft}
            aiSuggestions={aiSuggestions}
          />
        )}
        {currentStep === 7 && <Step7Preview draft={draft} />}
      </main>
    </div>
  );
}
