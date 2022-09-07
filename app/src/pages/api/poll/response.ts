import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorized, user } = await authorize(req, res)
  if (!authorized) return res.status(401).send(null)

  try {
    if (req.method == 'GET') {
      if(!user.admin) return res.status(401).send(null)
      const responses = await db.pollResponse.findMany({where: {pollId: req.query.id as string}, include: {author: {select: {name: true}}}, orderBy: [{author: {name: 'asc'}}]})

      return res.status(200).json({
        responses
      })
    } else if(req.method == 'POST') {
      const poll = await db.poll.findFirst({
        where: {id: req.body.pollId}
      })
      if(!poll || poll.closed) throw new Error("Invalid poll")

      const response = await db.pollResponse.create({
        data: {
          date: new Date(),
          optionIndex: req.body.optionIndex,
          pollId: req.body.pollId,
          authorId: user.id
        }
      })

      return res.status(200).json({response})
    }
  } catch (e) {
    return res.status(400).json({
      message: e
    })
  }

  return res.status(400).send(null)
}

export default handler;
