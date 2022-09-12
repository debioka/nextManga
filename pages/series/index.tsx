import type { NextPage } from 'next'
import type {Folder} from '../../interfaces/types'
import { getSeriesList } from '../../lib/fileSystem'
import GridComponent from '../../components/GridComponent'
import { InferGetServerSidePropsType } from 'next'
import { useState } from 'react'

const MAXITEMS = 50


const Series: NextPage<{series: Folder[]}> = ({ series }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [page, setpage] = useState(0)
  const pages = Math.ceil(series.length / MAXITEMS)
  const goToTop = () => {
    window.scrollTo({
      top: 0, behavior: 'auto'
    })
  }
  return (<div style={{justifyContent: 'center'}}>
    <p>page: {page}, pages: {pages}, length: {series.length}</p>
    <GridComponent folders={series.slice(page * MAXITEMS, (page + 1) * MAXITEMS)}/>
    <div className='buttonDiv'>
      {page > 0 ? <button onClick={() => {goToTop(), setpage(page - 1)}}>Previous</button> : <button>Previous</button>}
      {page < pages - 1 ? <button onClick={() => {goToTop(), setpage(page + 1)}}>Next</button> : <button>Next</button>}
    </div>
  </div>)
}


export default Series

export const getServerSideProps = async () => {
  const series: Folder[] = getSeriesList()
  return { props: { series }}
}