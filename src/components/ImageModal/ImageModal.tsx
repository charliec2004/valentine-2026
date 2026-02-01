import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ImageModal.module.css'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  caption: string
  date?: string
  index: number
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  caption,
  date,
  index,
}: ImageModalProps) {
  const hasImage = imageSrc && imageSrc.length > 0

  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  // Use portal to render modal at document body level
  // This ensures fixed positioning works even when parent has transforms
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${caption}`}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className={styles.polaroidLarge}>
              <div className={styles.imageContainer}>
                {hasImage ? (
                  <img
                    src={imageSrc}
                    alt={caption}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderText}>
                      Photo {index + 1}
                    </span>
                    <span className={styles.placeholderHint}>
                      Add your photo to see it here
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.caption}>
                <p className={styles.captionText}>{caption}</p>
                {date && (
                  <span className={styles.date}>{date}</span>
                )}
              </div>
            </div>

            <p className={styles.tapToClose}>Tap anywhere to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Render to document.body using portal
  return createPortal(modalContent, document.body)
}
