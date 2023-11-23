export type TemplateMetaData = {
  name: string
  image: string
  colors: {
    [key: string]: string
  }
}

export type Templates = TemplateMetaData[]

export type TemplateImage = {
  id: string
  name: string
  type: string
  folderName: string | null
  sizeBytes: number
  base64Data: string
  url: string
}
