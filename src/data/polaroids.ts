/*
 * ============================================
 * PHOTO CONFIGURATION
 * ============================================
 *
 * Update the captions below to match your memories!
 * The polaroids will display in the order listed here.
 */

// Photo imports
import aussieBeach from '../assets/images/photos/aussie-beach.JPG'
import aussieHwy from '../assets/images/photos/aussie-hwy.JPG'
import aussieWine from '../assets/images/photos/aussie-wine.JPG'
import bigSur from '../assets/images/photos/big-sur.jpeg'
import camping from '../assets/images/photos/camping.jpeg'
import ferrisWheel from '../assets/images/photos/ferris-wheel.JPG'
import halloween from '../assets/images/photos/halloween.JPG'
import homeBeach from '../assets/images/photos/home-beach.JPG'
import lobos from '../assets/images/photos/lobos.JPG'
import england from '../assets/images/photos/england.JPG'
import milfordSound from '../assets/images/photos/milford-sound.JPG'
import milfordWow from '../assets/images/photos/milford-wow.JPG'
import mustacheParty from '../assets/images/photos/mustache-party.JPG'
import newZealand from '../assets/images/photos/new-zealand.jpg'
import piPhi from '../assets/images/photos/pi-phi.jpeg'
import river from '../assets/images/photos/river.jpeg'
import silly from '../assets/images/photos/silly.JPG'

// ============================================
// Your photos and captions (edit these!)
// ============================================
export interface PhotoConfig {
  image: string
  caption: string
  date?: string
}

export const photos: PhotoConfig[] = [
  { image: piPhi, caption: 'Party Time' },
  { image: mustacheParty, caption: 'Kisses' },
  { image: ferrisWheel, caption: 'Woah whos that' },
  { image: camping, caption: 'Beer + Girl = Happy' },
  { image: bigSur, caption: 'Big Sur!' },
  { image: river, caption: 'Washed up here' },
  { image: lobos, caption: 'Cloudy dayz' },
  { image: homeBeach, caption: 'Our favorite beach, my favorite girl' },
  { image: halloween, caption: 'Boo' },
  { image: aussieBeach, caption: 'Aussie\'s!' },
  { image: aussieHwy, caption: 'To many more trips' },
  { image: aussieWine, caption: '... and drinks!' },
  { image: england, caption: 'World Travelers' },
  { image: newZealand, caption: 'New Zealand beauty' },
  { image: milfordSound, caption: 'Milford Sound' },
  { image: milfordWow, caption: '!!!' },
  { image: silly, caption: 'My Girl' },
]


// ============================================
// Internal: Generate polaroid data from config
// (You don't need to edit anything below)
// ============================================
export interface PolaroidData {
  id: string
  imageSrc: string
  caption: string
  date?: string
  rotation: number
  position: 'left' | 'center' | 'right'
  depth: number
}

const positions: Array<'left' | 'center' | 'right'> = ['left', 'center', 'right']
const rotations = [-3, 4, -2, 5, -4, 2, -5, 3, -1, 4, -3, 2, -4, 3, -2, 5, -1]
const depths = [0.7, 1.2, 0.9, 1.3, 0.6, 1.1, 0.8, 1.4, 0.7, 1.2, 0.9, 1.0, 0.8, 1.3, 0.7, 1.1, 0.9]

export const polaroids: PolaroidData[] = photos.map((photo, index) => ({
  id: `polaroid-${index + 1}`,
  imageSrc: photo.image,
  caption: photo.caption,
  date: photo.date,
  rotation: rotations[index % rotations.length],
  position: positions[index % positions.length],
  depth: depths[index % depths.length],
}))
