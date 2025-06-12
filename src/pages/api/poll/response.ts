import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorized, user } = await authorize(req, res)
  if (!authorized) return res.status(401).send(null)

  try {
    if (req.method == 'GET') {
      if(!user.admin) return res.status(401).send(null)
      let responses = await db.pollResponse.findMany({where: {pollId: req.query.id as string}, select: {optionIndex: true, author: {select: {name: true}}}, orderBy: [{author: {name: 'asc'}}]})
      const last = (a) => {
        let s = a.author.name.split(' ')
        return s[s.length-1]
      }

      responses = responses.sort((a, b) => {
        let sa = last(a), sb = last(b)
        return sa < sb ? -1 : (sa > sb ? 1 : 0)
      })
      return res.status(200).json({
        responses
      })
    } else if(req.method == 'POST') {
      const poll = await db.poll.findFirst({
        where: {id: req.body.pollId}
      })
      if(!poll || poll.closed || (poll.password && poll.password != req.body.password)) throw new Error("Invalid poll")

      const data = {
        date: new Date(),
        optionIndex: req.body.optionIndex,
        pollId: req.body.pollId,
        authorId: user.id
      }
      let r = await db.pollResponse.findFirst({where: {pollId: req.body.pollId, authorId: user.id}})
      if(r){
        r = await db.pollResponse.update({where: {id: r.id}, data})
      } else {
        r = await db.pollResponse.create({data})
      }

      return res.status(200).json({response: r})
    }
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: e
    })
  }

  return res.status(400).send(null)
}

export default handler;
