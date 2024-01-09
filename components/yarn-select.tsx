import * as React from "react"
import { CommandSeparator } from "cmdk"

import { Yarn } from "@/types/templates"
import { useColorMapContext } from "@/lib/context/use-color-map-context"
import { useYarnContext } from "@/lib/context/use-yarn-context"
import { groupYarns } from "@/lib/group-yarns"
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
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"

type TriggerContentProps = {
  yarns: Yarn[] | null
  yarnId: number | null
}

const TriggerContent = ({ yarns, yarnId }: TriggerContentProps) => {
  const yarn = yarns?.find(({ id }) => id === yarnId)
  if (!yarns) {
    return (
      <span className="flex items-center gap-2">
        <Icons.spinner className="w-4 h-4 animate-spin" />
        <span>Garn laden...</span>
      </span>
    )
  } else if (!yarnId || !yarn) {
    return <span>Garn auswählen...</span>
  } else {
    return (
      <div className="flex items-center gap-2.5">
        <div
          className="w-3.5 h-3.5 shrink-0 rounded-full"
          style={{
            backgroundColor: yarn.hex,
          }}
        />
        <span>{yarn.colour_name}</span>
      </div>
    )
  }
}

type Props = {
  colorKey: string
  hexValue: string
}

export function YarnSelect({ colorKey, hexValue }: Props) {
  const [open, setOpen] = React.useState(false)
  const { yarns } = useYarnContext()
  const { colorMap, updateColorMap } = useColorMapContext()
  const colorValue = colorMap[hexValue] ?? {
    colorKey,
    hex: "#ffffff",
    yarnId: null,
  }

  const onSelect = (yarn: Yarn) => {
    if (yarn.id === colorValue.yarnId) {
      updateColorMap(hexValue, {
        colorKey,
        hex: "#ffffff",
        yarnId: null,
      })
    } else {
      updateColorMap(hexValue, {
        colorKey,
        hex: yarn.hex,
        yarnId: yarn.id,
      })
    }
    setOpen(false)
  }

  const onCustomColorSelect = (value: string) => {
    updateColorMap(hexValue, {
      colorKey,
      hex: value,
      yarnId: null,
    })
  }

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between transition-all"
            style={{ width: colorValue.yarnId ? 284 : 236 }}
            disabled={!yarns}
          >
            <TriggerContent {...{ yarns, yarnId: colorValue.yarnId }} />
            <Icons.chevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: colorValue.yarnId ? 284 : 236 }}
        >
          <Command>
            <CommandInput placeholder="Garn suchen..." className="h-9" />
            <ScrollArea className="h-80">
              <CommandEmpty>Kein Garn gefunden.</CommandEmpty>
              {groupYarns(yarns).map(({ group, yarns }, i) => (
                <div key={group}>
                  {i !== 0 && <CommandSeparator />}
                  <CommandGroup heading={group}>
                    {yarns.map((y) => (
                      <CommandItem
                        key={y.id}
                        value={[y.colour_group, y.colour_name, y.id].join(
                          " - "
                        )}
                        onSelect={() => onSelect(y)}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-3.5 h-3.5 shrink-0 rounded-full"
                            style={{
                              backgroundColor: y.hex,
                            }}
                          />
                          <div className="flex flex-col">
                            <span className="text-sm">{y.colour_name}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1">
                              {y.brand} • {y.product_line}
                            </span>
                          </div>
                        </div>
                        <Icons.check
                          className={cn(
                            "ml-auto h-4 w-4",
                            colorValue.yarnId === y.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              ))}
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>

      {!colorValue.yarnId && (
        <Input
          type="color"
          className="flex-1 p-1.5 cursor-pointer overflow-hidden"
          value={colorValue.hex}
          onChange={({ target }) => onCustomColorSelect(target.value)}
        />
      )}
    </div>
  )
}
