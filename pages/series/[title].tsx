import { GetServerSideProps, NextPage } from "next";
import Router, { useRouter } from "next/router";
import GridComponent from "../../components/GridComponent";
import ThumbnailComponent from "../../components/ThumbnailComponent";
import { Folder } from "../../interfaces/types";
import { getVolumeList } from "../../lib/fileSystem";

const  Series :NextPage<{volumes: Folder[]}> = ({ volumes }) => {
    const router = useRouter()
    const { title } = router.query
    return ( 
    <div>
        <h1> {title} </h1>
        <GridComponent folders={volumes}/>
    </div>
    )     
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const series = context.params?.title as string
    const volumes: Folder[] = getVolumeList(series)
    return { props: { volumes: volumes}}
}

export default Series