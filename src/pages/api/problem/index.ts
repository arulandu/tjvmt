import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authorized, user } = await authorize(req, res, false)
    if (!authorized) return res.status(401).send(null)

    if(req.method == 'GET'){
      const problems = await db.problem.findMany({orderBy: {createdAt: 'desc'}, include: {author: {select: {name: true}}}})
      problems.forEach(prob => prob['solved'] = prob.solverIds.includes(user.id))
      
      return res.status(200).json({problems})
    } else if (req.method == 'POST') {
      const problem = await db.problem.create({data: {name: req.body.name, content: req.body.content, answer: req.body.answer, approved: req.body.approved, authorId: user.id, createdAt: new Date()}})
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
