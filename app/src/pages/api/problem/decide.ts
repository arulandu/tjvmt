import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == 'POST') {
      const { authorized, user } = await authorize(req, res, true)
      if (!authorized) return res.status(401).send(null)
      
      let problem = null
      if(req.body.decision){
        problem = await db.problem.update({where: {id: req.body.id}, data: {approved: true, createdAt: new Date()}})
      } else {
        problem = await db.problem.delete({where: {id: req.body.id}})
      }
      
      return res.status(200).json({ problem })
    } 
  } catch (e) {
    return res.status(400).json({
      message: e.message
    })
  }

  return res.status(400).send(null)
}

export default handler;
