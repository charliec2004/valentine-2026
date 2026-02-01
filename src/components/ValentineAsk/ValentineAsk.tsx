import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../Button/Button'
import styles from './ValentineAsk.module.css'

interface ValentineAskProps {
  onYesClick: () => void
}

const noButtonTexts = [
  'No',
  'Are you sure?',
  'Really??',
  'Think again!',
  'Please?',
  'Pretty please?',
  '🥺',
  '💔',
]

export default function ValentineAsk({ onYesClick }: ValentineAskProps) {
  const [escapeAttempts, setEscapeAttempts] = useState(0)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [isNoButtonVisible, setIsNoButtonVisible] = useState(true)
  const buttonsAreaRef = useRef<HTMLDivElement>(null)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  // Calculate a random position within the buttons area only
  const getRandomPosition = useCallback(() => {
    if (!buttonsAreaRef.current || !noButtonRef.current) return { x: 0, y: 0 }

    const buttonsArea = buttonsAreaRef.current.getBoundingClientRect()
    const button = noButtonRef.current.getBoundingClientRect()

    // Account for button dimensions and some padding
    const padding = 10
    const maxX = buttonsArea.width - button.width - padding * 2
    const maxY = buttonsArea.height - button.height - padding * 2

    // Random position within the buttons area bounds (relative to center)
    const x = Math.random() * maxX - maxX / 2
    const y = Math.random() * maxY - maxY / 2

    return { x, y }
  }, [])

  const handleNoInteraction = useCallback(() => {
    const newAttempts = escapeAttempts + 1
    setEscapeAttempts(newAttempts)

    // After too many attempts, the button disappears
    if (newAttempts >= noButtonTexts.length) {
      setIsNoButtonVisible(false)
      return
    }

    // Move to a new random position
    const newPosition = getRandomPosition()
    setNoButtonPosition(newPosition)
  }, [escapeAttempts, getRandomPosition])

  // Handle hover for desktop
  const handleMouseEnter = () => {
    handleNoInteraction()
  }

  // Handle touch for mobile (first tap moves the button)
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    handleNoInteraction()
  }

  // Calculate shrink scale based on attempts
  const shrinkScale = Math.max(0.4, 1 - escapeAttempts * 0.08)

  // Get current button text
  const currentNoText = noButtonTexts[Math.min(escapeAttempts, noButtonTexts.length - 1)]

  // Transition speed increases with each attempt
  const transitionDuration = Math.max(0.1, 0.3 - escapeAttempts * 0.03)

  return (
    <section className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className={styles.question}>
          Will you be my Valentine?
        </h2>

        <div className={styles.buttons} ref={buttonsAreaRef}>
          <Button
            variant="primary"
            size="large"
            onClick={onYesClick}
            className={styles.yesButton}
          >
            Yes!
          </Button>

          <AnimatePresence>
            {isNoButtonVisible && (
              <motion.div
                className={styles.noButtonWrapper}
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                  scale: shrinkScale,
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  rotate: 360,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  duration: transitionDuration,
                }}
              >
                <Button
                  ref={noButtonRef}
                  variant="secondary"
                  size="large"
                  className={styles.noButton}
                  onMouseEnter={handleMouseEnter}
                  onTouchStart={handleTouchStart}
                  aria-label="No (but the button runs away)"
                >
                  {currentNoText}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isNoButtonVisible && (
          <motion.p
            className={styles.hint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The only option left is Yes... 💕
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
