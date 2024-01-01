"use client"

import { useEffect, useState } from "react"

import { TemplateMeta } from "@/types/templates"

const MAKE_REQUEST = true && process.env.NODE_ENV === "development"

const DUMMY_DATA: TemplateMeta[] = [
  {
    project: "Lupita",
    image: "abe5fe00-c003-4951-9ec7-5a454e8b0dc1",
    colors: {
      Körper: "#ffff00",
      Hose: "#00ff00",
      "Akzent 1": "#0000ff",
      "Akzent 2": "#ff0000",
    },
  },
]

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

    if (process.env.NODE_ENV !== "development" || MAKE_REQUEST) {
      fetchData()
    } else {
      setTemplateMetas(DUMMY_DATA)
    }
  }, [])

  return templateMetas
}
