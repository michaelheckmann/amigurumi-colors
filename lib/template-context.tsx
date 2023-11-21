"use client"

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"

import { TemplateMetaData } from "@/types/templates"

type TemplateContext = {
  template: TemplateMetaData | null
  setTemplate: (template: TemplateMetaData | null) => void
  colorMap: Record<string, string>
  setColorMap: Dispatch<SetStateAction<Record<string, string>>>
  canvasDataUrl: string | null
  setCanvasDataUrl: Dispatch<SetStateAction<string | null>>
}

export const TemplateContext = createContext<TemplateContext | null>(null)

const getDefaultMap = (template: TemplateMetaData | null) => {
  if (!template) {
    return {}
  }

  return Object.values(template.colors).reduce((acc, hex) => {
    return {
      ...acc,
      [hex]: hex,
    }
  }, {})
}

export const TemplateProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [template, setTemplate_] = useState<TemplateMetaData | null>(null)
  const [colorMap, setColorMap] = useState<Record<string, string>>({})
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null)

  const setTemplate = (newTemplate: TemplateMetaData | null) => {
    setTemplate_(newTemplate)
    setColorMap(getDefaultMap(newTemplate))
  }

  return (
    <TemplateContext.Provider
      value={{
        template,
        setTemplate,
        colorMap,
        setColorMap,
        canvasDataUrl,
        setCanvasDataUrl,
      }}
    >
      {children}
    </TemplateContext.Provider>
  )
}
export const useTemplate = () => {
  const context = useContext(TemplateContext)

  if (context === null) {
    throw new Error(
      "useCartDropdown must be used within a TemplateContextProvider"
    )
  }

  return context
}
