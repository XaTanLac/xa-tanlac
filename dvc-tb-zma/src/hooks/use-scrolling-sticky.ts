import { useEffect, useRef, useState } from 'react'

export const useScrollingSticky = (
  containerRef: React.RefObject<HTMLDivElement>,
  stickyRef: React.RefObject<HTMLDivElement>,
): void => {
  const ticking = useRef(false) // Prevent multiple calls per frame
  const [prevScroll, setPrevScroll] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const sticky = stickyRef.current
    if (!container || !sticky) return

    const handleScroll = (): void => {
      const currentScroll = container.scrollTop
      const isScrollingUp = currentScroll < prevScroll

      const stickyHeight = sticky.offsetHeight

      if (isScrollingUp) {
        sticky.style.top = '0px'
      } else {
        sticky.style.top = `-${stickyHeight}px`
      }
      setPrevScroll(currentScroll)
      ticking.current = false // allow next scroll to trigger
    }

    const onScroll = (): void => {
      if (!ticking.current) {
        requestAnimationFrame(handleScroll)
        ticking.current = true
      }
    }

    container.addEventListener('scroll', onScroll)
    return () => container.removeEventListener('scroll', onScroll)
  }, [prevScroll, containerRef, stickyRef])
}
