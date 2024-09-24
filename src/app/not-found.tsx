'use client'

import './[locale]/globals.css'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from '@/i18n/routing'

export default function NotFound() {
  const router = useRouter()

  return (
    <html>
      <body className="bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full"
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex justify-center mb-6"
          >
            <AlertCircle size={80} className="text-red-500" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
            404 - Page Not Found
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl mb-6 text-center text-gray-600"
          >
            Oops! The page you are looking for has vanished into the digital
            void.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-8 bg-blue-50 rounded-lg p-4"
          >
            <p className="text-lg text-center text-blue-800 font-semibold mb-2">
              Our website supports:
            </p>
            <ul className="flex justify-center space-x-4">
              <li className="bg-blue-500 text-white px-3 py-1 rounded-full">
                English
              </li>
              <li className="bg-blue-500 text-white px-3 py-1 rounded-full">
                Thai
              </li>
            </ul>
          </motion.div>
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => router.push('/', { locale: 'en' })}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
            >
              Take Me Home
            </Button>
          </motion.div>
        </motion.div>
      </body>
    </html>
  )
}
