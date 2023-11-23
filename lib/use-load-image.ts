import { useEffect, useState } from "react"

import { useTemplateImage } from "./use-template-image"

export const useLoadImage = () => {
  const templateImage = useTemplateImage()
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!templateImage) return
    const img = new Image()
    img.onload = () => setImage(img)
    img.onerror = () => console.log("failed to load image")
    img.src = templateImage.url
  }, [templateImage])

  return image
}
