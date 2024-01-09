import React, { createContext, useCallback, useContext, useState } from "react"

import { Template } from "@/types/templates"

// Define the shape of your context data
interface TemplateContextData {
  template: Template | null
  setTemplate: (template: Template | null) => void
  download: () => void
  setCanvasDataUrl: (canvasDataUrl: string | null) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

// Create the context
const TemplateContext = createContext<TemplateContextData | undefined>(
  undefined
)

// Create a custom hook to access the context
export function useTemplateContext() {
  const context = useContext(TemplateContext)
  if (!context) {
    throw new Error(
      "useTemplateContext must be used within a TemplateContextProvider"
    )
  }
  return context
}

export function TemplateContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [template, setTemplate] = useState<Template | null>(null)
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const download = useCallback(() => {
    const link = document.createElement("a")
    link.download = `${template?.project ?? "Amigurumi Colors"}.png`
    link.href = canvasDataUrl ?? ""
    link.click()
  }, [canvasDataUrl, template])

  // Provide the context value to the children
  return (
    <TemplateContext.Provider
      value={{
        template,
        setTemplate,
        download,
        setCanvasDataUrl,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TemplateContext.Provider>
  )
}
