"use client"

import { useEffect, useState } from "react"

import { TemplateMeta } from "@/types/templates"

const MAKE_REQUEST = false && process.env.NODE_ENV === "development"

const DUMMY_DATA: TemplateMeta[] = [
  {
    name: "Lupita",
    image: "abe5fe00-c003-4951-9ec7-5a454e8b0dc1",
    colors: {
      Körper: "#906252",
      Hose: "#C9696B",
      "Akzent 1": "#5DA8E0",
      "Akzent 2": "#FDE047",
    },
  },
]

export const useTemplateMetas = () => {
  const [templateMetas, setTemplateMetas] = useState<TemplateMeta[] | null>(
    null
  )

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/templates")
      const { data } = await response.json()
      setTemplateMetas(data)
    }

    if (process.env.NODE_ENV !== "development" || MAKE_REQUEST) {
      fetchData()
    } else {
      setTemplateMetas(DUMMY_DATA)
    }
  }, [])

  return templateMetas
}
