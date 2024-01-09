export type TemplateMeta = {
  project: string
  image: string
  colors: {
    [key: string]: string
  }
  default_colors: {
    [key: string]: number
  }
}

export type TemplateImage = {
  id: string
  name: string
  type: string
  folderName: string | null
  sizeBytes: number
  base64Data: string
  url: string
}

export type Template = TemplateMeta & {
  imageElement: HTMLImageElement
}

export type Yarn = {
  id: number
  colour_name: string
  colour_group: string
  hex: string
  brand: string
  product_line: string
}
