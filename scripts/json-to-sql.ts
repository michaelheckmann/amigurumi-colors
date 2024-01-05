import { readFileSync, writeFileSync } from "fs"

const jsonString = readFileSync("./colors-colors.json", "utf-8")
const json = JSON.parse(jsonString) as { id: number; color: string }[]

let SQL = `UPDATE colours SET hex = CASE id`

for (const { id, color } of json) {
  SQL += ` WHEN ${id} THEN '${color}'`
}

SQL += ` END WHERE id IN (${json.map(({ id }) => id).join(",")})`

console.log(SQL)

writeFileSync("./out.sql", SQL)
