import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import type {Folder} from '../../interfaces/types'
import { getSeriesList } from '../../lib/fileSystem'
import GridComponent from '../../components/GridComponent'
import { InferGetServerSidePropsType } from 'next'


const Series: NextPage<{series: Folder[]}> = ({ series }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (<div>
    <p>Received Series: {JSON.stringify(series)}</p>
    <GridComponent folders={series}/>
  </div>)
}


export default Series

export const getServerSideProps = async () => {
  const series: Folder[] = getSeriesList()
  return { props: { series }}
}