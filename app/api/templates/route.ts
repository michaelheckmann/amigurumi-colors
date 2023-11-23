import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(`${process.env.TEMPLATES_URL}`, {
      next: { revalidate: 3600 },
    })
    const { data } = await response.json()
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
