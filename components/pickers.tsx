"use client"

import { Dispatch, SetStateAction } from "react"

import { TemplateMeta } from "@/types/templates"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { ScrollArea } from "./ui/scroll-area"
import { Slider } from "./ui/slider"

type Props = {
  template: TemplateMeta
  canvasDataUrl: string | null
  _colorMap: Record<string, string>
  setColorMap: Dispatch<SetStateAction<Record<string, string>>>
  _threshold: number
  setThreshold: Dispatch<SetStateAction<number>>
}

export const Pickers = ({
  template,
  canvasDataUrl,
  _colorMap: colorMap,
  setColorMap,
  _threshold,
  setThreshold,
}: Props) => {
  const download = () => {
    const link = document.createElement("a")
    link.download = `${template.project}.png`
    link.href = canvasDataUrl ?? ""
    link.click()
  }

  if (!template) {
    return null
  }

  return (
    <div className="flex flex-col justify-between h-full gap-8">
      <ScrollArea>
        <div className="flex flex-col gap-8 pb-4">
          <div className="flex flex-col gap-4">
            <Label>Schwellenwert</Label>
            <Slider
              min={0}
              max={200}
              value={[_threshold]}
              onValueChange={(v) => setThreshold(v[0])}
            />
          </div>
          {Object.entries(template.colors).map(([key, value]) => (
            <div key={key} className="w-full">
              <Label id={key}>{key}</Label>
              <Input
                type="color"
                id={key}
                value={colorMap[value] ?? ""}
                onChange={(e) => {
                  setColorMap((prev) => ({
                    ...prev,
                    [value]: e.target.value,
                  }))
                }}
                className="w-full cursor-pointer"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
      <Button onClick={download}>Herunterladen</Button>
    </div>
  )
}
