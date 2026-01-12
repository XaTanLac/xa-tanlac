import { BoundingBox, motion } from 'motion/react'
import React from 'react'

interface MovingButtonProps {
  dragConstraints?: BoundingBox
  isDragMomentum?: boolean
  dragElastic?: number
  drag?: boolean
  className?: string
  onClick?: () => void
  children?: React.ReactNode
}

const MovingButton: React.FC<MovingButtonProps> = ({
  children,
  className,
  onClick,
  dragConstraints = {
    top: 200 - window.innerHeight,
    left: 110 - window.innerWidth,
    right: 30,
    bottom: 50,
  },
  isDragMomentum = false,
  dragElastic = 0.2,
  drag = true,
}) => {
  return (
    <motion.div
      className={`w-16 h-16 flex justify-center items-center rounded-full bg-green-600 ${className}`}
      drag={drag}
      dragMomentum={isDragMomentum}
      dragElastic={dragElastic}
      dragConstraints={{ ...dragConstraints }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export default MovingButton
