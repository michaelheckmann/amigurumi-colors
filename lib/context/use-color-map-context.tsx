import React, { createContext, useCallback, useContext, useState } from "react"
import { useThrottle } from "@uidotdev/usehooks"

export type ColorMapValue = {
  colorKey: string
  hex: string
  yarnId: number | null
}

interface ColorMapContextData {
  colorMap: Record<string, ColorMapValue>
  updateColorMap: (key: string, value: ColorMapValue) => void
  resetColorMap: (templateColors: Record<string, string>) => void
  applyDefaultColors: (defaultColors: Record<string, ColorMapValue>) => void
}

const ColorMapContext = createContext<ColorMapContextData | undefined>(
  undefined
)

export function useColorMapContext() {
  const context = useContext(ColorMapContext)
  if (!context) {
    throw new Error(
      "useColorMapContext must be used within a ColorMapContextProvider"
    )
  }
  return context
}

export function ColorMapContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [_colorMap, setColorMap] = useState<Record<string, ColorMapValue>>({})
  const colorMap = useThrottle(_colorMap, 100)

  const updateColorMap = useCallback((key: string, value: ColorMapValue) => {
    setColorMap((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const resetColorMap = useCallback(
    (templateColors: Record<string, string>) => {
      const map = Object.entries(templateColors).reduce(
        (acc, [colorKey, hexValue]) => {
          return {
            ...acc,
            [hexValue]: {
              colorKey,
              hex: "#ffffff",
              yarnId: null,
            },
          }
        },
        {} as Record<string, ColorMapValue>
      )
      setColorMap(map)
    },
    []
  )

  const applyDefaultColors = useCallback(
    (defaultColors: Record<string, ColorMapValue>) => {
      const map = Object.entries(defaultColors).reduce(
        (acc, [colorKey, colorMapValue]) => {
          return {
            ...acc,
            [colorKey]: {
              ...colorMapValue,
              colorKey: _colorMap[colorKey]?.colorKey,
            },
          }
        },
        {} as Record<string, ColorMapValue>
      )
      setColorMap(map)
    },
    [_colorMap]
  )

  return (
    <ColorMapContext.Provider
      value={{
        colorMap,
        updateColorMap,
        resetColorMap,
        applyDefaultColors,
      }}
    >
      {children}
    </ColorMapContext.Provider>
  )
}
