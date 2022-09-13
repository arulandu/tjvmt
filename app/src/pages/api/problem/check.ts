import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == 'POST') {
      const { authorized, user } = await authorize(req, res, false)
      if (!authorized) return res.status(401).send(null)
      
      const problem = await db.problem.findFirst({where: {id: req.body.id}})
      const status = problem.answer === req.body.answer
      if(status) await db.problem.update({where: {id: req.body.id}, data: {solvers: {connect: {id: user.id}}}})
      return res.status(200).json({ status })
    } 
  } catch (e) {
    return res.status(400).json({
      message: e.message
    })
  }

  return res.status(400).send(null)
}

export default handler;
