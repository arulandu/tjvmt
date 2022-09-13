import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorized, profileBody } = await authorize(req, res)
  if (!authorized) return res.status(401).send(null)

  try {
    if (req.method == 'GET') {
      const where = req.query.competitor === 'true' ? {competitor: true} : {} 
      let users = await db.user.findMany({where})
      users = users.sort((a,b) => b.solvedProblemIds.length - a.solvedProblemIds.length)
      return res.status(200).json({
        users
      })
    } else if (req.method == 'POST') {
      const user = await db.user.create({
        data: {
          ionId: String(profileBody.id),
          name: profileBody.full_name,
          nickname: profileBody.nickname ? profileBody.nickname : profileBody.first_name,
          ionUsername: profileBody.ion_username,
          schoolEmail: profileBody.tj_email,
          email: req.body.email,
          profilePic: profileBody.picture
        }
      })

      return res.status(200).json({
        user: user
      })
    }

    return res.status(400).send(null)
  } catch (e) {
    return res.status(400).json({
      message: e
    })
  }
}

export default handler;
