

import os
import pathlib
from pathlib import Path
import sys

IMAGE_EXTENTIONS = ['.avif', '.bmp', '.gif', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.tif', '.tiff', '.webp']
ARCHIVE_EXTENSIONS = ['.zip', '.rar', '.7z']
OTHER_DIR = 'other_files'
TMP_PREFIX = 'tmp_'
MIN_VOLUME_IMGS = 60
MIN_CHAPTER_IMGS = 5
MIN_VOLUME_CHAPTERS = 3


def cleanSeries(root: Path):
    extractArchives(root)
    pushUp(root, root)
    removeNonLeafs


def extractArchives(root: Path):
    for file in root.iterdir():
        extractArchive(file, root) 

def extractArchive(archive: Path, out: Path):
    if isArchive(archive):
        os.system(f'atool --extract-to "{str(out)}" --quiet --force "{str(archive)}"')
def isArchive(file: Path): 
    return file.suffix in ARCHIVE_EXTENSIONS

def isImage(file: Path):
    return file.suffix in IMAGE_EXTENTIONS

def countImages(folder: Path):
    if folder.exists() and folder.is_dir():
        return len([f for f in folder if isImage(f)])
    else:
        return 0

def isLeafFolder(folder: Path):
    return folder.is_dir() and countImages(folder) > MIN_VOLUME_IMGS

def isChapterFolder(folder: Path):
    return folder.is_dir() and MIN_VOLUME_IMGS > countImages(folder) > MIN_CHAPTER_IMGS

def isChapteredLeaf(folder: Path):
    return folder.is_dir() and [f for f in folder.iterdir() if isChapterFolder(f)] > MIN_VOLUME_CHAPTERS

def consolidateChapteredLeaf(folder: Path):
    pageCount = 0
    for dir in folder.iterdir():
        if isChapteredLeaf(dir):
            for img in dir.iterdir():
                if isImage(img):
                    img.rename(folder.joinpath(str(pageCount) + img.suffix))
                    pageCount += 1
    
def pushUp(root: Path, current: Path):
    for path in current.iterdir():
        if isLeafFolder(path):
            cleanLeaf(path)
            floatUp(root, path)
        elif path.isChapteredLeaf(current):
            consolidateChapteredLeaf()
            pushUp(root, current)
        elif path.is_dir():
            pushUp(root, path)

def floatUp(root: Path, folder:Path):
    folder.rename(root.joinpath(TMP_PREFIX+ folder.name))

def removeNonLeafs(root: Path):
    root.mkdir(OTHER_DIR, exist_ok=True)
    for path in root.iterdir():
        if path.name[0:4] != TMP_PREFIX:
            path.rename(root.joinpath(OTHER_DIR, path.name))

def cleanLeaf(folder: Path):
    for file in folder.iterdir():
        if not isImage(file):
            file.unlink(missing_ok=True)



if __name__ == '__main__':
    cleanSeries(pathlib.Path('/home/david/Documents/series_test/ダークギャザリング'))
    # if len(sys.argv) > 1:
    #     cleanSeries(pathlib.Path(sys.argv[1]))
    # else:
    #     cleanSeries(pathlib.Path(os.getcwd))