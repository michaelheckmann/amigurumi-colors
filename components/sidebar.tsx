import { TemplateMeta } from "@/types/templates"
import { useTemplateContext } from "@/lib/context/use-template-context"

import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { ScrollArea } from "./ui/scroll-area"
import { YarnSelect } from "./yarn-select"

type Props = {
  template: TemplateMeta
}

export const Sidebar = ({ template }: Props) => {
  const { download } = useTemplateContext()

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
