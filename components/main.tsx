import { useTemplateContext } from "@/lib/context/use-template-context"
import { Canvas } from "@/components/canvas"
import { Sidebar } from "@/components/sidebar"

import { Icons } from "./icons"

export const Main = () => {
  const { isLoading, template } = useTemplateContext()

  if (isLoading) {
    return (
      <section className="flex items-center justify-center content-area">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Icons.spinner className="w-10 h-10 animate-spin stroke-gray-200" />
        </div>
      </section>
    )
  }

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
        <Canvas {...{ template }} />
      </div>
      <div className="w-[300px]">
        <Sidebar {...{ template }} />
      </div>
    </section>
  )
}
