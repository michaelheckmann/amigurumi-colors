export type TemplateMeta = {
  project: string
  image: string
  colors: {
    [key: string]: string
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
