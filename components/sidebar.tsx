import { TemplateMeta, Yarn } from "@/types/templates"
import { appendYarnToCanvas } from "@/lib/append-yarn-to-canvas"
import {
  ColorMapValue,
  useColorMapContext,
} from "@/lib/context/use-color-map-context"
import { useTemplateContext } from "@/lib/context/use-template-context"
import { useYarn } from "@/lib/hooks/use-yarn"

import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { ScrollArea } from "./ui/scroll-area"
import { YarnSelect } from "./yarn-select"

type Props = {
  template: TemplateMeta
}

const getYarnName = (colorValue: ColorMapValue, yarns: Yarn[] | null) => {
  if (!colorValue.yarnId) {
    return colorValue.hex
  }

  const yarn = yarns?.find((yarn) => yarn.id === colorValue.yarnId)
  if (!yarn) {
    return "Unbekanntes Garn"
  } else {
    return `${yarn.brand} ${yarn.product_line} ${yarn.colour_name}`
  }
}

export const Sidebar = ({ template }: Props) => {
  const { canvasDataUrl } = useTemplateContext()
  const { yarns } = useYarn()
  const { colorMap } = useColorMapContext()

  const download = async () => {
    const link = document.createElement("a")
    link.download = `${template?.project ?? "Amigurumi Colors"}.png`
    const yarnConfig = Object.values(colorMap).map((colorValues) => ({
      colorKey: colorValues.colorKey,
      yarn: getYarnName(colorValues, yarns),
    }))

    link.href = await appendYarnToCanvas(canvasDataUrl ?? "", yarnConfig)
    link.click()
  }

  if (!template) {
    return null
  }

  return (
    <div className="flex flex-col justify-between h-full gap-8">
      <ScrollArea>
        <div className="flex flex-col gap-8 p-2 pb-4">
          {Object.entries(template.colors).map(([colorKey, hexValue]) => (
            <div className="flex flex-col gap-2" key={colorKey}>
              <Label>{colorKey}</Label>
              <YarnSelect {...{ colorKey, hexValue }} />
            </div>
          ))}
        </div>
      </ScrollArea>
      <Button onClick={download}>Herunterladen</Button>
    </div>
  )
}
