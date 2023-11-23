const getPixels = require("get-pixels")
const colorNamer = require("color-namer")
const fs = require("fs")

const omit = ["white", "gray", "black"]
const uniqueColors: Record<string, string> = {}

const rbgtoHex = (r: number, g: number, b: number) => {
  const hex = ((r << 16) + (g << 8) + b).toString(16)
  return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex
}

const writeToFile = (path: string) => {
  const out = {
    name: path.split("/").pop()?.split(".")[0] || "name",
    image: "image",
    colors: Object.entries(uniqueColors).reduce(
      (acc, [key, value]) => ({ ...acc, [value]: key }),
      {}
    ),
  }
  console.log(out)
  const extension = path.split(".").pop()
  const outPath = path.replace("." + extension, ".colors.json")
  fs.writeFile(outPath, JSON.stringify(out, null, 2), (err: any) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("File has been created")
  })
}

function main(path: string) {
  getPixels(path, function (err: any, pixels: { data: string | any[] }) {
    if (err) {
      console.log("Error: ", err)
      return
    }
    console.log(`Scanning ${pixels.data.length} pixels`)
    for (let i = 0; i < pixels.data.length; i += 4 * 10000) {
      let r = pixels.data[i]
      let g = pixels.data[i + 1]
      let b = pixels.data[i + 2]

      let hex = rbgtoHex(r, g, b)
      let rgb = `rgb(${r},${g},${b})`

      if (!uniqueColors[hex]) {
        let colorName = colorNamer(rgb).basic[0].name
        if (!omit.includes(colorName)) {
          uniqueColors[hex] = colorName
        }
      }
    }
    writeToFile(path)
  })
}

// Read the path from the args

const args = process.argv.slice(2)
const path = args[0]

if (!path) {
  console.error("Please provide a path to the image")
  process.exit(1)
}

main(path)
