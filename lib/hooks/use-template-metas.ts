import { useEffect, useState } from "react"

import { TemplateMeta } from "@/types/templates"

export const useTemplateMetas = () => {
  const [templateMetas, setTemplateMetas] = useState<TemplateMeta[] | null>(
    null
  )

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/templates", {
        cache: "no-cache",
      })
      const { data } = await response.json()
      setTemplateMetas(data.filter((d: TemplateMeta) => d.image))
    }

    if (!templateMetas) {
      fetchData()
    }
  }, [templateMetas])

  return templateMetas
}
