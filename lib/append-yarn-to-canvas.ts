type YarnColor = {
  colorKey: string
  yarn: string
}

const sectionHeight = 20
const paddingX = 10
const paddingY = 14

export const appendYarnToCanvas = async (
  dataUrl: string,
  yarnColors: YarnColor[]
) => {
  // Create a new image element and set its source to the data URL
  const img = new Image()
  img.src = dataUrl

  // Wait for the image to load
  await new Promise((resolve) => {
    img.onload = resolve
  })

  // Create a new canvas and get its 2D context
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!

  // Set the canvas dimensions to the image dimensions plus some space for the list
  canvas.width = img.width
  canvas.height = img.height + paddingY * 2 + sectionHeight * yarnColors.length

  // Draw the image onto the canvas
  ctx.drawImage(img, 0, 0)

  // Draw a white rectangle at the bottom of the canvas
  ctx.fillStyle = "white"
  ctx.fillRect(0, img.height, canvas.width, canvas.height - img.height)

  // Set the text properties
  ctx.font = "12px 'Inter', sans-serif"
  ctx.fillStyle = "black"

  // Draw each yarn color onto the canvas
  yarnColors.forEach((yarnColor, index) => {
    const text = `${yarnColor.colorKey}: ${yarnColor.yarn}`
    const textX = paddingX
    const textY = img.height + paddingY + sectionHeight * index - 4
    const textHeight = sectionHeight

    // Draw the text
    ctx.fillStyle = "#111729"
    ctx.fillText(text, textX, textY + textHeight)
  })

  return canvas.toDataURL("image/png")
}
