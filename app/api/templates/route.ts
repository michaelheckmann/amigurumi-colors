import { NextResponse } from "next/server"
import postgres from "postgres"

export const dynamic = "force-dynamic"

const transformDefaultColor = (
  obj: Record<string, string>
): Record<string, number> => {
  const map: Record<string, string> = {
    Schwarz: "#000000",
    Weiß: "#ffffff",
    Maroni: "#800000",
    Braun: "#9A6324",
    Türkis: "#469990",
    Navy: "#000075",
    Rot: "#e6194B",
    Orange: "#f58231",
    Gelb: "#ffe119",
    Grün: "#3cb44b",
    Cyan: "#42d4f4",
    Blau: "#4363d8",
    Magenta: "#f032e6",
    Lavendel: "#dcbeff",
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[map[key]] = parseInt(value)
    return acc
  }, {} as Record<string, number>)
}

export async function GET() {
  try {
    const connectionString = process.env.DB_URL
    if (!connectionString) {
      throw new Error("no connection string")
    }
    const sql = postgres(connectionString)
    const data = await sql`SELECT * FROM amigurumi_colors`
    return NextResponse.json(
      {
        data: data.map((item: any) => {
          return {
            ...item,
            default_colors: transformDefaultColor(item.default_colors),
          }
        }),
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
