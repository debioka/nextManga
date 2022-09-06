import { NextApiRequest, NextApiResponse } from "next";
import { getVolumeList } from "../../../lib/fileSystem";
import { useRouter } from "next/router";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const router = useRouter()
    res.status(200).json(JSON.stringify(getVolumeList(router.query.series as string)))
}