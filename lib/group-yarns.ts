import { Yarn } from "@/types/templates"

const toProperCase = (str: string) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const groupYarns = (yarns: Yarn[] | null) => {
  if (!yarns) {
    return []
  }

  const groups = yarns.reduce((acc, yarn) => {
    const { colour_group } = yarn
    const name = toProperCase(colour_group)
    if (!acc[name]) {
      acc[name] = []
    }
    acc[name].push(yarn)
    return acc
  }, {} as Record<string, Yarn[]>)

  return Object.entries(groups).map(([group, yarns]) => {
    return {
      group,
      yarns,
    }
  })
}
