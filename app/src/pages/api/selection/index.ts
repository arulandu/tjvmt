import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
  if(req.method == 'POST'){
    const {authorized, user} = await authorize(req, res, true)
    if(!authorized) return res.status(401).send(null)

    // admin: create selection criteria
    try {
      const selection = await db.selection.create({
        data: {
          drops: req.body.drops,
          weights: req.body.weights
        }
      })

      return res.status(200).json({
        selection
      })
    } catch (e) {
      return res.status(400).json({
        error: 'selection already exists',
        message: e
      })
    }
  } else if(req.method == 'GET') {
    const {authorized, user} = await authorize(req, res, false)
    if(!authorized) return res.status(401).send(null)

    // user: get all selections
    const selections = await db.selection.findMany();
    return res.status(200).json({selections})
  }

  return res.status(400).send(null)
}

export default handler;
