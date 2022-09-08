import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {  
  const state = encodeURIComponent(JSON.stringify({
    origin: req.query.path
  }))

  const redirect_uri = `${process.env.BASE_URL}/api/auth/ion/callback`
  const reqURL = `https://ion.tjhsst.edu/oauth/authorize?response_type=code&client_id=${process.env.ION_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=read&state=${state}`;
//   header("Access-Control-Allow-Origin: http://localhost:4200");
  
  return res
    .setHeader('Access-Control-Allow-Origin', `${process.env.BASE_URL}`)
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    .redirect(301, reqURL)
}

export default handler;
