import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { image: string } }
) {
  try {
    const response = await fetch(`${process.env.IMAGE_URL}`, {
      method: "POST",
      body: JSON.stringify({
        image: params.image,
      }),
      cache: "no-cache",
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
