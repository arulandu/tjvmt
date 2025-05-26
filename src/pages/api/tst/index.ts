import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
  if(req.method == 'POST'){
    // admin: create TST
    const {authorized, profileBody, user} = await authorize(req, res, true)
    if(!authorized) return res.status(401).send(null)
    
    try {
      const tst = await db.tST.create({
        data: {
          name: req.body.name,
          weighted: req.body.weighted ? req.body.weighted : false,
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
  } else if(req.method == 'GET') {
    // user: get all TSTs
    const {authorized, profileBody, user} = await authorize(req, res, false)
    if(!authorized) return res.status(401).send(null)

    const tsts = await db.tST.findMany({where: {}});
    return res.status(200).json({
      tsts
    })
  }

  return res.status(400).send(null)
}

export default handler;
