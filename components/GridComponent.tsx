import React from 'react'
import { Folder } from '../interfaces/types'
import ThumbnailComponent from './ThumbnailComponent'

const GridComponent = (prop: {folders : Folder[]}) => {
  return (
    <div className='flexcontainer'>
        <p> Type is: {JSON.stringify(prop.folders)}</p>
        {prop.folders.map(ThumbnailComponent)}
    </div>
  )
}

export default GridComponent