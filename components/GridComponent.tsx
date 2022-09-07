import React from 'react'
import { Folder } from '../interfaces/types'
import ThumbnailComponent from './ThumbnailComponent'

const GridComponent = (prop: {folders : Folder[]}) => {
  return (
    <div className='flexcontainer'>
        {prop.folders.map(ThumbnailComponent)}
    </div>
  )
}

export default GridComponent