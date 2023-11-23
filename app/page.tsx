"use client"

import { useState } from "react"

import { Template } from "@/types/templates"
import { Body } from "@/components/body"
import { Icons } from "@/components/icons"
import { SiteHeader } from "@/components/site-header"

export default function IndexPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="relative flex flex-col min-h-screen">
      <SiteHeader {...{ setSelectedTemplate, setIsLoading }} />
      <div className="flex-1">
        {isLoading ? (
          <section className="flex items-center justify-center content-area">
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <Icons.spinner className="w-10 h-10 animate-spin stroke-gray-200" />
            </div>
          </section>
        ) : (
          <Body template={selectedTemplate} />
        )}
      </div>
    </div>
  )
}
