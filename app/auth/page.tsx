import { redirect } from "next/navigation"

import { setSession } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AuthPage() {
  async function submit(formData: FormData) {
    "use server"
    const code = formData.get("code")
    if (!code) return

    const authPassword = process.env.AUTH_PASSWORD as string
    if (!authPassword) throw new Error("AUTH_PASSWORD is not set")

    if (code === authPassword) {
      await setSession(code.toString())
      return redirect("/")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        action={submit}
        className="flex flex-col w-full max-w-md gap-4 mx-auto"
      >
        <label
          id="code"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Code
        </label>
        <Input name="code" />
        <Button type="submit">Abschicken</Button>
      </form>
    </div>
  )
}
