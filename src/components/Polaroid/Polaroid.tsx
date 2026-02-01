import { useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useParallax } from '../../hooks/useParallax'
import type { PolaroidData } from '../../data/polaroids'
import ImageModal from '../ImageModal/ImageModal'
import styles from './Polaroid.module.css'

interface PolaroidProps {
  data: PolaroidData
  index: number
}

export default function Polaroid({ data, index }: PolaroidProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasError, setHasError] = useState(false)

  const { ref: intersectionRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '50px',
    triggerOnce: true,
  })

  const { ref: parallaxRef, offset } = useParallax<HTMLDivElement>({
    speed: data.depth,
    direction: 'vertical',
  })

  // Combine refs
  const setRefs = (element: HTMLDivElement | null) => {
    // @ts-expect-error - Setting ref current directly
    intersectionRef.current = element
    // @ts-expect-error - Setting ref current directly
    parallaxRef.current = element
  }

  const hasImage = data.imageSrc && data.imageSrc.length > 0

  // Calculate animation delay based on index for staggered effect
  const animationDelay = index * 0.1

  // Determine position classes
  const positionClass = styles[data.position]

  // Float animation with unique timing per polaroid
  const floatDuration = 3 + (index % 3) * 0.5 // 3s, 3.5s, or 4s

  return (
    <>
      <motion.div
        ref={setRefs}
        className={`${styles.container} ${positionClass}`}
        style={{
          transform: `rotate(${data.rotation}deg) translateY(${offset.y}px)`,
        }}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={isIntersecting ? {
          opacity: 1,
          y: 0,
          scale: 1,
        } : {}}
        transition={{
          duration: 0.6,
          delay: animationDelay,
          ease: 'easeOut',
        }}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsModalOpen(true)
          }
        }}
        aria-label={`View photo: ${data.caption}`}
      >
        <motion.div
          className={styles.polaroid}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className={styles.imageContainer}>
            {hasImage && !hasError ? (
              <>
                {!isLoaded && (
                  <div className={styles.skeleton} aria-hidden="true" />
                )}
                <img
                  src={data.imageSrc}
                  alt={data.caption}
                  className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
                  loading="lazy"
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setHasError(true)}
                />
              </>
            ) : (
              <div className={styles.placeholder}>
                <span className={styles.placeholderText}>
                  Photo {index + 1}
                </span>
                <span className={styles.placeholderHint}>
                  Click to preview
                </span>
              </div>
            )}
          </div>

          <div className={styles.caption}>
            <p className={styles.captionText}>{data.caption}</p>
            {data.date && (
              <span className={styles.date}>{data.date}</span>
            )}
          </div>
        </motion.div>
      </motion.div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={data.imageSrc}
        caption={data.caption}
        date={data.date}
        index={index}
      />
    </>
  )
}
