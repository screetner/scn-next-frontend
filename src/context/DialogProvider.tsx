import React, { createContext, useContext, useState, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DialogConfig {
  title: string
  description?: string
  content?: ReactNode
  onClose?: () => void
}

interface DialogContextType {
  showDialog: (config: DialogConfig) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export const DialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dialogs, setDialogs] = useState<DialogConfig[]>([])

  const showDialog = (config: DialogConfig) => {
    setDialogs(prevDialogs => [...prevDialogs, config])
  }

  const closeDialog = () => {
    setDialogs(prevDialogs => {
      const newDialogs = [...prevDialogs]
      newDialogs.pop()
      return newDialogs
    })
  }

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      {dialogs.map((dialog, index) => (
        <Dialog
          key={index}
          open={true}
          onOpenChange={dialog.onClose || closeDialog}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{dialog.title}</DialogTitle>
              <DialogDescription>{dialog.description}</DialogDescription>
            </DialogHeader>
            {dialog.content}
          </DialogContent>
        </Dialog>
      ))}
    </DialogContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}
