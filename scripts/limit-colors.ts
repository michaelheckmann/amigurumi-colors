import * as readline from "readline"
import jimp from "jimp"
import nearestColor from "nearest-color"

const THRESHOLD = 100

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const defaultColorMap = [
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
]

const parseColorMap = (colorMapString: string) => {
  try {
    const colorMap = JSON.parse(colorMapString) as string[]
    return [...colorMap, "#000000", "#ffffff"]
  } catch (e) {
    console.log("failed to parse color map, using default one")
    return defaultColorMap
  }
}

const getFilePath = async () => {
  let filePath = await new Promise<string>((resolve) => {
    rl.question("Please enter a file path:", resolve)
  })
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
  return filePath
}

const getColorMap = async () => {
  const colorMapString = await new Promise<string>((resolve) => {
    rl.question("Please a color map JSON string:", resolve)
  })
  const colorMap = colorMapString
    ? parseColorMap(colorMapString)
    : defaultColorMap

  return nearestColor.from(
    colorMap.reduce((acc, curr) => {
      acc[curr] = curr
      return acc
    }, {} as { [colorName: string]: string })
  )
}

const main = async () => {
  const filePath = await getFilePath()
  const colorMap = await getColorMap()

  const img = await jimp.read(filePath)
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
    const r = img.bitmap.data[idx + 0]
    const g = img.bitmap.data[idx + 1]
    const b = img.bitmap.data[idx + 2]

    const nearest = colorMap({
      r,
      g,
      b,
    })
    if (!nearest) {
      console.log("no nearest color found")
    } else {
      if (nearest.distance > THRESHOLD) {
        img.bitmap.data[idx + 0] = 0
        img.bitmap.data[idx + 1] = 0
        img.bitmap.data[idx + 2] = 0
      } else {
        img.bitmap.data[idx + 0] = nearest.rgb.r
        img.bitmap.data[idx + 1] = nearest.rgb.g
        img.bitmap.data[idx + 2] = nearest.rgb.b
      }
    }
  })

  img.write(filePath.replace("-original.png", `.png`), () => {
    process.exit(0)
  })
}

main()
