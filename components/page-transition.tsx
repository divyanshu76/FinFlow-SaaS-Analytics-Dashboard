'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  delay?: number
}

export function PageTransition({ children, delay = 0 }: PageTransitionProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Skip animation on server-side render to prevent hydration mismatch
  if (!isClient) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
