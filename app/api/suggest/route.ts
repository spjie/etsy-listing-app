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

    const prompt = `You are helping a seller create an Etsy-style product listing. Based on the information provided, suggest improvements or fill in missing details.

${previousContext}

${currentContext}

Please provide:
1. A catchy, SEO-friendly title (if not already complete)
2. A compelling product description (if not already complete)
3. Relevant tags for searchability (maximum 13 tags)

Consider:
- The seller's previous listing style and patterns
- SEO keywords that buyers might search for
- What makes the product unique and appealing
- Current trends in handmade/artisan products

Return your response in JSON format:
{
  "title": "suggested title (only if current title is incomplete or empty)",
  "description": "suggested description (only if current description is incomplete or empty)",
  "tags": ["tag1", "tag2", "tag3", ...]
}

If a field already has good content, you can return null for that field.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert Etsy seller assistant who helps create compelling product listings. Always return valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
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
