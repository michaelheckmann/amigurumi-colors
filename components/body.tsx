import { useEffect, useState } from "react"

import { Template } from "@/types/templates"
import { File } from "@/components/file"
import { Pickers } from "@/components/pickers"

const getDefaultMap = (template: Template | null) => {
  if (!template) {
    return {}
  }

  return Object.values(template.colors).reduce((acc, hex) => {
    return {
      ...acc,
      [hex]: hex,
    }
  }, {})
}

type Props = {
  template: Template | null
}

export const Body = ({ template }: Props) => {
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null)
  const [colorMap, setColorMap] = useState<Record<string, string>>({})

  useEffect(() => {
    setColorMap(getDefaultMap(template))
  }, [template])

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
        <File {...{ template, colorMap, setCanvasDataUrl }} />
      </div>
      <div className="min-w-[16em]">
        <Pickers {...{ template, canvasDataUrl, colorMap, setColorMap }} />
      </div>
    </section>
  )
}
