import { readdirSync, statSync } from 'fs'
import path from 'path'
import { Folder, ImagePath, isImage } from '../interfaces/types'
import series from '../pages/api/seriesList'
const FSROOT = 'public/library/本'
const WEBROOT = '/library/本/'

const NOFOLDER: FolderOption = false
type FolderOption =  Folder | false

const NOIMAGE: ImageOption = false
type ImageOption = ImagePath | false


function isDirectory(pth: string): boolean {
    return statSync(path.join(FSROOT, pth)).isDirectory()
}

function listFiles(pth: string) { return readdirSync(path.join(FSROOT, pth)) }

function getThumbnail (relPath: string): ImageOption {
    if (isDirectory(relPath)) {  
        for (const pth of listFiles(relPath)) {
            const img = path.join(WEBROOT, relPath, pth)
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
        return { link: path.join(title, volume), name: volume, icon: img }
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
                return {link:title, name: title, icon: volFolder.icon}
           }
        } 
    }
    return NOFOLDER
}

export function getSeriesList(): Folder[] {
    return listFiles("").map(getSeries).filter(isFolder)
}

export function getPageList(title: string, volume: string): ImagePath[] {
    return listFiles(path.join(title, volume)).map((img) => path.join(WEBROOT, title, volume, img)).filter(isImage)
}