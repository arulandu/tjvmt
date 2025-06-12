import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authorized, user } = await authorize(req, res, false)
    if (!authorized) return res.status(401).send(null)

    if (req.method == 'GET') {
      return res.status(200).send(null)
    }
  } catch (e) {
    return res.status(400).json({
      message: e.message
    })
  }

  return res.status(400).send(null)
}

export default handler;
