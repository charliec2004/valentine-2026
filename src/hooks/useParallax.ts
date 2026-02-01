import { useEffect, useRef, useState } from 'react'

interface UseParallaxOptions {
  speed?: number  // Multiplier for parallax effect (1 = normal, < 1 = slower, > 1 = faster)
  direction?: 'vertical' | 'horizontal' | 'both'
  disabled?: boolean
}

interface ParallaxValues {
  x: number
  y: number
}

export function useParallax<T extends HTMLElement>({
  speed = 0.5,
  direction = 'vertical',
  disabled = false,
}: UseParallaxOptions = {}) {
  const ref = useRef<T>(null)
  const [offset, setOffset] = useState<ParallaxValues>({ x: 0, y: 0 })

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (disabled || prefersReducedMotion) {
      setOffset({ x: 0, y: 0 })
      return
    }

    const element = ref.current
    if (!element) return

    const calculateParallax = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const windowWidth = window.innerWidth

      // Calculate how far the element is from the center of the viewport
      const elementCenterY = rect.top + rect.height / 2
      const viewportCenterY = windowHeight / 2
      const distanceFromCenterY = elementCenterY - viewportCenterY

      const elementCenterX = rect.left + rect.width / 2
      const viewportCenterX = windowWidth / 2
      const distanceFromCenterX = elementCenterX - viewportCenterX

      // Apply parallax based on direction
      let y = 0
      let x = 0

      if (direction === 'vertical' || direction === 'both') {
        y = distanceFromCenterY * speed * -0.1
      }

      if (direction === 'horizontal' || direction === 'both') {
        x = distanceFromCenterX * speed * -0.1
      }

      setOffset({ x, y })
    }

    // Use requestAnimationFrame for smooth updates
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateParallax()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', calculateParallax, { passive: true })

    // Initial calculation
    calculateParallax()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateParallax)
    }
  }, [speed, direction, disabled])

  return { ref, offset }
}
