# For Kensington

A romantic Valentine's Day website with an interactive scrolling experience through polaroid memories, culminating in a playful "Will you be my Valentine?" ask.

## Features

- Animated gradient background with floating hearts, sparkles, and petals
- Elegant opening section with handwritten-style typography
- Scattered polaroid gallery with parallax scrolling effects
- Click/tap polaroids to view them larger
- A playful "No" button that runs away when you try to click it
- Heart-shaped confetti celebration when "Yes" is clicked
- Fully responsive design for mobile, tablet, and desktop
- Respects `prefers-reduced-motion` for accessibility

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Adding Your Photos

### Step 1: Add your images

Place your photos in the `/src/assets/images/photos/` folder. Recommended formats: `.jpg`, `.png`, or `.webp`.

### Step 2: Configure in polaroids.ts

Open `/src/data/polaroids.ts` and:

**Import your images at the top:**

```typescript
import photo1 from '../assets/images/photos/beach.jpg'
import photo2 from '../assets/images/photos/dinner.jpg'
// ... add more imports
```

**Update the photos array:**

```typescript
export const photos: PhotoConfig[] = [
  { image: photo1, caption: 'Our first adventure', date: 'January 2024' },
  { image: photo2, caption: 'That perfect sunset' },
  // ... add more in the order you want them displayed
]
```

That's it! The polaroid positions, rotations, and parallax effects are handled automatically.

### Photo Tips

- **Aspect ratio:** Photos display at their natural aspect ratio
- **File size:** Compress images for faster loading (aim for < 500KB each)
- **Number of photos:** The layout is designed for 10-14 polaroids

## Customizing Text

### Opening Section

Edit `/src/components/Opening/Opening.tsx`:

- Main title: "Hey Kensington..."
- Subtitle: "I made something for you"

### Celebration Message

Edit `/src/components/Celebration/Celebration.tsx`:

- Title: "I Love You!!"
- Subtitle: "sooooOOOOO much!!!"

## Deployment to GitHub Pages

### Prerequisites

1. Create a GitHub repository named `for-kensington` (or update `vite.config.ts` base path if using a different name)
2. Push your code to the repository

### Deploy

```bash
npm run deploy
```

This will:

1. Build the production version
2. Push to the `gh-pages` branch
3. Your site will be live at: `https://YOUR-USERNAME.github.io/for-kensington/`

### First-time setup

If this is your first deployment, you may need to:

1. Go to your repository Settings → Pages
2. Under "Source", select the `gh-pages` branch
3. Wait a few minutes for GitHub to deploy

## Project Structure

``` text
/src
  /assets/images/     ← Your photos go here
  /components/
    Opening/          ← Hero section
    PolaroidScroll/   ← Photo gallery container
    Polaroid/         ← Individual photo card
    ImageModal/       ← Photo enlargement modal
    FloatingElements/ ← Background hearts & sparkles
    ValentineAsk/     ← "Will you be my Valentine?" section
    Celebration/      ← Confetti celebration screen
    Button/           ← Reusable button component
  /hooks/             ← Custom React hooks
  /data/
    polaroids.ts      ← Photo configuration ← EDIT THIS
  /styles/
    variables.css     ← Theme colors & spacing
    global.css        ← Global styles
```

## Color Palette

You can customize colors in `/src/styles/variables.css`:

| Variable | Default | Description |
| ---------- | --------- | ------------- |
| `--color-primary` | `#FFB6C1` | Soft pink |
| `--color-secondary` | `#E63946` | Deep rose/red |
| `--color-accent` | `#FFF5F5` | Warm cream |
| `--color-text` | `#4A1C2A` | Deep burgundy |

## Browser Support

- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)
- Mobile Safari (iOS 14+)
- Chrome for Android

## Troubleshooting

**Images not showing?**

- Make sure you imported the images at the top of `polaroids.ts`
- Check that file paths and extensions are correct
- Clear your browser cache

**Animations are janky?**

- Try reducing the number of floating elements
- Compress your images
- On low-powered devices, animations are automatically reduced

**Deployment issues?**

- Ensure the base path in `vite.config.ts` matches your repo name
- Check GitHub Pages settings in your repository

## Made with Love

Built with:

- React 18 + TypeScript
- Vite
- Framer Motion
- canvas-confetti
- CSS Modules
