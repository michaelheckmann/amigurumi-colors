# Amigurumi Colors

This repo is a NextJS app that allows the user to adjust the colors in an image by replacing them with colors from a palette. The app is designed to help my girlfriend (an amigurumi maestro) choose colors for her projects.

The code uses the Canvas API to read the image data and replace the colors. The backend is very simple. In my implementation the image and configuration files are stored in a [Retool blob storage](https://docs.retool.com/data-sources/concepts/retool-storage) bucket and exposed via [Retool workflows](https://docs.retool.com/workflows). The frontend uses [shadcn/ui](https://ui.shadcn.com/) for the UI components.

## How to use

Create a `.env` file and add the following variables:

```bash
cp .env.template .env
```

The only thing you need to do is add two API endpoints to the `.env` file.

### TEMPLATES_URL

The endpoint is call with a `GET` request, not receiving any inputs and should return the following JSON data:

```json
{
  "data": [
    {
      "name": "Zebra",
      "image": "d3d4ed99-9ce9-4e8d-93a3-9fc0225e1a38",
      "colors": {
        "Body": "#ffff00",
        "Pants": "#00ff00",
        "Accents": "#0000ff"
      }
    }
  ]
}
```

- The `name` property is the name of the template.
- The `image` property is the ID of the image file in the blob storage.
- The `colors` property is a map of the color names and the color values in hex format.

### IMAGES_URL

The endpoint is called with a `POST` request and receives the following input:

```json
{
  "image": "d3d4ed99-9ce9-4e8d-93a3-9fc0225e1a38"
}
```

The `image` property is the ID of the image file in the blob storage.

The endpoint should return the following JSON data:

```json
{
  "data": {
    "type": "image/png",
    "base64Data": "iVBORw0KGgoAAAA ... ggg=="
  }
}
```

- The `type` property is the MIME type of the image
- The `base64Data` property is the image data encoded in base64.

## How to run

```bash
npm install
npm run dev
```
