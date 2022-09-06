import { readdirSync, statSync } from 'fs'
import path from 'path'
import { Folder, ImagePath, isImage } from '../interfaces/types'
import series from '../pages/api/seriesList'
const ROOT = 'public/series/'

const NOFOLDER: FolderOption = false
type FolderOption =  Folder | false

const NOIMAGE: ImageOption = false
type ImageOption = ImagePath | false


function isDirectory(pth: string): boolean {
    return statSync(path.join(ROOT, pth)).isDirectory()
}

function listFiles(pth: string) { return readdirSync(path.join(ROOT, pth)) }

function getThumbnail (relPath: string): ImageOption {
    if (isDirectory(relPath)) {  
        for (const pth of listFiles(relPath)) {
            const img = path.join("/series", relPath, pth)
            if (isImage(img)) {
                return img
            }
        }
    }
    return NOIMAGE
}

function getVolume(title: string, volume: string): FolderOption {
    const img = getThumbnail(path.join(title, volume))
     if (img) {
        return { name: volume, icon: img }
     } else {
        return NOFOLDER
     }
}

function isFolder(folder: FolderOption): folder is Folder {
    return folder != NOFOLDER
}

export function getVolumeList(title: string): Folder[] { 
    return listFiles(title).map((v) => getVolume(title, v)).filter(isFolder)
}

function getSeries(title: string): FolderOption {
    if (isDirectory(title)) {
        for (const pth of listFiles(title)) {
           const volFolder = getVolume(title, pth)
           if (isFolder(volFolder)) {
                return {name: title, icon: volFolder.icon}
           }
        } 
    }
    return NOFOLDER
}

export function getSeriesList(): Folder[] {
    return listFiles("").map(getSeries).filter(isFolder)
}

export function getPageList(title: string, volume: string): ImagePath[] {
    return listFiles(path.join("/series", title, volume)).filter(isImage)
}