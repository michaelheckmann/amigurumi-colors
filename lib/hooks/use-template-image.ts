"use client"

import { useCallback } from "react"

export const useGetTemplateImage = () => {
  return useCallback(async (url: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.src = url
      img.crossOrigin = "Anonymous"
      img.onload = () => resolve(img)
      img.onerror = reject
    })
  }, [])
}
