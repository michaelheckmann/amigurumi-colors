"use client"

import {
  ColorMapValue,
  useColorMapContext,
} from "@/lib/context/use-color-map-context"
import { useTemplateContext } from "@/lib/context/use-template-context"
import { useYarnContext } from "@/lib/context/use-yarn-context"
import { useGetTemplateImage } from "@/lib/hooks/use-template-image"
import { useTemplateMetas } from "@/lib/hooks/use-template-metas"
import { Logo } from "@/components/logo"

import { Icons } from "./icons"
import { ProjectSelect } from "./project-select"
import { Button } from "./ui/button"

export const SiteHeader = () => {
  // Get all template metadata
  const templateMetas = useTemplateMetas()
  // Get the template image and store it in an <img> element
  const getTemplateImage = useGetTemplateImage()

  const { template, setTemplate, setIsLoading } = useTemplateContext()
  const { resetColorMap, applyDefaultColors } = useColorMapContext()
  const { yarns } = useYarnContext()

  const handleSelect = async (templateName: string) => {
    setIsLoading(true)
    const templateMeta = templateMetas?.find((t) => t.project === templateName)

    if (!templateMeta) {
      setTemplate(null)
    } else {
      const imageElement = await getTemplateImage(templateMeta.image)
      setTemplate({
        ...templateMeta,
        imageElement,
      })
      resetColorMap(templateMeta.colors)
    }

    setIsLoading(false)
  }

  const handleReset = () => {
    if (template) {
      resetColorMap(template.colors)
    }
  }

  const handleApplyDefaultColors = () => {
    if (template) {
      const defaultYarns = Object.entries(template.default_colors).reduce(
        (acc, [colorKey, yarnId]) => {
          const yarn = yarns?.find(({ id }) => id === yarnId)
          if (!yarn) {
            return {
              ...acc,
              [colorKey]: {
                colorKey,
                hex: "#ffffff",
                yarnId: null,
              },
            }
          }
          return {
            ...acc,
            [colorKey]: {
              colorKey,
              hex: yarn.hex,
              yarnId: yarn.id,
            },
          }
        },
        {} as Record<string, ColorMapValue>
      )
      applyDefaultColors(defaultYarns)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16 sm:space-x-4">
        <Logo />
        <div className="flex h-10 border rounded-md border-border">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-2 rounded-r-none"
            onClick={handleApplyDefaultColors}
          >
            <Icons.defaultColors className="w-5 h-5 md:w-4 md:h-4 md:mr-2" />
            <span className="hidden lg:block">Standardfarben anwenden</span>
            <span className="hidden md:block lg:hidden">Standardfarben</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-2 rounded-l-none"
            onClick={handleReset}
          >
            <Icons.emptyColors className="w-5 h-5 md:w-4 md:h-4 md:mr-2" />
            <span className="hidden lg:block">Farben zurücksetzen</span>
            <span className="hidden md:block lg:hidden">Zurücksetzen</span>
          </Button>
        </div>
        <ProjectSelect {...{ templates: templateMetas, handleSelect }} />
      </div>
    </header>
  )
}
