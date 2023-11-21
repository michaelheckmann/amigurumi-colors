"use client"

import { useEffect, useMemo } from "react"

import { computeIndizes } from "@/lib/compute-indizes"
import { hexToRgb } from "@/lib/hex-to-rgb"
import { useTemplate } from "@/lib/template-context"
import { useRenderImage } from "@/lib/use-render-image"
import { cn } from "@/lib/utils"

import { Icons } from "./icons"

type Props = {}

export const File = ({}: Props) => {
  const { canvas, image, imageDimensions } = useRenderImage()
  const { template, colorMap, setCanvasDataUrl } = useTemplate()

  const indizes = useMemo(() => {
    return computeIndizes(canvas, imageDimensions, template?.colors)
  }, [canvas, imageDimensions, template?.colors])

  useEffect(() => {
    if (!imageDimensions) {
      return
    }

    const ctx = canvas.current?.getContext("2d")
    if (!ctx) {
      return
    }

    const imageData = ctx.getImageData(
      imageDimensions.dx,
      imageDimensions.dy,
      imageDimensions.dw,
      imageDimensions.dh
    )

    const data = imageData.data
    for (const { index, hex } of indizes) {
      const replacedHex = colorMap[hex]
      const { r, g, b } = hexToRgb(replacedHex)

      data[index] = r
      data[index + 1] = g
      data[index + 2] = b
    }

    ctx.putImageData(imageData, imageDimensions.dx, imageDimensions.dy)
    setCanvasDataUrl(canvas.current?.toDataURL("image/png") ?? null)
  }, [indizes, colorMap, imageDimensions, canvas, setCanvasDataUrl])

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvas}
        className={cn("w-full h-full z-10 absolute", {
          "opacity-100": !image,
        })}
      ></canvas>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Icons.spinner className="w-10 h-10 animate-spin stroke-gray-200" />
      </div>
    </div>
  )
}
