"use client"

import { ColorMapContextProvider } from "@/lib/context/use-color-map-context"
import { TemplateContextProvider } from "@/lib/context/use-template-context"
import { YarnContextProvider } from "@/lib/context/use-yarn-context"
import { Main } from "@/components/main"
import { SiteHeader } from "@/components/site-header"

export default function IndexPage() {
  return (
    <TemplateContextProvider>
      <ColorMapContextProvider>
        <YarnContextProvider>
          <div className="relative flex flex-col min-h-screen">
            <SiteHeader />
            <div className="flex-1">
              <Main />
            </div>
          </div>
        </YarnContextProvider>
      </ColorMapContextProvider>
    </TemplateContextProvider>
  )
}
