import { MutableRefObject } from "react"

import { ImageDimensions } from "@/types/canvas"

import { hexToRgb } from "./hex-to-rgb"

const isInRange = (a: number, b: number, threshold: number) => {
  return Math.abs(a - b) < threshold
}

const transformColorMap = (colorMap: Record<string, string>) => {
  return Object.entries(colorMap).map(([key, hex]) => {
    const { r, g, b } = hexToRgb(hex)
    return {
      hex,
      r,
      g,
      b,
    }
  })
}

export const computeIndizes = (
  canvas: MutableRefObject<HTMLCanvasElement | null>,
  imageDimensions: ImageDimensions | null,
  colorMap: Record<string, string>,
  threshold: number
) => {
  if (!imageDimensions || !canvas.current) {
    return []
  }

  const ctx = canvas.current.getContext("2d")
  if (!ctx) {
    console.log("failed to get context")
    return []
  }
  console.log(imageDimensions)
  const imageData = ctx.getImageData(
    imageDimensions.dx,
    imageDimensions.dy,
    imageDimensions.dw,
    imageDimensions.dh
  )
  const data = imageData.data
  const colorMapRGB = transformColorMap(colorMap)
  const colorMapCache: Record<string, string> = {}

  let localIndizes: {
    index: number
    hex: string
  }[] = []

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    if (i % 100000 === 0) {
      // console.log(i)
    }

    if (colorMapCache[`${r}-${g}-${b}`]) {
      localIndizes.push({
        index: i,
        hex: colorMapCache[`${r}-${g}-${b}`],
      })
      continue
    }

    const matchingHex = colorMapRGB.find(
      ({ r: r2, g: g2, b: b2 }) =>
        isInRange(r, r2, threshold) &&
        isInRange(g, g2, threshold) &&
        isInRange(b, b2, threshold)
    )

    if (matchingHex) {
      localIndizes.push({
        index: i,
        hex: matchingHex.hex,
      })
      colorMapCache[`${r}-${g}-${b}`] = matchingHex.hex
    }
  }
  // console.log("localIndizes", localIndizes.length)
  return localIndizes
}
