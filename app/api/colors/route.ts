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
    const data = await sql`SELECT * FROM colours`
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
