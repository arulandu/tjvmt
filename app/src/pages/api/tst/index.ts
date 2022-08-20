import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Create / update a TST
 * Add a submission for a TST
 * Create a selection criteria
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
  const {authorized, profileBody, user} = await authorize(req, res, true)
  if(!authorized) return res.status(401).send(null)

  if(req.method == 'POST'){
    try {
      const tst = await db.tST.create({
        data: {
          name: req.body.name,
          weighted: req.body.weighted ? req.body.weighted : false
        }
      })

      return res.status(200).json({
        tst: tst
      })
    } catch (e) {
      return res.status(400).json({
        error: 'tst already exists',
        message: e
      })
    }
  }

  return res.status(400).send(null)
}

export default handler;
