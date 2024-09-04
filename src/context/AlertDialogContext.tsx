import React, { createContext, useState, useContext, ReactNode } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'

interface AlertDialogContextProps {
  open: boolean
  message: string
  onConfirm: () => void
  onCancel: (() => void) | null
  showAlert: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void, // onCancel is now optional
  ) => void
}

const AlertDialogContext = createContext<AlertDialogContextProps | undefined>(
  undefined,
)

export const AlertDialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {})
  const [onCancel, setOnCancel] = useState<(() => void) | null>(null)

  const showAlert = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void, // onCancel is now optional
  ) => {
    setMessage(message)
    setOnConfirm(() => onConfirm)
    setOnCancel(() => onCancel || null) // Use null if onCancel is not provided
    setOpen(true)
  }

  const handleConfirm = () => {
    onConfirm()
    setOpen(false)
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    setOpen(false)
  }

  return (
    <AlertDialogContext.Provider
      value={{ open, message, onConfirm, onCancel, showAlert }}
    >
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContext.Provider>
  )
}

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext)
  if (context === undefined) {
    throw new Error('useAlertDialog must be used within an AlertDialogProvider')
  }
  return context
}
