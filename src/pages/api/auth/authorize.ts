import { authorize } from '@/lib/api/authorize';
import { setCookie } from '@/lib/api/setCookie';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {authorized, user} = await authorize(req, res)
  res.status(200).json({user})
}

export default handler;