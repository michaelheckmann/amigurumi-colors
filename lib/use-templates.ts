"use client"

import { useEffect, useState } from "react"

import { Templates } from "@/types/templates"

const DUMMY_DATA: Templates = [
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

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Templates | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/templates")
      const { data } = await response.json()
      setTemplates(data)
    }

    if (process.env.NODE_ENV !== "development") {
      fetchData()
    } else {
      setTemplates(DUMMY_DATA)
    }
  }, [])

  return templates
}
