'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LoadingFramerProps {
  width?: string
  height?: string
  shape?: 'circle' | 'rect' | 'rounded'
  duration?: number
  variant?: 'default' | 'pulse' | 'shimmer'
  className?: string
}

const LoadingFramer: React.FC<LoadingFramerProps> = ({
  width = '100%',
  height = '100%',
  shape = 'rect',
  duration = 1.5,
  variant = 'default',
  className = '',
}) => {
  const getShapeClass = () => {
    switch (shape) {
      case 'circle':
        return 'rounded-full'
      case 'rounded':
        return 'rounded-md'
      default:
        return 'rounded-none'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'pulse':
        return 'animate-pulse bg-gray-300'
      case 'shimmer':
        return 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer'
      default:
        return 'bg-gray-200'
    }
  }

  return (
    <motion.div
      className={`
        ${getShapeClass()} 
        ${getVariantClasses()} 
        ${className}
        overflow-hidden
      `}
      style={{
        width: width,
        height: height,
      }}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  )
}

export default LoadingFramer
