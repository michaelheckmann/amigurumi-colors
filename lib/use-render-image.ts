import { useCallback, useEffect, useRef, useState } from "react"
import { useDebounce, useWindowSize } from "@uidotdev/usehooks"

import { ImageDimensions } from "@/types/canvas"

import { useLoadImage } from "./use-load-image"

const drawImageScaled = (
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D
) => {
  const canvas = ctx.canvas
  const hRatio = canvas.width / img.width
  const vRatio = canvas.height / img.height
  const ratio = Math.min(hRatio, vRatio)
  const centerShift_x = (canvas.width - img.width * ratio) / 2
  const centerShift_y = (canvas.height - img.height * ratio) / 2
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Calculate the new width and height of the image while maintaining the aspect ratio
  const newWidth = Math.floor(img.width * ratio)
  const newHeight = Math.floor(img.height * ratio)

  // Calculate the new x and y coordinates to center the image
  const newX = Math.floor(centerShift_x)
  const newY = Math.floor(centerShift_y)

  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    newX,
    newY,
    newWidth,
    newHeight
  )

  return {
    sx: 0,
    sy: 0,
    sw: img.width,
    sh: img.height,
    dx: newX,
    dy: newY,
    dw: newWidth,
    dh: newHeight,
  }
}

export const useRenderImage = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null)

  const image = useLoadImage()

  // We use this as a resize observer
  const size = useWindowSize()
  const debouncedSize = useDebounce(size, 200)

  const draw = useCallback(
    (img: HTMLImageElement) => {
      if (!canvas.current) {
        console.log("canvas or image not found")
        return
      }

      canvas.current.width = canvas.current.offsetWidth
      canvas.current.height = canvas.current.offsetHeight

      const ctx = canvas.current.getContext("2d")
      if (!ctx) {
        console.log("failed to get context")
        return
      }

      const measuredImageDimensions = drawImageScaled(img, ctx)
      setImageDimensions(measuredImageDimensions)
      console.log("image loaded")
    },
    [canvas]
  )

  useEffect(() => {
    if (canvas.current && image && debouncedSize) {
      draw(image)
    }
  }, [image, draw, debouncedSize])

  return {
    canvas,
    image,
    imageDimensions,
  }
}
