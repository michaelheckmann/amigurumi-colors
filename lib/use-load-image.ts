import { useEffect, useState } from "react"

import { useTemplateImage } from "./use-template-image"

export const useLoadImage = () => {
  const { url } = useTemplateImage()
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setImage(img)
    img.onerror = () => console.log("failed to load image")
    img.src = url
  }, [url])

  return image
}
