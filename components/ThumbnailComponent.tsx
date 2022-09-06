import React from 'react'
import { Folder } from '../interfaces/types'

export default function ThumbnailComponent(prop: Folder) {
  return (
    <div>
      <img className='thumbnail' src={prop.icon} alt='thumbnail'/>
      <p>{prop.name}</p>
    </div>
  )
}
