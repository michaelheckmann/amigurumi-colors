"use client"

import { useTemplate } from "@/lib/template-context"
import { useTemplates } from "@/lib/use-templates"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  const templates = useTemplates()
  const { setTemplate } = useTemplate()

  const handleSelect = (templateName: string) => {
    const template = templates?.find((t) => t.name === templateName)
    setTemplate(template ?? null)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16 space-x-4 sm:space-x-0">
        <Logo />
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Wähle ein Template" />
          </SelectTrigger>
          <SelectContent>
            {(templates ?? []).map(({ name }) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  )
}
