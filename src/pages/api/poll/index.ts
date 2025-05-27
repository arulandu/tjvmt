import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorized, user } = await authorize(req, res)
  if (!authorized) return res.status(401).send(null)

  try {
    if (req.method == 'GET') {
      const polls = await db.poll.findMany({
        where: {},
        include: {
          responses: {
            where: {
              authorId: user.id
            }
          }
        },
        orderBy: [
          {closed: 'asc'},
          {startDate: 'desc'}
        ]
      })

      polls.forEach(p => {p['hasPassword'] = p.password && p.password.length > 0; if(!user.admin) p.password = '';})

      return res.status(200).json({
        polls
      })
    } else if (req.method == 'POST') {
      if(!user.admin) return res.status(401).send(null)
      const poll = await db.poll.create({
        data: {
          startDate: new Date(),
          text: req.body.text,
          options: req.body.options,
          password: req.body.password,
          authorId: user.id
        }
      })

      return res.status(200).json({
        poll: poll
      })
    } else if(req.method == 'PATCH') {
      if(!user.admin) return res.status(401).send(null)
      
      // close poll
      const poll = await db.poll.update({
        where: {
          id: req.body.id,
        },
        data: {
          endDate: new Date(),
          closed: true
        }
      })

      return res.status(200).json({poll: poll})
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
