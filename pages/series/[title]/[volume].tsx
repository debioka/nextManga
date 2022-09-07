import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { KeyboardEvent, useState } from 'react'
import { ImagePath } from '../../../interfaces/types'
import { getPageList } from '../../../lib/fileSystem'

const Reader: NextPage<{images: ImagePath[]}> = ( { images } ) => {
  
    const router = useRouter()
    const { title, volume} = router.query
    const [rightPage, _setpage] = useState(0)
    const setpage = (page: number) => {
        if (page < 0) { _setpage(0) }
        else if (page > images.length - 2) { _setpage(images.length - 2) }
        else {_setpage(page)}
      }
    const incPage = () => {setpage(rightPage + 2)}
    const decPage = () => {setpage(rightPage - 2)}
    const handleKeyPress = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key == 'ArrowLeft') {incPage()}
        else if (e.key == 'ArrowRight') {decPage()}
    }
    return (
        <div className='pageContainer' onKeyDown={handleKeyPress} tabIndex={0}>
            <button onClick={() => setpage(rightPage + 1)}> Offset Page</button>
        <div className='pageDiv'>
            <div className='pageGridSpacer'/>
            <div className='pageImgDivL'> <img className='pageImgL' src={images[rightPage + 1]} onClick={incPage}/> </div>
            <div className='pageImgDivR'> <img className='pageImgR' src={images[rightPage]} onClick={decPage}/> </div>
            <div className='pageGridSpacer'/>
        </div>
        </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const title = context.params?.title as string
    const volume = context.params?.volume as string 
    const images = getPageList(title, volume)
    return { props: { images }}
  }
export default Reader