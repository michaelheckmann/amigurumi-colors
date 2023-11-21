"use client"

import { useTemplate } from "@/lib/template-context"
import { File } from "@/components/file"
import { Pickers } from "@/components/pickers"

export default function IndexPage() {
  const { template } = useTemplate()

  if (!template) {
    return (
      <section className="flex items-center justify-center content-area">
        <div className="mb-4 italic text-muted-foreground">
          Bitte wähle ein Template aus, um zu starten
        </div>
      </section>
    )
  }
  return (
    <section className="container flex justify-between gap-4 py-4 md:gap-16 lg:gap-32 content-area">
      <div className="flex-1">
        <File />
      </div>
      <div className="min-w-[16em]">
        <Pickers />
      </div>
    </section>
  )
}
