import { useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from './FloatingElements.module.css'

interface FloatingElementsProps {
  intensify?: boolean
}

interface FloatingElement {
  id: number
  type: 'heart' | 'sparkle' | 'petal'
  size: number
  left: number
  delay: number
  duration: number
  opacity: number
}

const generateElements = (count: number): FloatingElement[] => {
  const elements: FloatingElement[] = []
  const types: Array<'heart' | 'sparkle' | 'petal'> = ['heart', 'sparkle', 'petal']

  for (let i = 0; i < count; i++) {
    elements.push({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      size: Math.random() * 20 + 10, // 10-30px
      left: Math.random() * 100, // 0-100%
      delay: Math.random() * 10, // 0-10s delay
      duration: Math.random() * 15 + 15, // 15-30s duration
      opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
    })
  }

  return elements
}

const Heart = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ opacity }}
    className={styles.heart}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const Sparkle = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ opacity }}
    className={styles.sparkle}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
)

const Petal = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 20 30"
    fill="currentColor"
    style={{ opacity }}
    className={styles.petal}
  >
    <ellipse cx="10" cy="15" rx="8" ry="12" />
  </svg>
)

export default function FloatingElements({ intensify = false }: FloatingElementsProps) {
  // Memoize elements to prevent regeneration on every render
  const elements = useMemo(() => {
    // Use fewer elements on mobile for performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const count = isMobile ? 15 : 25
    return generateElements(intensify ? count * 2 : count)
  }, [intensify])

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div className={styles.container} aria-hidden="true">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={styles.floatingElement}
          style={{
            left: `${element.left}%`,
          }}
          initial={{ y: '100vh', x: 0, rotate: 0 }}
          animate={{
            y: '-100vh',
            x: [0, 30, -30, 20, -20, 0],
            rotate: [0, 10, -10, 5, -5, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: element.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: element.duration / 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {element.type === 'heart' && (
            <Heart size={element.size} opacity={element.opacity} />
          )}
          {element.type === 'sparkle' && (
            <Sparkle size={element.size * 0.8} opacity={element.opacity * 1.5} />
          )}
          {element.type === 'petal' && (
            <Petal size={element.size} opacity={element.opacity} />
          )}
        </motion.div>
      ))}
    </div>
  )
}
