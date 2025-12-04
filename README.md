# ListIt - AI-Powered Product Listing App

A mobile-optimized web application for creating Etsy-style product listings with AI-powered suggestions for titles, descriptions, and tags.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/etsy-listing-app)

## Features

- **Mobile-First Design**: Optimized for mobile devices with an app-like interface
- **AI-Powered Suggestions**: Uses OpenAI's GPT-4 to suggest relevant titles, descriptions, and tags
- **Image Upload**: Upload product photos with preview
- **Smart Context**: AI learns from your previous listings to match your style
- **Local Storage**: All listings are saved locally in your browser
- **Real-time Preview**: Preview how your listing will look before saving
- **PWA Support**: Installable as a Progressive Web App on mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local` (or edit the existing `.env.local`)
   - Add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variable:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
5. Deploy!

### Using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts and make sure to add your `OPENAI_API_KEY` environment variable in the Vercel dashboard.

## How to Use

1. **Upload a Photo**: Tap the upload area to add a product photo
2. **Get AI Suggestions**: Click "Get AI Suggestions" to have AI generate titles, descriptions, and tags based on your image and previous listings
3. **Edit Details**: Customize the title, description, tags, and price
4. **Preview**: Tap "Preview" to see how your listing will look
5. **Save**: Hit "Save Listing" to store it locally

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **Deployment**: Vercel
- **Storage**: Browser Local Storage

## Project Structure

```
etsy-listing-app/
├── app/
│   ├── api/
│   │   └── suggest/
│   │       └── route.ts          # OpenAI API endpoint
│   ├── layout.tsx                 # Root layout with metadata
│   └── page.tsx                   # Main page component
├── components/
│   ├── ListingForm.tsx            # Form for creating listings
│   └── ListingPreview.tsx         # Preview modal component
├── public/
│   └── manifest.json              # PWA manifest
└── .env.local                     # Environment variables (not in git)
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)

## License

MIT
