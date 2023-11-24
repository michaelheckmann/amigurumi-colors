"use client"

import { useCallback } from "react"

import DUMMY_DATA from "./dummy.json"

const MAKE_REQUEST = false && process.env.NODE_ENV === "development"

export const useGetTemplateImage = () => {
  return useCallback(async (imageId: string) => {
    let url = ""
    if (process.env.NODE_ENV !== "development" || MAKE_REQUEST) {
      const response = await fetch(`/api/images/${imageId}`)
      const { data } = await response.json()
      url = `data:${data.type};base64,${data.base64Data}`
    } else {
      const { data } = DUMMY_DATA
      url = `data:${data.type};base64,${data.base64Data}`
    }

    const img = new Image()
    img.src = url
    return img
  }, [])
}
