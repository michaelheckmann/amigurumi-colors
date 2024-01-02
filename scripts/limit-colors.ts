import * as readline from "readline"
import jimp from "jimp"
import nearestColor from "nearest-color"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.replace("#", ""), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}

const defaultColorMap = nearestColor.from([
  "#000000",
  "#ffffff",
  "#800000",
  "#9A6324",
  "#469990",
  "#000075",
  "#e6194B",
  "#f58231",
  "#ffe119",
  "#3cb44b",
  "#42d4f4",
  "#4363d8",
  "#f032e6",
  "#dcbeff",
])

const parseColorMap = (colorMapString: string) => {
  try {
    const colorMap = JSON.parse(colorMapString)
    return nearestColor.from([...colorMap, "#000000", "#ffffff"])
  } catch (e) {
    console.log("failed to parse color map")
    return defaultColorMap
  }
}

const main = async () => {
  let filePath = await new Promise<string>((resolve) => {
    rl.question("Please enter a file path:", resolve)
  })

  const colorMapString = await new Promise<string>((resolve) => {
    rl.question("Please a color map JSON string:", resolve)
  })

  const colorMap = colorMapString
    ? parseColorMap(colorMapString)
    : defaultColorMap

  if (!filePath) {
    console.log("no file path given")
    process.exit(1)
  }

  if (filePath.startsWith('"') || filePath.startsWith("'")) {
    filePath = filePath.slice(1)
  }

  if (filePath.endsWith('"') || filePath.endsWith("'")) {
    filePath = filePath.slice(0, -1)
  }

  if (!filePath.endsWith("-original.png")) {
    console.log("file path must end with -original.png")
    process.exit(1)
  }

  const img = await jimp.read(filePath)
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
    const red = img.bitmap.data[idx + 0]
    const green = img.bitmap.data[idx + 1]
    const blue = img.bitmap.data[idx + 2]

    const rgb = `rgb(${red},${green},${blue})`
    const nearest = colorMap(rgb)
    if (!nearest) {
      console.log("no nearest color found")
    } else {
      const { r, g, b } = hexToRgb(nearest)
      img.bitmap.data[idx + 0] = r
      img.bitmap.data[idx + 1] = g
      img.bitmap.data[idx + 2] = b
    }
  })

  img.write(filePath.replace("-original.png", ".png"), () => {
    process.exit(0)
  })
}

main()
