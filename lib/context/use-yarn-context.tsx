import React, { createContext, useContext } from "react"

import { Yarn } from "@/types/templates"

import { useYarn } from "../hooks/use-yarn"

// Define the shape of your context data
interface YarnContextData {
  yarns: Yarn[] | null
}

// Create the context
const YarnContext = createContext<YarnContextData | undefined>(undefined)

// Create a custom hook to access the context
export function useYarnContext() {
  const context = useContext(YarnContext)
  if (!context) {
    throw new Error("useYarnContext must be used within a YarnContextProvider")
  }
  return context
}

export function YarnContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { yarns } = useYarn()

  return (
    <YarnContext.Provider
      value={{
        yarns,
      }}
    >
      {children}
    </YarnContext.Provider>
  )
}
