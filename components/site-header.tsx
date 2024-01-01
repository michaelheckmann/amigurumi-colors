"use client"

import React from "react"

import { Template } from "@/types/templates"
import { useGetTemplateImage } from "@/lib/use-template-image"
import { useTemplateMetas } from "@/lib/use-template-metas"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Logo } from "@/components/logo"

type Props = {
  setSelectedTemplate: (template: Template | null) => void
  setIsLoading: (isLoading: boolean) => void
}

const SiteHeaderComponent = ({ setSelectedTemplate, setIsLoading }: Props) => {
  const templates = useTemplateMetas()
  const getTemplateImage = useGetTemplateImage()

  const handleSelect = async (templateName: string) => {
    setIsLoading(true)
    const template = templates?.find((t) => t.project === templateName)
    if (!template) {
      setSelectedTemplate(null)
      setIsLoading(false)
      return
    }
    const imageElement = await getTemplateImage(template.image)
    setSelectedTemplate({
      ...template,
      imageElement,
    })
    setIsLoading(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16 space-x-4 sm:space-x-0">
        <Logo />
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-[200px]" disabled={!templates?.length}>
            <SelectValue placeholder="Wähle ein Template" />
          </SelectTrigger>
          <SelectContent>
            {(templates ?? []).map(({ project }) => (
              <SelectItem key={project} value={project}>
                {project}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  )
}

export const SiteHeader = React.memo(SiteHeaderComponent)
