import { cookies } from "next/headers"
import { sealData, unsealData } from "iron-session"

const sessionPassword = process.env.SESSION_PASSWORD as string
if (!sessionPassword) throw new Error("SESSION_PASSWORD is not set")

const authPassword = process.env.AUTH_PASSWORD as string
if (!authPassword) throw new Error("AUTH_PASSWORD is not set")

export const getSession = async (): Promise<boolean> => {
  const encryptedSession = cookies().get("auth_session")?.value

  const session = encryptedSession
    ? ((await unsealData(encryptedSession, {
        password: sessionPassword,
      })) as string)
    : null

  try {
    const data = (session ? JSON.parse(session) : null) as {
      code: string
    } | null
    return data?.code === authPassword
  } catch (error) {
    return false
  }
}

export const setSession = async (code: string): Promise<void> => {
  const encryptedSession = await sealData(JSON.stringify({ code }), {
    password: sessionPassword,
  })

  cookies().set("auth_session", encryptedSession, {
    sameSite: "strict",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })
}
