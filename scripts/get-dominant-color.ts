import { createReadStream, writeFileSync } from "fs"
import * as readline from "readline"
import axios from "axios"
import csvParser from "csv-parser"
import { getAverageColor } from "fast-average-color-node"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let imageColors: {
  id: number
  color: string
  image: string
}[] = []

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
  return filePath
}

const processRow = async (row: { id: number; image: string }) => {
  const { id, image } = row
  const response = await axios.get(image, { responseType: "arraybuffer" })
  const buffer = Buffer.from(response.data, "binary")
  const color = await getAverageColor(buffer)
  imageColors.push({ id, color: color.hex, image })
}

const main = async () => {
  const path = await getFilePath()
  const stream = createReadStream(path).pipe(csvParser())

  let count = 0
  for await (const row of stream) {
    await processRow(row)
    console.log(`Processed image ${++count}`)
  }

  console.log("CSV file processing complete")
  writeFileSync(
    path.replace(".csv", "-colors.json"),
    JSON.stringify(imageColors)
  )
  process.exit(0)
}

main()
