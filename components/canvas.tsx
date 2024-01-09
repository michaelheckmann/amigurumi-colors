"use client"

import React, { useEffect, useMemo } from "react"

import { Template } from "@/types/templates"
import { computeIndizes } from "@/lib/compute-indizes"
import { useColorMapContext } from "@/lib/context/use-color-map-context"
import { useTemplateContext } from "@/lib/context/use-template-context"
import { hexToRgb } from "@/lib/hex-to-rgb"
import { useRenderImage } from "@/lib/hooks/use-render-image"

type Props = {
  template: Template
}

const CanvasComponent = ({ template }: Props) => {
  const { setCanvasDataUrl } = useTemplateContext()
  const { colorMap } = useColorMapContext()

  const { canvas, imageDimensions } = useRenderImage(template.imageElement)

  const indizes = useMemo(() => {
    return computeIndizes(canvas, imageDimensions, template.colors)
  }, [canvas, imageDimensions, template])

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
      if (!replacedHex) {
        continue
      }
      const { r, g, b } = hexToRgb(replacedHex.hex)
      data[index] = r
      data[index + 1] = g
      data[index + 2] = b
    }

    ctx.putImageData(imageData, imageDimensions.dx, imageDimensions.dy)
    setCanvasDataUrl(canvas.current?.toDataURL("image/png") ?? null)
  }, [colorMap, imageDimensions, canvas, setCanvasDataUrl, indizes])

  return <canvas ref={canvas} className="w-full h-full"></canvas>
}

export const Canvas = React.memo(CanvasComponent)
