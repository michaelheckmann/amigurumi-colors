import { useEffect, useState } from "react"

import { Yarn } from "@/types/templates"

export const useYarn = () => {
  const [yarns, setYarns] = useState<Yarn[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/yarn", {
        cache: "no-cache",
      })
      const { data } = await response.json()
      setYarns(data)
    }

    if (!yarns) {
      fetchData()
    }
  }, [yarns])

  return { yarns }
}
