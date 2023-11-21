import { MutableRefObject } from "react"

import { ImageDimensions } from "@/types/canvas"

import { hexToRgb } from "./hex-to-rgb"

const getThresholdArray = (size: number) => {
  return [
    ...Array(size)
      .fill(0)
      .map((_, i) => i - size / 2),
  ]
}

const getRGBs = (colorMap: Record<string, string>) => {
  const tolerance = 10
  const rgbs: Record<string, string> = {}
  Object.values(colorMap).map((hex) => {
    const { r, b, g } = hexToRgb(hex)
    getThresholdArray(tolerance).map((rOffset) => {
      getThresholdArray(tolerance).map((gOffset) => {
        getThresholdArray(tolerance).map((bOffset) => {
          rgbs[`${r + rOffset}-${g + gOffset}-${b + bOffset}`] = hex
        })
      })
    })
  })
  return rgbs
}

export const computeIndizes = (
  canvas: MutableRefObject<HTMLCanvasElement | null>,
  imageDimensions: ImageDimensions | null,
  colorMap?: Record<string, string>
) => {
  if (!imageDimensions || !canvas.current || !colorMap) {
    return []
  }

  const ctx = canvas.current.getContext("2d")
  if (!ctx) {
    console.log("failed to get context")
    return []
  }

  const imageData = ctx.getImageData(
    imageDimensions.dx,
    imageDimensions.dy,
    imageDimensions.dw,
    imageDimensions.dh
  )
  const data = imageData.data
  const rgbs = getRGBs(colorMap)

  let localIndizes: {
    index: number
    hex: string
  }[] = []

  // for (let i = 0; i < data.length; i += 4) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    if (i % 100000 === 0) {
      console.log(i)
    }

    const matchingHex = rgbs[`${r}-${g}-${b}`]

    if (matchingHex) {
      localIndizes.push({
        index: i,
        hex: matchingHex,
      })
    }
  }

  return localIndizes
}
