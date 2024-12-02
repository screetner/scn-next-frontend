import React, { createContext, useContext, useState, ReactNode } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer'

interface DrawerConfig {
  id?: string
  title: string
  description?: string
  content: ReactNode
  footer?: ReactNode
  onClose?: () => void
  preventClose?: boolean
}

interface DrawerContextType {
  showDrawer: (config: DrawerConfig) => void
  closeDrawer: (id?: string) => void
  closeAllDrawers: () => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [drawers, setDrawers] = useState<(DrawerConfig & { id: string })[]>([])

  const showDrawer = (config: DrawerConfig) => {
    const id = config.id || `drawer-${Date.now()}`
    setDrawers(prev => [...prev, { ...config, id }])
  }

  const closeDrawer = (id?: string) => {
    setDrawers(prev => {
      if (id) {
        const drawerToClose = prev.find(d => d.id === id)
        if (drawerToClose?.onClose) drawerToClose.onClose()
        return prev.filter(d => d.id !== id)
      }

      const newDrawers = [...prev]
      const lastDrawer = newDrawers[newDrawers.length - 1]
      if (lastDrawer?.onClose) lastDrawer.onClose()
      return newDrawers.slice(0, -1)
    })
  }

  const closeAllDrawers = () => {
    drawers.forEach(drawer => {
      if (drawer.onClose) drawer.onClose()
    })
    setDrawers([])
  }

  const handleOpenChange = (
    isOpen: boolean,
    drawer: DrawerConfig & { id: string },
  ) => {
    if (!isOpen && !drawer.preventClose) {
      closeDrawer(drawer.id)
    }
  }

  return (
    <DrawerContext.Provider
      value={{
        showDrawer,
        closeDrawer,
        closeAllDrawers,
      }}
    >
      {children}
      {drawers.map(drawer => (
        <Drawer
          key={drawer.id}
          open={true}
          onOpenChange={isOpen => handleOpenChange(isOpen, drawer)}
        >
          <DrawerContent className="h-[90vh] flex flex-col">
            <DrawerHeader className="space-y-2 shrink-0">
              <DrawerTitle>{drawer.title}</DrawerTitle>
              {drawer.description && (
                <DrawerDescription>{drawer.description}</DrawerDescription>
              )}
            </DrawerHeader>
            <div className="px-4 overflow-y-auto flex-grow select-text">
              {drawer.content}
            </div>
            {drawer.footer && (
              <DrawerFooter className="shrink-0">{drawer.footer}</DrawerFooter>
            )}
          </DrawerContent>
        </Drawer>
      ))}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider')
  }
  return context
}
