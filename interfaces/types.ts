const path = require("path")


const IMGTYPES = ['.avif', '.bmp', '.gif', '.ico', '.jpeg', '.jpg', '.png', '.svg', 'tif', 'tiff', 'webp']

export type Folder = {
    link: string
    name: string,
    icon: ImagePath,
}

interface ImagePathDifferentiator extends String {
    _: unknown;
}

export type ImagePath = ImagePathDifferentiator & string

export function isImage(s: string): s is ImagePath {
    return IMGTYPES.includes(path.extname(s))
}