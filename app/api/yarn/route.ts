import { NextResponse } from "next/server"
import postgres from "postgres"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const connectionString = process.env.DB_URL
    if (!connectionString) {
      throw new Error("no connection string")
    }
    const sql = postgres(connectionString)
    const data = await sql`
    SELECT
      colours.id,
      colour_name,
      colour_group,
      hex,
      brand,
      product_line
    FROM colours
    JOIN yarns ON colours.yarn = yarns.id
    `
    return NextResponse.json(
      {
        data,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    )
  }
}
