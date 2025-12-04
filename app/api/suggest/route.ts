import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { currentTitle, currentDescription, currentTags, imageUrl, previousListings } =
      await request.json();

    // Build context from previous listings
    const previousContext =
      previousListings && previousListings.length > 0
        ? `Previous listings for context:\n${previousListings
            .map(
              (listing: any) =>
                `- Title: ${listing.title}\n  Tags: ${listing.tags.join(', ')}\n  Description: ${listing.description.substring(0, 100)}...`
            )
            .join('\n\n')}`
        : '';

    const currentContext = `
Current listing information:
${currentTitle ? `Title: ${currentTitle}` : 'No title yet'}
${currentDescription ? `Description: ${currentDescription}` : 'No description yet'}
${currentTags && currentTags.length > 0 ? `Tags: ${currentTags.join(', ')}` : 'No tags yet'}
    `.trim();

    const prompt = `You are helping a seller create an Etsy-style product listing. Based on the product image and information provided, suggest improvements or fill in missing details.

${previousContext}

${currentContext}

Please provide comprehensive suggestions for the listing:

1. Category: What type of product is this? (e.g., "Hoop Earrings", "Beaded Necklaces", "Handmade Ring")
2. A catchy, SEO-friendly title (if not already complete)
3. A compelling product description (if not already complete)
4. Relevant tags for searchability (maximum 13 tags)
5. Materials used (e.g., ["sterling silver", "glass beads", "copper wire"])
6. Core details about the item
7. Suggested shipping details based on item type

Consider:
- What you see in the product image - the colors, materials, style, size
- The seller's previous listing style and patterns
- SEO keywords that buyers might search for
- What makes the product unique and appealing
- Current trends in handmade/artisan products
- Appropriate category based on what you see

Return your response in JSON format:
{
  "category": "product category name",
  "title": "suggested title",
  "description": "suggested description (2-3 paragraphs)",
  "tags": ["tag1", "tag2", "tag3", ...],
  "materials": ["material1", "material2", ...],
  "coreDetails": ["Made by me", "Finished product", "Made between 2020 and 2025"],
  "shippingDetails": "letter mail"
}

If a field already has good content, you can return null for that field.`;

    const messages: any[] = [
      {
        role: 'system',
        content:
          'You are an expert Etsy seller assistant who helps create compelling product listings. Always return valid JSON only.',
      },
    ];

    // Add image if provided
    if (imageUrl) {
      messages.push({
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: imageUrl },
          },
          {
            type: 'text',
            text: prompt,
          },
        ],
      });
    } else {
      messages.push({
        role: 'user',
        content: prompt,
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const suggestions = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(suggestions);
  } catch (error: any) {
    console.error('Error generating suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions', details: error.message },
      { status: 500 }
    );
  }
}
