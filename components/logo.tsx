import { siteConfig } from "@/config/site"

import { Icons } from "./icons"

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Icons.logo />
      <span className="inline-block font-bold leading-none">
        {siteConfig.name}
      </span>
    </div>
  )
}
