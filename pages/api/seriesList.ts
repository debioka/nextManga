import type { NextApiRequest, NextApiResponse } from 'next'
import { getSeriesList } from '../../lib/fileSystem'

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(JSON.stringify(getSeriesList()))
}
