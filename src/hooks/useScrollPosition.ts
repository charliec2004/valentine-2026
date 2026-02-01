import { useState, useEffect } from 'react'

interface ScrollPosition {
  scrollY: number
  scrollX: number
  scrollProgress: number // 0 to 1 based on document height
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    scrollProgress: 0,
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollX = window.scrollX
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = documentHeight > 0 ? scrollY / documentHeight : 0

      setScrollPosition({
        scrollY,
        scrollX,
        scrollProgress: Math.min(1, Math.max(0, scrollProgress)),
      })
    }

    // Use passive event listener for performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Set initial position
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}
