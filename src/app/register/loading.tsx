'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

const LoadingCheckingRegisterToken = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="p-6">
        <motion.div
          className="flex flex-col items-center space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 border-4 border-primary rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <h2 className="text-2xl font-bold text-foreground">
            Checking your registration token
          </h2>
          <div className="flex space-x-2">
            <motion.div
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <motion.div
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.4,
              }}
            />
          </div>
        </motion.div>
      </Card>
    </div>
  )
}

export default LoadingCheckingRegisterToken
