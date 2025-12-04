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
  // Generate category from AI suggestion with hierarchical path
  const generateCategoryPath = (category: string) => {
    const parts = category.split('>').map((p) => p.trim());
    if (parts.length === 1) {
      // If AI only provided final category, generate a reasonable path
      return `Handmade > ${category} > ${category}`;
    }
    return category;
  };

  // Build categories list with AI suggestion and static options
  const buildCategories = () => {
    const staticCategories = [
      {
        id: 'beaded-necklaces',
        name: 'Beaded Necklaces',
        path: 'Jewelry > Necklaces > Beaded Necklaces',
        lastUsed: true,
        suggested: false,
      },
      {
        id: 'statement-earrings',
        name: 'Statement Earrings',
        path: 'Jewelry > Earrings > Statement Earrings',
        lastUsed: false,
        suggested: false,
      },
    ];

    if (aiSuggestions.category) {
      return [
        {
          id: 'ai-suggested',
          name: aiSuggestions.category.split('>').pop()?.trim() || aiSuggestions.category,
          path: generateCategoryPath(aiSuggestions.category),
          suggested: true,
          lastUsed: false,
        },
        ...staticCategories,
      ];
    }

    return staticCategories;
  };

  const categories = buildCategories();
  const isLoading = !aiSuggestions.category;

  const handleCategorySelect = (categoryId: string) => {
    const selected = categories.find((c) => c.id === categoryId);
    updateDraft({ category: selected?.name });
  };

  const handleCustomCategory = () => {
    const customCategory = prompt('Enter a custom category:');
    if (customCategory) {
      updateDraft({ category: customCategory });
    }
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
        {/* Loading placeholder for AI suggestion */}
        {isLoading && (
          <div className="w-full text-left p-4 border-2 border-gray-300 rounded-lg bg-gray-50 animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-200 text-gray-200 text-xs font-medium rounded-full">
                Loading...
              </span>
            </div>
          </div>
        )}

        {categories.map((category) => (
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
              <div className="flex gap-2">
                {category.suggested && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    Suggested
                  </span>
                )}
                {category.lastUsed && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    Last used
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleCustomCategory}
        className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50"
      >
        Choose a different category
      </button>
    </div>
  );
}
