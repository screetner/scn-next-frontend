'use client'

import './[locale]/globals.css'
import { redirect } from 'next/navigation'

export default function NotFound() {
  redirect('/en')
}
