'use client';

import { ListingDraft, AISuggestions } from '../NewListingFlow';

interface Step2CategoryProps {
  draft: ListingDraft;
  updateDraft: (updates: Partial<ListingDraft>) => void;
  aiSuggestions: AISuggestions;
}

export default function Step2Category({
  draft,
  updateDraft,
  aiSuggestions,
}: Step2CategoryProps) {
  // Sample categories - in a real app, these would come from an API
  const categories = [
    {
      id: 'hoop-earrings',
      name: 'Hoop Earrings',
      path: 'Jewelry > Earrings > Hoop Earrings',
      suggested: true,
    },
    {
      id: 'beaded-necklaces',
      name: 'Beaded Necklaces',
      path: 'Jewelry > Necklaces > Beaded Necklaces',
      suggested: false,
    },
    {
      id: 'statement-earrings',
      name: 'Statement Earrings',
      path: 'Jewelry > Earrings > Statement Earrings',
      suggested: false,
    },
  ];

  // If AI suggested a category, mark it
  const categoriesWithSuggestion = categories.map((cat) => ({
    ...cat,
    suggested:
      aiSuggestions.category &&
      cat.name.toLowerCase().includes(aiSuggestions.category.toLowerCase()),
  }));

  const handleCategorySelect = (categoryId: string) => {
    const selected = categories.find((c) => c.id === categoryId);
    updateDraft({ category: selected?.name });
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        What kind of item is it?
      </h2>
      <p className="text-gray-600 mb-6">
        It's best to be specific-- we'll tag your item in the broader categories it
        fits under, too.
      </p>

      {/* Category Options */}
      <div className="space-y-3 mb-6">
        {categoriesWithSuggestion.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
              draft.category === category.name
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    draft.category === category.name
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {draft.category === category.name && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{category.name}</div>
                  <div className="text-sm text-gray-600">{category.path}</div>
                </div>
              </div>
              {category.suggested && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  Suggested
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <button className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50">
        Choose a different category
      </button>
    </div>
  );
}
