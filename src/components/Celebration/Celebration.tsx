import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import styles from './Celebration.module.css'

// Heart shape for confetti
const heartShape = confetti.shapeFromPath({
  path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
})

export default function Celebration() {
  const hasLaunched = useRef(false)

  const launchConfetti = useCallback(() => {
    const duration = 6000 // 6 seconds
    const end = Date.now() + duration

    const colors = ['#FFB6C1', '#E63946', '#FF69B4', '#FF1493', '#FFC0CB']

    const frame = () => {
      // Launch confetti from both sides
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
        shapes: [heartShape, 'circle'],
        scalar: 1.2,
      })

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
        shapes: [heartShape, 'circle'],
        scalar: 1.2,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors,
      shapes: [heartShape, heartShape, 'circle'],
      scalar: 1.5,
    })

    // Continuous confetti
    frame()
  }, [])

  useEffect(() => {
    // Only launch once
    if (!hasLaunched.current) {
      hasLaunched.current = true
      // Small delay to let the component render first
      setTimeout(launchConfetti, 100)
    }
  }, [launchConfetti])

  return (
    <section className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
          delay: 0.2,
        }}
      >
        <motion.div
          className={styles.heart}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={styles.heartIcon}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          I Love You!!
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          sooooOOOOO much!!!
        </motion.p>
      </motion.div>
    </section>
  )
}
