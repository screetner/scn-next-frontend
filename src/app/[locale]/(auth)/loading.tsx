'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <motion.div
        className="w-24 h-24 border-4 border-primary rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
