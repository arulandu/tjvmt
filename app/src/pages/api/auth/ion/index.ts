import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {  
  const path = req.query.path as string;
  let parts = (new RegExp(/^\w*:\/\/[^\/]*/)).exec(path);
  const hostname = parts.length == 0 ? '' : parts[0];
  parts = (new RegExp(/\/[\w|\/]*$/)).exec(path);
  const route = parts.length == 0 ? '' : parts[0]

  const state = encodeURIComponent(JSON.stringify({
    origin: route
  }))

  const redirect_uri = `${hostname}/api/auth/ion/callback`
  const reqURL = `https://ion.tjhsst.edu/oauth/authorize?response_type=code&client_id=${process.env.ION_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=read&state=${state}`;
  
  return res
    .setHeader('Access-Control-Allow-Origin', `${process.env.BASE_URL}`)
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    .redirect(301, reqURL)
}

export default handler;
