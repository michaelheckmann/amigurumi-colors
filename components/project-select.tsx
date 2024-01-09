import * as React from "react"

import { TemplateMeta } from "@/types/templates"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Icons } from "./icons"
import { ScrollArea } from "./ui/scroll-area"

type TriggerContentProps = {
  templates: TemplateMeta[] | null
  value: string
}

const TriggerContent = ({ templates, value }: TriggerContentProps) => {
  if (!templates) {
    return (
      <span className="flex items-center gap-2">
        <Icons.spinner className="w-4 h-4 animate-spin" />
        <span>Projekte laden...</span>
      </span>
    )
  } else if (!value) {
    return <span>Projekt auswählen...</span>
  } else {
    return (
      <span>{templates.find(({ project }) => project === value)?.project}</span>
    )
  }
}

type Props = {
  templates: TemplateMeta[] | null
  handleSelect: (templateName: string) => void
}

export function ProjectSelect({ templates, handleSelect }: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const onSelect = (currentValue: string) => {
    setValue(currentValue)
    handleSelect(currentValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
          disabled={!templates}
        >
          <TriggerContent {...{ templates, value }} />
          <Icons.chevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Projekt suchen..." className="h-9" />
          <ScrollArea className="h-80">
            <CommandEmpty>Kein Projekt gefunden.</CommandEmpty>
            <CommandGroup>
              {templates?.map(({ project }) => (
                <CommandItem key={project} onSelect={() => onSelect(project)}>
                  {project}
                  <Icons.check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === project ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
