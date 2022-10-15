import { parsePath } from './../../../../lib/api/parsePath';
import { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const path = req.query.path as string;
  const { baseUrl } = parsePath(req.query.path as string)

  const state = encodeURIComponent(JSON.stringify({
    origin: path
  }))

  const redirect_uri = `${baseUrl}/api/auth/ion/callback`
  const reqURL = `https://ion.tjhsst.edu/oauth/authorize?response_type=code&client_id=${process.env.ION_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=read&state=${state}`;

  return res
    .setHeader('Access-Control-Allow-Origin', `${baseUrl}`)
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    .redirect(301, reqURL)
}

export default handler;
